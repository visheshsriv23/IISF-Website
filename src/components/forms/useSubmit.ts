"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { api, type ApiError } from "@/lib/api";

type Status = "idle" | "sending" | "sent" | "error";

/** Shared submit state for public forms: posts to our API, surfaces field errors, and records a success event. */
export function useSubmit(path: string, event: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function submit(body: FormData | Record<string, unknown>) {
    setStatus("sending");
    setErrors({});
    try {
      await api(path, body instanceof FormData ? { method: "POST", body } : { method: "POST", json: body });
      setStatus("sent");
      track(event);
    } catch (err) {
      const { error, fields } = err as ApiError;
      setErrors(fields ?? {});
      setMessage(error ?? "Couldn't reach the server. Check your connection?");
      setStatus("error");
    }
  }

  return { status, errors, message, submit, setErrors };
}
