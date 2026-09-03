import LegalPage from "@/components/LegalPage";
import { legal } from "@/lib/data";

export const metadata = {
  title: "Disclosures",
  description: "How Capitabel Solutions is compensated, how we choose lenders, and what a Capitabel Loan Offer is.",
};

export default function DisclosuresPage() {
  return <LegalPage title={legal.disclosures.title} draftDate={legal.disclosures.draftDate} sections={legal.disclosures.sections} />;
}
