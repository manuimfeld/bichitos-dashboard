"use client";
import { DASHBOARD_SIDEBAR_LINKS } from "@/app/lib/consts/navigation";
import Image from "next/image";
import SidebarLinks from "./sidebarLinks";

export default function Sidebar() {
  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text:white">
      <div className="flex items-center gap-2 px-1 py-3">
        <Image src="/bichitos-logo.webp" alt="Logo" width="30" height="30" />
        <span className="text-neutral-100 text-lg">Bichitos</span>
      </div>
      <ul className="flex-1">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => {
          return <SidebarLinks key={item.key} item={item} />;
        })}
      </ul>
      <div>BOTTOM</div>
    </div>
  );
}
