import { AppSidebar } from "@/components/dashboard/app-sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AppSidebar>{children}</AppSidebar>;
}