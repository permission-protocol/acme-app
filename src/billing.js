const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createSubscription(customerId, priceId) {
  return stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });
}

async function cancelSubscription(subscriptionId) {
  return stripe.subscriptions.cancel(subscriptionId);
}

module.exports = { createSubscription, cancelSubscription };
