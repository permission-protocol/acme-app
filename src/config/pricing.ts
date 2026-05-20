export const PRICING_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['5 projects', 'Community support'],
  },
  pro: {
    name: 'Pro', 
    price: 29,
    features: ['Unlimited projects', 'Priority support', 'API access'],
  },
  enterprise: {
    name: 'Enterprise',
    price: 99,
    features: ['Everything in Pro', 'SSO', 'Dedicated support', 'SLA'],
  },
};

export function calculateBilling(tier: keyof typeof PRICING_TIERS, seats: number) {
  return PRICING_TIERS[tier].price * seats;
}
