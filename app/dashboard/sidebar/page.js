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

export function SidebarItem({ icon, label, href, pathname }) {
  const active = pathname === href;

  return (
    <Link href={href}>
      <button
        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
          active
            ? "bg-blue-50 text-blue-600 font-medium"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        {icon}
        {label}
      </button>
    </Link>
  );
}