/**
 * Plausible custom events. Clicks are tracked declaratively with `trackClass("Name")`
 * (works in server components); form successes call `track("Name")`.
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export const track = (event: string, props?: Record<string, string>) => window.plausible?.(event, props && { props });

/** Plausible "tagged events": a class name the script turns into a click event. */
export const trackClass = (event: string) => `plausible-event-name=${event.replace(/\s/g, "+")}`;
