import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { sendBookingConfirmation } from "@/lib/email";

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("[STRIPE_WEBHOOK] signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        const bookingId = session.metadata?.bookingId;

        if (!bookingId) break;

        const booking = await db.booking.update({
          where: { id: bookingId },
          data: {
            status: "CONFIRMED",
            stripeSessionId: session.id,
            stripePaymentIntentId: session.payment_intent ?? null,
          },
          include: {
            guest: { select: { name: true, email: true } },
            listing: { select: { title: true, city: true, country: true, images: true } },
          },
        });

        // Send confirmation email
        if (booking.guest?.email) {
          await sendBookingConfirmation({
            guestName: booking.guest.name ?? "Guest",
            guestEmail: booking.guest.email,
            listingTitle: booking.listing.title,
            listingCity: booking.listing.city,
            listingCountry: booking.listing.country,
            listingImage: booking.listing.images[0] ?? "",
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            totalNights: booking.totalNights,
            totalPrice: Number(booking.totalPrice),
            bookingId: booking.id,
          });
        }

        console.log(`[STRIPE_WEBHOOK] Booking ${bookingId} confirmed`);
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as any;
        const bookingId = session.metadata?.bookingId;

        if (!bookingId) break;

        // Only cancel if still pending
        await db.booking.updateMany({
          where: { id: bookingId, status: "PENDING" },
          data: { status: "CANCELLED" },
        });

        console.log(`[STRIPE_WEBHOOK] Booking ${bookingId} expired → cancelled`);
        break;
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object as any;
        const bookingId = intent.metadata?.bookingId;

        if (!bookingId) break;

        await db.booking.updateMany({
          where: { id: bookingId, status: "PENDING" },
          data: { status: "CANCELLED" },
        });

        console.log(`[STRIPE_WEBHOOK] Booking ${bookingId} payment failed → cancelled`);
        break;
      }

      default:
        console.log(`[STRIPE_WEBHOOK] Unhandled event: ${event.type}`);
    }
  } catch (err) {
    console.error("[STRIPE_WEBHOOK] handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
