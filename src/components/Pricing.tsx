import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    price: "$29",
    description: "Perfect for small clinics just getting started.",
    features: [
      "Up to 100 patients",
      "Basic appointment scheduling",
      "Patient records management",
      "Email support",
      "1 user account",
    ],
    featured: false,
  },
  {
    name: "Professional",
    id: "tier-professional",
    price: "$79",
    description: "For growing clinics that need more power.",
    features: [
      "Up to 500 patients",
      "Advanced scheduling & reminders",
      "Full EHR capabilities",
      "Billing & invoicing",
      "Analytics dashboard",
      "Priority support",
      "5 user accounts",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    price: "$199",
    description: "For large clinics and healthcare networks.",
    features: [
      "Unlimited patients",
      "Multi-location support",
      "Custom integrations",
      "Advanced analytics",
      "Dedicated account manager",
      "24/7 phone support",
      "Unlimited user accounts",
      "Custom branding",
    ],
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choose the Right Plan for Your Clinic
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Start with a 14-day free trial. No credit card required. 
            Cancel anytime.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={cn(
                "flex flex-col justify-between",
                tier.featured
                  ? "border-primary shadow-lg ring-2 ring-primary"
                  : "border-border"
              )}
            >
              <CardHeader>
                {tier.featured && (
                  <div className="mb-4">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20">
                      Most popular
                    </span>
                  </div>
                )}
                <CardTitle className="text-lg font-semibold leading-8">
                  {tier.name}
                </CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul role="list" className="space-y-3 text-sm leading-6 text-muted-foreground">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className="h-5 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.featured ? "default" : "outline"}
                >
                  Get started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
