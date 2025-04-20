import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8">
      <div className="w-full max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Supabase Auth Demo
        </h1>

        <p className="text-xl mb-8">
          A simple demonstration of authentication with Supabase and Next.js
        </p>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Authentication Status</h2>

          {session ? (
            <div className="mb-6">
              <p className="text-green-600 font-semibold text-lg mb-2">
                ✓ You are logged in
              </p>
              <p className="mb-4">
                Email: <span className="font-medium">{session.user.email}</span>
              </p>
              <Link
                href="/dashboard"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-200"
              >
                View Dashboard
              </Link>
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-red-600 font-semibold text-lg mb-4">
                ✗ You are not logged in
              </p>
              <Link
                href="/login"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-200"
              >
                Sign In / Sign Up
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="https://supabase.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            <h3 className="text-xl font-semibold mb-2">Supabase Docs</h3>
            <p>Learn more about Supabase authentication and other features.</p>
          </a>

          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            <h3 className="text-xl font-semibold mb-2">Next.js Docs</h3>
            <p>Explore Next.js features and API.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
