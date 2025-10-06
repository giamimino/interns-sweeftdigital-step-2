"use client";

import { ReactNode, useRef, useEffect } from "react";

export default function InfiniteScroll({
  children,
}: { children: ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);

  const repeatedChildren = [...children, ...children];

  const animate = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    container.scrollLeft += 0.5;

    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0;
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className="flex overflow-hidden whitespace-nowrap gap-4"
    >
      {repeatedChildren.map((child, idx) => (
        <div key={idx} className="flex-shrink-0">
          {child}
        </div>
      ))}
    </div>
  );
}
