import type { Metadata } from "next";
import DashboardPageClient from "./DashboardPageClient";

export const metadata: Metadata = {
  title: "Dashboard | PayAI Guardian",
  description: "Your AI-powered banking dashboard — monitor transactions, fraud protection, and financial insights.",
};

export default function DashboardPage() {
  return <DashboardPageClient />;
}
