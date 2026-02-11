"use client";

import {
  Home,
  FileText,
  Briefcase,
  Users,
  MessageSquare,
  Wrench,
} from "lucide-react";

import { usePathname } from "next/navigation";

import {useRouter} from "next/navigation";
import { SidebarItem } from "./sidebar/SidebarItem";
import { ResourceCard, ToolCard } from "./ResourceCard/ResourceCard";
import { ProgressItem, StatCard } from "./card/Card";

export default function Dashboard() {
  const pathname = usePathname();
  const route = useRouter();
  return (
    <div className="min-h-screen bg-[#f3f6fb] flex flex-col">
      {/* ================= TOP NAVBAR ================= */}
      <header className="h-14 bg-[#163a6b] text-white flex items-center justify-between px-6 shadow-sm">
        <button className="flex items-center gap-2 font-semibold text-lg">
          <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center">
            H
          </div>
          HireReady AI
        </button>

        <div className="flex items-center gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded-md text-sm font-medium transition">
            Upgrade to Premium
          </button>

          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
      </header>

      <div className="flex flex-1">
        {/* ================= SIDEBAR ================= */}
        <aside className="w-64 bg-white border-r hidden md:block">
          <nav className="p-4 space-y-2 text-sm">
            <SidebarItem
              href="/dashboard"
              icon={<Home size={18} />}
              label="Home"
              pathname={pathname}
            />
            <SidebarItem
              href="/resumeBuilder"
              icon={<FileText size={18} />}
              label="Resume Builder"
              pathname={pathname}
            />
            <SidebarItem
              href="/jobs"
              icon={<Briefcase size={18} />}
              label="Job Tracker"
              pathname={pathname}
            />
            <SidebarItem
              href="/interview"
              icon={<MessageSquare size={18} />}
              label="Mock Interviews"
              pathname={pathname}
            />
            <SidebarItem
              href="/networking"
              icon={<Users size={18} />}
              label="Networking"
              pathname={pathname}
            />
            <SidebarItem
              href="/ai-tools"
              icon={<Wrench size={18} />}
              label="AI Toolbox"
              pathname={pathname}
            />
          </nav>

          <div className="mt-6 border-t p-4 space-y-3 text-sm text-gray-600">
            <button className="hover:text-blue-600">Chrome Extension</button>
            <button className="hover:text-blue-600">Suggest a Feature</button>
            <button className="hover:text-blue-600">Report a bug</button>
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="flex-1 p-8 space-y-8">
          {/* ===== TOP GRID ===== */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-300 flex justify-between font-medium">
                Your Progress
                <span className="text-gray-400">0/2</span>
              </div>

              <div className="p-3">
                <ProgressItem title="Resume Review" href="/resume" />
                <ProgressItem
                  title="Practice Mock Interview"
                  href="/interview"
                />
                <ProgressItem title="Get an interview" href="/jobs" />
              </div>
            </div>

            {/* NEXT STEP */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-medium">
                  Immediate Next Step
                </p>
                <h3 className="text-xl font-semibold mt-2">
                  Got Your First Interview Scheduled
                </h3>

                <p className="text-lg text-gray-500 mt-1 max-w-sm">
                  Ace your upcoming interview using AI mock interview tools.
                </p>

                <button 
                onClick = {()=>{
                  route.push("../interview");
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                  Practice Interview
                </button>
              </div>

              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWADLeVcdzDyAKIJ0KHKIyQzjnABcLliIM7hDjNvVXJX0ND5K3"
                alt="Interview illustration"
                className="hidden md:block w-60 rounded-lg"
              />
            </div>
          </div>

          {/* ===== INFO BANNER ===== */}
          <div className="bg-white border border-gray-300 rounded-xl p-6 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800 text-3xl">
                You've Taken the First Step — Let’s Go Further
              </h3>

              <p className="text-lg text-gray-500 mt-1">
                You've already started your journey. Now explore all the
                AI-powered tools designed to help you land jobs faster and
                stress less.
              </p>

              <button className="mt-3 hover:bg-gray-200 text-lg font-medium border border-blue-500 h-12 px-4 rounded-md">
                Explore Features
              </button>
            </div>

            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQzvhWvwKa0EPJFVRj18SXtedXGDKJsysoBItyhJSVoibRdJUpK"
              alt="Motivation"
              className="hidden md:block w-44 rounded-full"
            />
          </div>

          {/* ===== TOOLS ===== */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-xl text-gray-500">Plans starting from</p>
              <h3 className="text-3xl font-bold mt-2">$9.99 / Week</h3>
              <p className="mt-8 text-gray-600">
                Supercharge your job search with HireReady AI-powered tools
                built to get you hired faster.
              </p>

              <button className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md text-sm font-medium">
                UPGRADE NOW
              </button>

              <ul className="mt-4 text-sm text-gray-500 space-y-2">
                <li>✓ Unlimited AI Resume Analysis</li>
                <li>✓ Interview Preparation</li>
                <li>✓ Job Tracking Tools</li>
                <li>✓ Unlimited AI Cover Letter Generations</li>
                <li>✓ Unlimited AI LinkedIn Post Generations</li>
                <li>✓ 24/7 Email Support</li>
              </ul>
            </div>

            <ToolCard
              title="Human-crafted ATS-optimized Resume"
              sub="Ensure it's ready to impress both hiring managers and ATS systems."
              button="Check ATS Score"
              img="https://resumeup.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FResumeUp_Hero_Image_1.ec6a0ba8.png&w=640&q=75"
            />

            <ToolCard
              title="Supercharge Opportunities with HireReady AI"
              button="See more"
              img="https://resumeup.ai/_next/image?url=%2Fimages%2Fnew_templates%2Fcatalyst_resume.jpg&w=640&q=75"
            />
          </div>

          {/* ===== RESOURCES ===== */}
          <section className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Resources</h2>
              <button className="text-sm text-blue-600">
                View all Resources
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <ResourceCard
                img="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/65d25df1b0d7cb8d764bd5c3_chatgpt%20for%20behavioral%20interview.avif"
                info="How to use ChatGPT for Behavioral Interviews"
                subinfo="From explaining quantum theory through poetry to rewriting tweets..."
              />

              <ResourceCard
                img="https://resumeup.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fresume-length-best-practices.5508cfd7.jpeg&w=640&q=75"
                info="How Long Should a Resume Be in 2026?"
                subinfo="Discover the ideal length based on your experience level."
              />

              <ResourceCard
                img="https://resumeup.ai/_next/image?url=%2Fresume-up-hero.png&w=1200&q=75"
                info="Tech Job Boards: Why You Should Use Them"
                subinfo="Connect with companies actively hiring tech professionals."
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
