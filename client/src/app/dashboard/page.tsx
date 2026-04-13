import type { Metadata } from "next";
import DashboardClient from "@/modules/dashboard/components/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard | PayAI Guardian",
  description: "Your AI-powered banking dashboard — monitor transactions, fraud protection, and financial insights.",
};

export default function Page() {
  return <DashboardClient />;
}
