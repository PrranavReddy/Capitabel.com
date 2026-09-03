import LegalPage from "@/components/LegalPage";
import { legal } from "@/lib/data";

export const metadata = {
  title: "Terms of Use",
  description: "The terms governing your use of capitabel.com and Capitabel Solutions' services.",
};

export default function TermsPage() {
  return <LegalPage title={legal.terms.title} draftDate={legal.terms.draftDate} sections={legal.terms.sections} />;
}
