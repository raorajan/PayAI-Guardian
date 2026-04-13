import type { Metadata } from "next";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard | PayAI Guardian",
  description: "Your AI-powered banking dashboard — monitor transactions, fraud protection, and financial insights.",
};

export default function Page() {
  return <DashboardPage />;
}
