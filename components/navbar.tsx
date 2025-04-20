"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getSession();
        setIsLoggedIn(!!data.session);
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuthStatus();
  }, [pathname]);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Supabase Auth Demo
        </Link>

        <div className="flex space-x-4">
          <Link
            href="/"
            className={`px-3 py-2 rounded hover:bg-gray-700 ${
              pathname === "/" ? "bg-gray-700" : ""
            }`}
          >
            Home
          </Link>

          {!isLoading && (
            <>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`px-3 py-2 rounded hover:bg-gray-700 ${
                      pathname === "/dashboard" ? "bg-gray-700" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className={`px-3 py-2 rounded hover:bg-gray-700 ${
                    pathname === "/login" ? "bg-gray-700" : ""
                  }`}
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
