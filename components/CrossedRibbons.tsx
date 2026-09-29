type RibbonProps = {
  words: string[];
  reverse?: boolean;
  className: string;
};

function Ribbon({ words, reverse, className }: RibbonProps) {
  const track = [...words, ...words, ...words];
  return (
    <div className={`absolute inset-x-[-5%] py-4 ${className}`}>
      <div className="flex overflow-hidden">
        <div
          className={`flex shrink-0 animate-marquee items-center hover:[animation-play-state:paused] ${
            reverse ? "[animation-direction:reverse]" : ""
          }`}
        >
          {[...track, ...track].map((word, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap pr-10 font-display text-2xl font-medium tracking-tight md:text-3xl"
            >
              {word}
              <span aria-hidden className="opacity-50">
                ✺
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CrossedRibbons({
  top,
  bottom,
}: {
  top: string[];
  bottom: string[];
}) {
  return (
    <div aria-hidden className="relative my-6 h-40 overflow-hidden md:my-10 md:h-48">
      <Ribbon words={top} className="top-1/2 -translate-y-1/2 rotate-[3deg] bg-ink text-canvas" />
      <Ribbon
        words={bottom}
        reverse
        className="top-1/2 -translate-y-1/2 -rotate-[2.5deg] bg-accent text-white shadow-accent"
      />
    </div>
  );
}
