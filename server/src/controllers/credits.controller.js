import Stripe from "stripe";
import UserModel from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-02-25.clover",
});

// 🔥 Credits mapping
const CREDITS_MAP = {
    2: 50,
    5: 120,
    9: 300,
};

// 🔥 Create Stripe Checkout Session
export const createCreditsOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const amount = Number(req.body.amount);

        if (!amount || !CREDITS_MAP[amount]) {
            return res.status(400).json({
                success: false,
                message: "Invalid credits plan",
            });
        }

        const CLIENT_URL = process.env.CLIENT_URL;
        if (!CLIENT_URL) {
            return res.status(500).json({
                success: false,
                message: "CLIENT_URL not configured",
            });
        }

        const credits = CREDITS_MAP[amount];

        const session = await stripe.checkout.sessions.create(
            {
                mode: "payment",
                payment_method_types: ["card"],
                success_url: `${CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${CLIENT_URL}/payment-failed`,
                client_reference_id: String(userId),
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: `${credits} Credits`,
                            },
                            unit_amount: amount * 100,
                        },
                        quantity: 1,
                    },
                ],
                metadata: {
                    userId: String(userId),
                    credits: String(credits),
                },
            },
            {
                idempotencyKey: `credits-${userId}-${amount}-${Date.now()}`,
            }
        );

        return res.status(200).json({
            success: true,
            url: session.url,
        });
    } catch (error) {
        console.error("Stripe Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating payment session",
        });
    }
};

// 🔥 Stripe Webhook
export const stripeWebHook = async (req, res) => {
    const sig = req.headers["stripe-signature"];

    if (!sig) {
        return res.status(400).json({
            error: "Missing stripe-signature header",
        });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error("STRIPE_WEBHOOK_SECRET is not configured");
        return res.status(500).json({
            error: "Webhook secret not configured",
        });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            webhookSecret
        );
    } catch (error) {
        console.error("Webhook signature error:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // 🔥 Handle successful payment
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        if (session.payment_status !== "paid") {
            return res.status(200).json({ received: true });
        }

        const userId = session.metadata?.userId;
        const creditsToAdd = Number(session.metadata?.credits);

        if (!userId || !creditsToAdd) {
            console.error("Missing metadata in session:", session.id);
            return res.status(400).json({ error: "Missing metadata" });
        }

        try {
            await UserModel.findByIdAndUpdate(
                userId,
                {
                    $inc: { credits: creditsToAdd },
                    $set: { isCreditAvailable: true },
                },
                { new: true }
            );

            console.log(`Credited ${creditsToAdd} to user ${userId}`);
        } catch (dbError) {
            console.error("DB update failed:", dbError.message);
            return res.status(500).json({
                error: "Failed to update credits",
            });
        }
    }

    return res.status(200).json({ received: true });
};