import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="IISF KNIT home" className="flex items-center gap-2">
      <span className="display grid size-10 place-items-center rounded-[10px] border-3 border-ink bg-lime text-sm shadow-[2px_2px_0_var(--color-ink)]">✦</span>
      <span className="display text-xl">
        IISF<span className="ml-1 hidden align-super text-[10px] tracking-widest sm:inline">KNIT</span>
      </span>
    </Link>
  );
}
