import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { StructuredData } from "@/components/structured-data"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://easyjoey.com"),
  title: {
    default: "EasyJoey | Clinic Management Software for Filipino Doctors",
    template: "%s | EasyJoey",
  },
  description: "Filipino doctors spend 2+ hours on admin daily. EasyJoey helps you reclaim that time for your patients. Simple, offline-ready clinic software for the Philippines.",
  keywords: [
    "clinic management software Philippines",
    "healthcare software Philippines",
    "medical EMR system",
    "patient records management",
    "prescription management software",
    "EasyJoey",
    "offline clinic software",
    "Filipino doctors software",
    "clinic billing system",
    "practice management Philippines",
  ],
  authors: [{ name: "EasyJoey" }],
  creator: "EasyJoey",
  publisher: "EasyJoey",
  icons: {
    icon: [
      { url: "/easyjoey-favicons/favicon.ico" },
      { url: "/easyjoey-favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/easyjoey-favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/easyjoey-favicons/apple-touch-icon.png",
  },
  openGraph: {
    title: "EasyJoey | Clinic Management Software for Filipino Doctors",
    description: "Filipino doctors spend 2+ hours on admin daily. EasyJoey helps you reclaim that time for your patients.",
    type: "website",
    locale: "en_PH",
    url: "https://easyjoey.com",
    siteName: "EasyJoey",
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyJoey | Clinic Management Software for Filipino Doctors",
    description: "Filipino doctors spend 2+ hours on admin daily. EasyJoey helps you reclaim that time for your patients.",
    creator: "@easyjoey_ph",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://easyjoey.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <StructuredData />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
