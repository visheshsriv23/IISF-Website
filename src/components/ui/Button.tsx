import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary: "bg-lime",
  secondary: "bg-paper",
  pink: "bg-pink",
  dark: "bg-ink text-cream",
} as const;

type Common = { variant?: keyof typeof VARIANTS; arrow?: boolean; className?: string; children: ReactNode };
type Props = Common & (({ href: string } & Omit<ComponentProps<typeof Link>, "href">) | ({ href?: undefined } & ComponentProps<"button">));

export const buttonClass = (variant: keyof typeof VARIANTS = "primary") =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-[14px] border-3 border-ink px-6 py-3.5 font-bold text-base",
    "shadow-brutal-sm transition-[translate,box-shadow] duration-200 ease-bounce select-none",
    "hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
  );

/** Primary, secondary or dark chunky button. Renders a Link when given href. */
export function Button({ variant = "primary", arrow, className, children, ...props }: Props) {
  const content = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-5" strokeWidth={2.75} />}
    </>
  );
  if (props.href !== undefined) {
    return <Link {...props} className={cn(buttonClass(variant), className)}>{content}</Link>;
  }
  return <button {...(props as ComponentProps<"button">)} className={cn(buttonClass(variant), className)}>{content}</button>;
}

/** Tertiary: plain text link with a hand-drawn underline on hover. */
export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link {...props} className={cn("group relative inline-flex items-center gap-1 font-bold", className)}>
      {children}
      <svg aria-hidden viewBox="0 0 120 10" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-2 w-full">
        <path
          d="M2 6 C 30 2, 60 9, 118 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          className="opacity-0 [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset,opacity] duration-300 group-hover:opacity-100 group-hover:[stroke-dashoffset:0] group-focus-visible:opacity-100 group-focus-visible:[stroke-dashoffset:0]"
        />
      </svg>
    </Link>
  );
}
