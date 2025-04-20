import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-6">User Information</h2>

          <div className="text-left mb-6">
            <p className="mb-2">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="mb-2">
              <span className="font-medium">User ID:</span> {user.id}
            </p>
            <p className="mb-2">
              <span className="font-medium">Last Sign In:</span>{" "}
              {new Date(user.last_sign_in_at || "").toLocaleString() || "N/A"}
            </p>
          </div>

          <LogoutButton />
        </div>
      </main>
    </div>
  );
}
