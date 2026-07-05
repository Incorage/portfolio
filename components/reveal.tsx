"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

type RevealProps = {
  as?: "div" | "section" | "footer" | "h1" | "h2" | "h3" | "p" | "span";
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const directionClasses = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  none: "translate-x-0 translate-y-0"
} as const;

export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 850,
  once = true,
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: "0px 0px 45% 0px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      {...props}
      ref={(node) => {
        ref.current = node;
      }}
      className={`reveal opacity-0 blur-md ${directionClasses[direction]} transition-[opacity,transform,filter] delay-[var(--reveal-delay)] duration-[var(--reveal-duration)] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform,filter] data-[reveal-visible=true]:translate-x-0 data-[reveal-visible=true]:translate-y-0 data-[reveal-visible=true]:opacity-100 data-[reveal-visible=true]:blur-0 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${className}`}
      data-reveal-direction={direction}
      data-reveal-visible={visible ? "true" : "false"}
      style={{
        ...style,
        "--reveal-delay": `${delay}ms`,
        "--reveal-duration": `${duration}ms`
      } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
