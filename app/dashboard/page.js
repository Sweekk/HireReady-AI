import React from 'react'
import Navbar from '../../components/Navbar'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function DashboardPage() {
  // const { user } = useContext(AuthContext)

  return (
    <div>
      <Navbar />
      <main style={{ padding: 16 }}>
        <h1>Dashboard</h1>
        <p>Welcome {user ? user.email : 'guest'}.</p>
      </main>
    </div>
  )
}

import { Bell, Search, Briefcase, FileText, BarChart3, User } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6 text-xl font-bold">CareerFlow AI</div>
        <nav className="px-4 space-y-2">
          <SidebarItem icon={<BarChart3 />} label="Dashboard" active />
          <SidebarItem icon={<FileText />} label="Resume Analyzer" />
          <SidebarItem icon={<Briefcase />} label="Job Tracker" />
          <SidebarItem icon={<User />} label="Interview Prep" />
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 border-b">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg w-1/2">
            <Search size={18} />
            <input
              className="bg-transparent outline-none w-full"
              placeholder="Search jobs, resumes..."
            />
          </div>
          <div className="flex items-center gap-4">
            <Bell />
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              H
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard title="ATS Score" value="82%" />
            <StatCard title="Jobs Applied" value="24" />
            <StatCard title="Interviews" value="6" />
            <StatCard title="Resume Matches" value="18" />
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold mb-4">Recent Job Applications</h2>
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>ATS Match</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td>Google</td>
                  <td>Frontend Engineer</td>
                  <td className="text-green-600">Interview</td>
                  <td>87%</td>
                </tr>
                <tr>
                  <td>Amazon</td>
                  <td>SDE I</td>
                  <td className="text-yellow-600">Applied</td>
                  <td>79%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${{
        true: "bg-indigo-50 text-indigo-600",
        false: "hover:bg-gray-100",
      }[active]}`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
