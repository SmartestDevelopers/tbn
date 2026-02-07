import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Global Notariat | Premium Remote Online & Mobile Notary Services",
  description: "Experience secure, reliable, and accessible notarization with The Global Notariat. Award-winning Remote Online Notary (RON) and Mobile Notary services available 24/7 in Central Florida and worldwide.",
  keywords: ["Notary Public", "Remote Online Notary", "RON", "Mobile Notary Florida", "Loan Signing Agent", "Apostille Services", "Legal Document Notarization"],
  openGraph: {
    title: "The Global Notariat | Timeless Notarial Services for a Connected World",
    description: "Your Notary Without Borders. Secure, professional, and globally accessible notary services.",
    url: "https://theglobalnotariat.com",
    siteName: "The Global Notariat",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Global Notariat | Premium Notary Services",
    description: "24/7 Remote Online and Mobile Notary Services. Secure and legally compliant.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Notary",
              "name": "The Global Notariat",
              "image": "https://img1.wsimg.com/isteam/ip/229ea690-42c2-4058-a5c9-f993ebb37281/blob.png",
              "@id": "https://theglobalnotariat.com",
              "url": "https://theglobalnotariat.com",
              "telephone": "+1-407-684-5550",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Central Florida",
                "addressLocality": "Orlando",
                "addressRegion": "FL",
                "postalCode": "32801",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.5383,
                "longitude": -81.3792
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              },
              "sameAs": [
                "https://facebook.com/theglobalnotariat",
                "https://instagram.com/theglobalnotariat"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextTopLoader
          color="#C5A059"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #C5A059,0 0 5px #C5A059"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
          <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        {children}
      </body>
    </html>
  );
}
