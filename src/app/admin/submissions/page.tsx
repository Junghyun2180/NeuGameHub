import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminSubmissionsClient from "./AdminSubmissionsClient";

export default async function AdminSubmissionsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-steam-text mb-2">
        게임 등록 관리
      </h1>
      <p className="text-steam-text-muted text-sm mb-6">
        게임 등록 신청을 검토하고 승인/거절할 수 있습니다
      </p>

      <AdminSubmissionsClient />
    </div>
  );
}
