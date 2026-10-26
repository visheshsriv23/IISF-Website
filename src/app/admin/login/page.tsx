"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, type ApiError } from "@/lib/api";
import { Button } from "@/components/ui/Button";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <main className="grid min-h-dvh place-items-center p-5">
      <form
        className="flex w-full max-w-sm flex-col gap-5 brutal bg-paper p-8"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          try {
            await api("/api/admin/login", { method: "POST", json: { password: new FormData(e.currentTarget).get("password") } });
            router.push("/admin/startups");
          } catch (err) {
            setError((err as ApiError).error ?? "Login failed.");
          }
        }}
      >
        <h1 className="display text-3xl">Committee login</h1>
        <label className="flex flex-col gap-2 font-bold">
          Password
          <input name="password" type="password" autoComplete="current-password" required className="rounded-[10px] border-3 border-ink px-3 py-2 font-normal focus:outline-4 focus:outline-lime" />
        </label>
        {error && <p role="alert" className="font-bold text-[#c2185b]">{error}</p>}
        <Button type="submit" arrow>Let me in</Button>
      </form>
    </main>
  );
}
