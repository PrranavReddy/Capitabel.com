import LegalPage from "@/components/LegalPage";
import { legal } from "@/lib/data";

export const metadata = {
  title: "Privacy Policy",
  description: "How Capitabel Solutions collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return <LegalPage title={legal.privacy.title} draftDate={legal.privacy.draftDate} sections={legal.privacy.sections} />;
}
