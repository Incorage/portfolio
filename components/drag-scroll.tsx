"use client";

import { useRef, useState } from "react";

type DragScrollProps = {
  children: React.ReactNode;
  className?: string;
};

export function DragScroll({ children, className = "" }: DragScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ left: 0, startX: 0 });
  const [dragging, setDragging] = useState(false);

  return (
    <div
      className={`${className} cursor-grab select-none active:cursor-grabbing`}
      onPointerCancel={() => setDragging(false)}
      onPointerDown={(event) => {
        const node = ref.current;
        if (!node) return;

        setDragging(true);
        drag.current = { left: node.scrollLeft, startX: event.clientX };
        node.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const node = ref.current;
        if (!node || !dragging) return;
        event.preventDefault();
        node.scrollLeft = drag.current.left - (event.clientX - drag.current.startX);
      }}
      onPointerUp={(event) => {
        ref.current?.releasePointerCapture(event.pointerId);
        setDragging(false);
      }}
      ref={ref}
    >
      {children}
    </div>
  );
}
