"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { api } from "@/lib/api";
import { RESOURCES, type ResourceName } from "@/shared/resources";
import { cn } from "@/lib/utils";

const entries = Object.entries(RESOURCES) as [ResourceName, (typeof RESOURCES)[ResourceName]][];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const link = ([name, def]: (typeof entries)[number]) => (
    <li key={name}>
      <Link href={`/admin/${name}`} className={cn("block rounded-full px-4 py-1.5 font-bold", pathname === `/admin/${name}` ? "bg-lime text-ink" : "hover:bg-cream/10")}>
        {def.label}
      </Link>
    </li>
  );

  return (
    <nav aria-label="Admin" className="flex flex-col gap-6 bg-ink p-5 text-cream md:min-h-dvh md:w-60">
      <Link href="/" className="display text-xl text-lime">IISF admin</Link>
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest opacity-60">Content</p>
        <ul className="flex flex-wrap gap-1 md:flex-col">{entries.filter(([, d]) => !("readOnly" in d)).map(link)}</ul>
      </div>
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest opacity-60">Submissions</p>
        <ul className="flex flex-wrap gap-1 md:flex-col">{entries.filter(([, d]) => "readOnly" in d).map(link)}</ul>
      </div>
      <button
        type="button"
        onClick={async () => {
          await api("/api/admin/logout", { method: "POST" });
          router.push("/admin/login");
        }}
        className="mt-auto flex items-center gap-2 font-bold opacity-80 hover:opacity-100"
      >
        <LogOut className="size-4" /> Log out
      </button>
    </nav>
  );
}
