import { Button } from "@/components/ui/Button";
import { Doodle } from "@/components/ui/Doodle";
import { Sticker } from "@/components/ui/Sticker";

export default function NotFound() {
  return (
    <main className="container-zine grid min-h-dvh place-items-center py-20 text-center">
      <div className="relative">
        <Sticker color="pink" rotate={-8} pop={false} className="absolute -top-10 left-0">Error 404</Sticker>
        <p className="display text-[120px] leading-none sm:text-[220px]">4<span className="highlight">0</span>4</p>
        <h1 className="display mt-4 text-4xl sm:text-6xl">This page pivoted.</h1>
        <p className="hand mt-4 text-3xl">it&apos;s a food-delivery app now. probably.</p>
        <Doodle name="squiggle" className="mx-auto my-8 w-40" draw={false} />
        <Button href="/" arrow>Get me back home</Button>
      </div>
    </main>
  );
}
