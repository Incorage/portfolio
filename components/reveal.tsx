"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

type RevealProps = {
  as?: "div" | "section" | "footer" | "h1" | "h2" | "h3" | "p" | "span";
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onReveal?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  onReveal,
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const onRevealRef = useRef(onReveal);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    onRevealRef.current = onReveal;
  }, [onReveal]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const bottomMargin = Tag === "footer" ? "0px" : window.innerWidth >= 1024 ? "-160px" : "-96px";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          onRevealRef.current?.();
          observer.unobserve(node);
        }
      },
      { rootMargin: `0px 0px ${bottomMargin} 0px`, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [Tag]);

  return (
    <Tag
      {...props}
      ref={(node) => {
        ref.current = node;
      }}
      className={`reveal ${className}`}
      data-reveal-visible={visible ? "true" : "false"}
      style={{
        ...style,
        "--reveal-delay": `${delay}ms`
      } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
