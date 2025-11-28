export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EasyJoey",
    url: "https://easyjoey.com",
    logo: "https://easyjoey.com/easyjoey-favicons/apple-touch-icon.png",
    description: "Clinic management software built for Filipino doctors. Simple, offline-ready, and designed to give you more time for patients.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Organization",
        name: "MYCURE Inc.",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "PH",
    },
    sameAs: [
      "https://twitter.com/easyjoey_ph",
    ],
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EasyJoey",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    description: "Clinic management software for Filipino doctors featuring EMR, patient records, prescriptions, and billing - all working offline.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PHP",
      availability: "https://schema.org/InStock",
      description: "Free forever for solo practitioners",
    },
    featureList: [
      "Electronic Medical Records",
      "Patient Registration",
      "Prescription Management",
      "Simple Billing",
      "Practice Analytics",
      "Offline-First Architecture",
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EasyJoey",
    url: "https://easyjoey.com",
    description: "Clinic management software built for Filipino doctors",
    publisher: {
      "@type": "Organization",
      name: "EasyJoey",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
