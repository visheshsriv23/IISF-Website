import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-[14px] border-3 border-ink bg-paper px-4 py-3 text-base shadow-brutal-sm transition-shadow placeholder:text-ink/40 focus:shadow-brutal focus:outline-4 focus:outline-lime focus:outline-offset-2 aria-invalid:border-pink aria-invalid:bg-pink/5";

type Base = { label: string; name: string; error?: string; hint?: string };

function Wrapper({ label, name, error, hint, children }: Base & { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-bold">{label}</label>
      {children}
      {hint && !error && <p id={`${name}-hint`} className="text-sm opacity-70">{hint}</p>}
      {error && <p id={`${name}-error`} role="alert" className="hand text-xl font-bold text-[#c2185b]">✗ {error}</p>}
    </div>
  );
}

const a11y = (name: string, error?: string, hint?: string) => ({
  id: name,
  name,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${name}-error` : hint ? `${name}-hint` : undefined,
});

export function Input({ label, name, error, hint, className, ...props }: Base & ComponentProps<"input">) {
  return (
    <Wrapper {...{ label, name, error, hint }}>
      <input {...props} {...a11y(name, error, hint)} className={cn(control, className)} />
    </Wrapper>
  );
}

export function TextArea({ label, name, error, hint, ...props }: Base & ComponentProps<"textarea">) {
  return (
    <Wrapper {...{ label, name, error, hint }}>
      <textarea rows={4} {...props} {...a11y(name, error, hint)} className={cn(control, "resize-y")} />
    </Wrapper>
  );
}

export function Select({ label, name, error, hint, options, ...props }: Base & ComponentProps<"select"> & { options: readonly string[] }) {
  return (
    <Wrapper {...{ label, name, error, hint }}>
      <select defaultValue="" {...props} {...a11y(name, error, hint)} className={cn(control, "appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%23111%22%20stroke-width=%223%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-12")}>
        <option value="" disabled>Pick one…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </Wrapper>
  );
}

/** Chunky toggle chips backed by real checkboxes (or radios). */
export function ChoiceGroup({ label, name, error, options, type = "checkbox", defaultValue = [] }: Base & { options: readonly string[]; type?: "checkbox" | "radio"; defaultValue?: string[] }) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined} className="flex flex-col gap-3">
      <legend className="mb-2 font-bold">{label}</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type={type} name={name} value={o} defaultChecked={defaultValue.includes(o)} className="peer sr-only" />
            <span className="inline-block rounded-full border-3 border-ink bg-paper px-4 py-2 font-bold shadow-brutal-sm transition-all duration-200 ease-bounce peer-checked:-translate-y-0.5 peer-checked:bg-lime peer-focus-visible:outline-4 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime">
              {o}
            </span>
          </label>
        ))}
      </div>
      {error && <p id={`${name}-error`} role="alert" className="hand text-xl font-bold text-[#c2185b]">✗ {error}</p>}
    </fieldset>
  );
}

/** Hidden from humans, tempting for bots. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px]">
      <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}
