"use client";

import { useRef, useState } from "react";

type DragScrollProps = {
  children: React.ReactNode;
  className?: string;
};

export function DragScroll({ children, className = "" }: DragScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ left: 0, moved: false, startX: 0 });
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);

  return (
    <div
      className={`${className} desktop:cursor-grab desktop:select-none desktop:active:cursor-grabbing`}
      onPointerCancel={() => setDragging(false)}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") return;

        const node = ref.current;
        if (!node) return;

        setDragging(true);
        drag.current = { left: node.scrollLeft, moved: false, startX: event.clientX };
        node.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;

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
        if (event.pointerType !== "touch") ref.current?.releasePointerCapture(event.pointerId);
        suppressClick.current = drag.current.moved;
        setDragging(false);
      }}
      onClickCapture={(event) => {
        if (!suppressClick.current) return;
        event.preventDefault();
        event.stopPropagation();
        suppressClick.current = false;
        drag.current.moved = false;
      }}
      ref={ref}
    >
      {children}
    </div>
  );
}
