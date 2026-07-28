"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type DragScrollProps = {
  children: React.ReactNode;
  className?: string;
  nudge?: boolean;
  screensVisible?: boolean;
};

export function DragScroll({
  children,
  className = "",
  nudge = false,
  screensVisible = true
}: DragScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ left: 0, moved: false, startX: 0 });
  const hasNudged = useRef(false);
  const nudgeTimers = useRef<number[]>([]);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [nudgePhase, setNudgePhase] = useState<"idle" | "forward" | "back">("idle");

  const clearNudgeTimers = useCallback(() => {
    nudgeTimers.current.forEach((timer) => window.clearTimeout(timer));
    nudgeTimers.current = [];
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!nudge || !node || hasNudged.current) return;

    hasNudged.current = true;
    if (node.scrollWidth <= node.clientWidth + 2) return;

    nudgeTimers.current = [
      window.setTimeout(() => setNudgePhase("forward"), 940),
      window.setTimeout(() => setNudgePhase("back"), 1320)
    ];

    return clearNudgeTimers;
  }, [clearNudgeTimers, nudge]);

  return (
    <div
      className={`drag-scroll ${className} desktop:cursor-grab desktop:select-none desktop:active:cursor-grabbing`}
      data-nudge-phase={nudgePhase}
      data-screens-visible={screensVisible ? "true" : "false"}
      onPointerCancel={() => setDragging(false)}
      onPointerDown={(event) => {
        clearNudgeTimers();
        setNudgePhase("back");
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
