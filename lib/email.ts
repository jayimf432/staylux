import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// From address — for local dev Resend accepts onboarding@resend.dev
const FROM = "StayLux <onboarding@resend.dev>";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

// ─── Booking Confirmation ─────────────────────────────────────────────────────
export interface BookingConfirmationData {
  guestName: string;
  guestEmail: string;
  listingTitle: string;
  listingCity: string;
  listingCountry: string;
  listingImage: string;
  checkIn: Date;
  checkOut: Date;
  totalNights: number;
  totalPrice: number; // in dollars (not cents)
  bookingId: string;
}

export async function sendBookingConfirmation(data: BookingConfirmationData) {
  if (!resend) {
    console.warn("[EMAIL] Resend not configured — skipping confirmation email");
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#FF385C,#E31C5F);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">StayLux</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">Your booking is confirmed!</p>
          </td>
        </tr>

        <!-- Hero image -->
        <tr>
          <td style="padding:0;">
            <img src="${data.listingImage}" alt="${data.listingTitle}" width="600" style="display:block;width:100%;height:240px;object-fit:cover;" />
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;color:#6b7280;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Booking Confirmation</p>
            <h2 style="margin:0 0 4px;color:#111;font-size:22px;font-weight:700;">${data.listingTitle}</h2>
            <p style="margin:0 0 32px;color:#6b7280;font-size:15px;">${data.listingCity}, ${data.listingCountry}</p>

            <!-- Trip details -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:12px;overflow:hidden;margin-bottom:32px;">
              <tr>
                <td style="padding:16px 20px;border-bottom:1px solid #e5e7eb;">
                  <p style="margin:0 0 2px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Check-in</p>
                  <p style="margin:0;color:#111;font-size:15px;font-weight:600;">${formatDate(data.checkIn)}</p>
                </td>
                <td style="padding:16px 20px;border-bottom:1px solid #e5e7eb;">
                  <p style="margin:0 0 2px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Check-out</p>
                  <p style="margin:0;color:#111;font-size:15px;font-weight:600;">${formatDate(data.checkOut)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0 0 2px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Duration</p>
                  <p style="margin:0;color:#111;font-size:15px;font-weight:600;">${data.totalNights} night${data.totalNights !== 1 ? "s" : ""}</p>
                </td>
                <td style="padding:16px 20px;">
                  <p style="margin:0 0 2px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Total paid</p>
                  <p style="margin:0;color:#FF385C;font-size:15px;font-weight:700;">$${Number(data.totalPrice).toLocaleString()}</p>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
              Hi ${data.guestName}, your stay is all set. We've confirmed your reservation and can't wait for you to experience this incredible property.
            </p>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:#FF385C;border-radius:10px;">
                  <a href="${appUrl}/dashboard/bookings/${data.bookingId}" style="display:inline-block;padding:14px 28px;color:#fff;text-decoration:none;font-weight:600;font-size:15px;">
                    View booking details →
                  </a>
                </td>
              </tr>
            </table>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 24px;" />
            <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;">
              If you have any questions, reply to this email and we'll be happy to help.<br/>
              Booking ID: <code style="font-size:12px;color:#6b7280;">${data.bookingId}</code>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:13px;">© ${new Date().getFullYear()} StayLux. All rights reserved.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: FROM,
      to: data.guestEmail,
      subject: `Booking confirmed — ${data.listingTitle}`,
      html,
    });
    console.log(`[EMAIL] Confirmation sent to ${data.guestEmail}`);
  } catch (err) {
    console.error("[EMAIL] Failed to send confirmation:", err);
  }
}
