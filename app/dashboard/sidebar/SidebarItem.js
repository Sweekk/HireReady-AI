"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarItem = ({ href, icon, label }) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
          active
            ? "bg-blue-50 text-blue-600 font-medium"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        {icon}
        {label}
      </div>
    </Link>
  );
};
