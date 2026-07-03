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

export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 700,
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
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
      className={`reveal ${className}`}
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
