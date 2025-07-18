import type { Metadata } from "next"
import ContactPageClient from "./contact-page-client"

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with OmniMint Support",
  description:
    "Contact OmniMint support team. Get help with technical issues, partnerships, press inquiries, or general questions. Multiple ways to reach us including email and social media.",
  keywords: [
    "contact OmniMint",
    "customer support",
    "technical support",
    "partnerships",
    "press inquiries",
    "business contact",
    "help desk",
    "support ticket",
    "contact form",
    "get in touch",
  ],
  openGraph: {
    title: "Contact Us - Get in Touch with OmniMint Support",
    description: "Contact OmniMint support team for help, partnerships, or general inquiries.",
    url: "https://omnimint.io/contact",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact OmniMint - Customer Support and Inquiries",
      },
    ],
  },
  twitter: {
    title: "Contact Us - OmniMint Support",
    description: "Get in touch with OmniMint support team for help and inquiries.",
    images: ["/twitter-contact.jpg"],
  },
  alternates: {
    canonical: "https://omnimint.io/contact",
  },
}

export default function Page() {
  return <ContactPageClient />
}
