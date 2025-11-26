import {
  Calendar,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  Shield,
  Clock,
  Smartphone,
} from "lucide-react";

const features = [
  {
    name: "Appointment Scheduling",
    description:
      "Effortlessly manage appointments with an intuitive calendar interface. Send automated reminders to reduce no-shows.",
    icon: Calendar,
  },
  {
    name: "Patient Management",
    description:
      "Keep comprehensive patient records organized and accessible. Track medical history, prescriptions, and visit notes.",
    icon: Users,
  },
  {
    name: "Electronic Health Records",
    description:
      "Securely store and manage digital health records. Access patient information instantly when you need it.",
    icon: FileText,
  },
  {
    name: "Billing & Invoicing",
    description:
      "Streamline your billing process with automated invoicing. Accept multiple payment methods with ease.",
    icon: CreditCard,
  },
  {
    name: "Analytics & Reports",
    description:
      "Gain insights into your clinic's performance. Track revenue, patient flow, and key metrics.",
    icon: BarChart3,
  },
  {
    name: "Data Security",
    description:
      "Your data is protected with enterprise-grade security. HIPAA compliant and encrypted end-to-end.",
    icon: Shield,
  },
  {
    name: "24/7 Availability",
    description:
      "Access your clinic management system anytime, anywhere. Cloud-based for maximum flexibility.",
    icon: Clock,
  },
  {
    name: "Mobile Friendly",
    description:
      "Manage your clinic on the go with our responsive design. Works perfectly on all devices.",
    icon: Smartphone,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Powerful Features for Modern Clinics
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Easy Joey provides all the tools you need to run your clinic efficiently.
            From scheduling to billing, we&apos;ve got you covered.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-start group">
                <div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20 group-hover:bg-primary group-hover:ring-primary transition-all duration-300">
                  <feature.icon
                    className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>
                <dt className="mt-4 font-semibold text-foreground">{feature.name}</dt>
                <dd className="mt-2 leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
