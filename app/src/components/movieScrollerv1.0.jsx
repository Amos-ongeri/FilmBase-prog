import { useRef, useState, useEffect } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { MovieCard3 } from "./cards/MovieCard3";

const MovieScroller = ({ data = [] }) => {
  const containerRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const container = containerRef.current;

    if (!container) return;

    const maxScroll =
      container.scrollWidth - container.clientWidth;

    setCanScrollLeft(container.scrollLeft > 0);

    setCanScrollRight(
      container.scrollLeft < maxScroll - 5
    );
  };

  useEffect(() => {
    updateScrollState();

    const container = containerRef.current;

    if (!container) return;

    container.addEventListener("scroll", updateScrollState);

    return () => {
      container.removeEventListener(
        "scroll",
        updateScrollState
      );
    };
  }, [data]);

  const handleScroll = (direction) => {
    const container = containerRef.current;

    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left:
        direction === "right"
          ? scrollAmount
          : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">

      {/* LEFT GRADIENT */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-background to-transparent" />

      {/* RIGHT GRADIENT */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-background to-transparent" />

      {/* LEFT BUTTON */}
      <button
        onClick={() => handleScroll("left")}
        disabled={!canScrollLeft}
        className={`
          absolute left-3 top-1/2 z-20
          flex h-12 w-12 -translate-y-1/2 items-center justify-center
          rounded-full border border-white/10
          bg-black/50 backdrop-blur-md
          transition-all duration-300
          hover:scale-110 hover:bg-black/80
          disabled:cursor-not-allowed
          disabled:opacity-0
        `}
      >
        <ArrowLeft className="h-5 w-5 text-white" />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => handleScroll("right")}
        disabled={!canScrollRight}
        className={`
          absolute right-3 top-1/2 z-20
          flex h-12 w-12 -translate-y-1/2 items-center justify-center
          rounded-full border border-white/10
          bg-black/50 backdrop-blur-md
          transition-all duration-300
          hover:scale-110 hover:bg-black/80
          disabled:cursor-not-allowed
          disabled:opacity-0
        `}
      >
        <ArrowRight className="h-5 w-5 text-white" />
      </button>

      {/* SCROLLER */}
      <div
        ref={containerRef}
        className="
          flex gap-5 overflow-x-auto scroll-smooth
          no-scrollbar snap-x snap-mandatory
          py-2
        "
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="
              w-40 shrink-0 snap-start
              cursor-pointer
              transition-transform duration-300
              hover:scale-105
            "
          >
            <MovieCard3 t={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieScroller;