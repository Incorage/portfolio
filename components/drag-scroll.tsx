"use client";

import { useRef, useState } from "react";

type DragScrollProps = {
  children: React.ReactNode;
  className?: string;
};

export function DragScroll({ children, className = "" }: DragScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ left: 0, moved: false, startX: 0 });
  const [dragging, setDragging] = useState(false);

  return (
    <div
      className={`${className} cursor-grab select-none active:cursor-grabbing`}
      onPointerCancel={() => setDragging(false)}
      onPointerDown={(event) => {
        const node = ref.current;
        if (!node) return;

        setDragging(true);
        drag.current = { left: node.scrollLeft, moved: false, startX: event.clientX };
        node.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const node = ref.current;
        if (!node || !dragging) return;
        const distance = event.clientX - drag.current.startX;
        if (Math.abs(distance) > 6) drag.current.moved = true;
        if (drag.current.moved) {
          event.preventDefault();
          node.scrollLeft = drag.current.left - distance;
        }
      }}
      onPointerUp={(event) => {
        ref.current?.releasePointerCapture(event.pointerId);
        setDragging(false);
      }}
      onClickCapture={(event) => {
        if (!drag.current.moved) return;
        event.preventDefault();
        event.stopPropagation();
        drag.current.moved = false;
      }}
      ref={ref}
    >
      {children}
    </div>
  );
}
