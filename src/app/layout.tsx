import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "EasyJoey | More Time for Patients",
  description: "Filipino doctors spend 2+ hours daily on admin. EasyJoey helps you reclaim that time for what matters — your patients. Simple, offline-ready clinic software built for the Philippines.",
  keywords: ["clinic management", "healthcare Philippines", "medical software", "EMR", "patient records", "prescription management", "EasyJoey", "offline clinic software"],
  authors: [{ name: "EasyJoey" }],
  icons: {
    icon: [
      { url: "/easyjoey-favicons/favicon.ico" },
      { url: "/easyjoey-favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/easyjoey-favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/easyjoey-favicons/apple-touch-icon.png",
  },
  openGraph: {
    title: "EasyJoey | More Time for Patients",
    description: "Filipino doctors spend 2+ hours daily on admin. EasyJoey helps you reclaim that time for what matters — your patients. Simple, offline-ready clinic software built for the Philippines.",
    type: "website",
    locale: "en_PH",
    siteName: "EasyJoey",
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyJoey | More Time for Patients",
    description: "Filipino doctors spend 2+ hours daily on admin. EasyJoey helps you reclaim that time.",
  },
  robots: {
    index: true,
    follow: true,
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
