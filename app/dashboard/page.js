"use client";

import {
  Bell,
  Home,
  FileText,
  Briefcase,
  Users,
  MessageSquare,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {SidebarItem} from "./sidebar/page";
import { ResourceCard } from "./ResourceCard/page";
import { ToolCard } from "./ResourceCard/page";
import { ProgressItem} from "./card/page";
import { StatCard} from "./card/page";
export default function Dashboard() {
  const pathname = usePathname();

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

          <button className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
           
          </button>
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
              href="/resume"
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
            <button className="hover:text-blue-600 ">Chrome Extension</button>
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
                <ProgressItem title="Resume Review" />
                <ProgressItem title="Practice Mock Interview" />
                <ProgressItem title="Get an interview" />
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

                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                  Practice Interview
                </button>
              </div>

              {/* Replace image with your dashboard illustration */}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWADLeVcdzDyAKIJ0KHKIyQzjnABcLliIM7hDjNvVXJX0ND5K3"
                className="hidden md:block w-60 rounded-lg"
              />
            </div>
          </div>

          {/* ===== INFO BANNER ===== */}
          <div className="bg-white border border-gray-300 rounded-xl p-6 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800 text-3xl">
                Youve Taken the First Step — Let’s Go Further
              </h3>

              <p className="text-lg text-gray-500 mt-1">
               Youve already started your journey. Now explore all the AI-powered tools designed to help you land job faster and stress less.
              </p>

              <button className="mt-3 hover:bg-gray-200 text-lg font-medium border-blue-500 h-12  p-1 justify-center rounded-md">
                Explore  Features
              </button>
            </div>

            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQzvhWvwKa0EPJFVRj18SXtedXGDKJsysoBItyhJSVoibRdJUpK"
              className="hidden md:block w-44 rounded-full"
            />
          </div>

        

          {/* ===== TOOLS ===== */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-xl text-gray-500">Plans starting from</p>
              <h3 className="text-3xl font-bold mt-2">$9.99 / Week</h3>
              <h3 className="mt-8">Supercharge your job search with HireReady AI-powered tools built to get you hired faster.</h3>

              <button className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md text-sm font-medium">
                UPGRADE NOW
              </button>

              <ul className="mt-4 text-lg font-semibold text-gray-500 space-y-2">
                <li>✓ Unlimited AI Resume Analysis</li>
                <li>✓ Interview Preparation</li>
                <li>✓ Job Tracking Tools</li>
                <li>✓ Unlimited AI Cover Letter Generations</li>
                <li>✓ Unlimited AI LinkedIn Post Generations</li>
                <li>✓ 24/7 Email Support</li>
              </ul>
            </div>

            <ToolCard title="Human-crafted ATS-optimized Resume"
            sub="Before sending your application, ensure it's ready to impress both hiring managers and ATS systems with our comprehensive resume analysis tool."
            button="Check ATS Score" img="https://resumeup.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FResumeUp_Hero_Image_1.ec6a0ba8.png&w=640&q=75"/>
            <ToolCard title="Supercharge Opportunities with HireReady AI" img="https://resumeup.ai/_next/image?url=%2Fimages%2Fnew_templates%2Fcatalyst_resume.jpg&w=640&q=75" button="See more" />
          </div>

          {/* ===== RESOURCES ===== */}
          <section className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Resources</h2>
              <button className="text-sm text-blue-600">
                View all Resources
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-2.5">
              <ResourceCard 
              img="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/65d25df1b0d7cb8d764bd5c3_chatgpt%20for%20behavioral%20interview.avif" 
              info="How to use ChatGPT for Behavioral interviews Preparation"
              subinfo="From explaining quantum theory through poetry to rewriting tweets in Elon Musk’s style, from writing scripts for videos to breaking down complex…"
             />
              
              <ResourceCard img="https://resumeup.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fresume-length-best-practices.5508cfd7.jpeg&w=640&q=75"
              info="How Long Should a Resume Be in 2026? (Best Practices)"
              subinfo="Discover the ideal length for your resume based on your experience level. Learn how to craft a concise, impactful resume which helpful in shortlisting among different companies"/>

              <ResourceCard img="https://resumeup.ai/_next/image?url=%2Fresume-up-hero.png&w=1200&q=75"
               info="Tech Job Boards: What They Are and Why You Should Be Using Them | HireReady AI"
               subinfo="These online platforms are specifically designed to connect tech professionals like you with companies actively hiring. They act as a central hub for…"/>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}




