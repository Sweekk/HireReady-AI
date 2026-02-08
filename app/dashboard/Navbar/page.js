"use client";

import { useState } from "react";

export default function Navbar_imp() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">r</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">resumeup.ai</h1>
          </div>

          
          <div className="hidden md:flex items-center gap-8">
            <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <span className="font-medium">Resumes</span>
            </button>

            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Cover Letters
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Job Tracker
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Pricing
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              For Organizations
            </a>
          </div>

          
          <button className="hidden md:block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-md">
            Get Started
          </button>

          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-700"
            aria-label="Toggle menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        
        {menuOpen && (
          <div className="md:hidden mt-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-3">
              <button className="text-left text-gray-700 font-medium">
                Resumes
              </button>

              <a href="#" className="text-gray-700 font-medium">
                Cover Letters
              </a>
              <a href="#" className="text-gray-700 font-medium">
                Job Tracker
              </a>
              <a href="#" className="text-gray-700 font-medium">
                Pricing
              </a>
              <a href="#" className="text-gray-700 font-medium">
                For Organizations
              </a>

              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold mt-2">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
