/** Fallback while a not-yet-prerendered detail page streams in. */
export function PageLoading() {
  return (
    <div className="container-zine grid min-h-[70dvh] place-items-center pt-32">
      <p className="hand animate-pulse text-4xl">flipping pages…</p>
    </div>
  );
}
