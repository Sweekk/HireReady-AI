"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar_imp() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateProtected = (path) => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      router.push("/login");
    } else {
      router.push(path);
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

         
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">r</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              HireReady.ai
            </h1>
          </div>

         
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigateProtected("/resume")}
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Resumes
            </button>

            <button
              onClick={() => navigateProtected("/")}
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Cover Letters
            </button>

            <button
              onClick={() => navigateProtected("/")}
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Job Tracker
            </button>

            <button
              onClick={() => router.push("/")}
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Pricing
            </button>

            <button
              onClick={() => router.push("/")}
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              For Organizations
            </button>
          </div>

          
          <button
            onClick={() => navigateProtected("/dashboard")}
            className="hidden md:block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-md"
          >
            Get Started
          </button>

          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        
        {menuOpen && (
          <div className="md:hidden mt-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-3">
              <button onClick={() => navigateProtected("/")}>
                Resumes
              </button>

              <button onClick={() => navigateProtected("/")}>
                Cover Letters
              </button>

              <button onClick={() => navigateProtected("/")}>
                Job Tracker
              </button>

              <button onClick={() => router.push("/")}>
                Pricing
              </button>

              <button onClick={() => router.push("/")}>
                For Organizations
              </button>

              <button
                onClick={() => navigateProtected("/dashboard")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold mt-2"
              >
                Login / Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
