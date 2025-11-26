import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Easy Joey - Clinic Management System",
  description: "Easy Joey is a modern, user-friendly clinic management system designed to streamline your healthcare practice. Manage appointments, patients, and billing with ease.",
  keywords: ["clinic management", "healthcare", "medical software", "appointment scheduling", "patient management", "Easy Joey"],
  authors: [{ name: "Easy Joey" }],
  openGraph: {
    title: "Easy Joey - Clinic Management System",
    description: "Easy Joey is a modern, user-friendly clinic management system designed to streamline your healthcare practice.",
    type: "website",
    locale: "en_US",
    siteName: "Easy Joey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Easy Joey - Clinic Management System",
    description: "Easy Joey is a modern, user-friendly clinic management system designed to streamline your healthcare practice.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
