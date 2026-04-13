import PaymentsPage from "@/modules/payments/pages/PaymentsPage";

export const metadata = {
  title: "Payments | PayAI Guardian",
  description: "Send money, view transaction history, and manage your bank accounts — all protected by AI fraud detection.",
};

export default function PaymentsRoute() {
  return <PaymentsPage />;
}
