import { DashboardLayout } from "@/components/dashboard-layout";

export default function ProfilePage() {
  return (
    <DashboardLayout pageTitle="Profile">
      <div className="flex items-center justify-center h-full">
        <h1 className="text-4xl">Profile Page</h1>
      </div>
    </DashboardLayout>
  );
}
