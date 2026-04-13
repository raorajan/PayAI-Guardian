import type { Metadata } from "next";
import {
  HomeNavbar,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  LiveDemoSection,
  SecuritySection,
  StatsSection,
  TestimonialsSection,
  PricingSection,
  CTASection,
  HomeFooter,
} from "@/modules/home/components";

export const metadata: Metadata = {
  title: "PayAI Guardian — AI-Powered Banking Security",
  description:
    "Experience the future of banking with real-time AI fraud protection, conversational financial intelligence, and blockchain-secured transactions — all in one seamless platform.",
  keywords: [
    "AI banking",
    "fraud detection",
    "real-time payments",
    "P2P transfers",
    "blockchain banking",
    "AI financial advisor",
    "secure money transfer",
    "banking with AI protection",
  ],
  openGraph: {
    title: "PayAI Guardian — AI-Powered Banking Security",
    description: "Predictive AI fraud shield | Chat with your AI banker | Blockchain audit trail",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="bg-[#050810] min-h-screen overflow-x-hidden">
      <HomeNavbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <LiveDemoSection />
      <SecuritySection />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <HomeFooter />
    </main>
  );
}
