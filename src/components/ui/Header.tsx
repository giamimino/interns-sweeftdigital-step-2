"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const nav = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "History",
    url: "/history",
  },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname()
  return (
    <div className="w-full p-5 flex justify-center gap-2.5">
      {nav.map((n) => (
        <button
          className={`px-3 py-1 cursor-pointer transition 
            hover:bg-gray-700/10 border-1 rounded-sm 
            ${pathname === n.url ? "bg-gray-700/20" : "bg-transparent"}`}
          onClick={() => router.push(n.url)}
          key={n.label}
        >
          {n.label}
        </button>
      ))}
    </div>
  );
}
