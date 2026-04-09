import Stripe from "stripe";

// Stripe client — only initialised when the key is present
// The dev server runs fine without it; only payment routes will fail
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-12-18.acacia",
      typescript: true,
    })
  : null;
