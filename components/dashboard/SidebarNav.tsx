"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
}

function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link 
        href={href} 
        className={`rounded-xl py-3 px-4 font-bold transition-all flex items-center gap-4 ${
          isActive 
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
            : "text-slate-400 hover:text-white hover:bg-white/5"
        }`}
      >
        {icon}
        {label}
      </Link>
    </li>
  );
}

export default function SidebarNav() {
  return (
    <ul className="menu menu-md p-4 space-y-2 flex-grow">
      <NavItem 
        href="/dashboard" 
        label="Overview" 
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>} 
      />
      <NavItem 
        href="/profile" 
        label="Profile & Security" 
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>} 
      />
      
      <li>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mt-4 mb-2 px-4 pointer-events-none">Configuration</div>
      </li>

      <NavItem 
        href="/settings" 
        label="Pixel Engine" 
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>} 
      />
    </ul>
  );
}
