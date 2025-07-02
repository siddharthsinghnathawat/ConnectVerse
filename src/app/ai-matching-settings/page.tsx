import { DashboardLayout } from "@/components/dashboard-layout";
import { AiSettingsForm } from "@/components/ai-settings-form";

export default function AiMatchingSettingsPage() {
  return (
    <DashboardLayout pageTitle="AI Matching Settings">
      <div className="max-w-2xl mx-auto">
        <AiSettingsForm />
      </div>
    </DashboardLayout>
  );
}
