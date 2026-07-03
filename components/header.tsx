"use client";

import { Copy, MapPin, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { assets } from "@/lib/assets";
import { profile } from "@/lib/portfolio";
import { ButtonLink } from "@/components/button";

export function Header() {
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);

  const copyEmail = () => {
    void navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 2200);
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const openMenu = () => {
    setMenuMounted(true);
    window.requestAnimationFrame(() => setMenuOpen(true));
  };

  const closeMenu = () => {
    setMenuOpen(false);
    window.setTimeout(() => setMenuMounted(false), 560);
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 -mx-6 flex w-[calc(100%+48px)] items-center justify-between bg-page/90 px-6 py-3 backdrop-blur-md desktop:gap-6"
        data-name="Header Container"
      >
        <a className="flex shrink-0 items-center gap-2" href="#top" aria-label="Роман Ушаков">
          <span className="relative size-12 overflow-hidden rounded-full">
            <Image
              alt=""
              className="absolute left-[-106%] top-[-70%] size-[322%] max-w-none object-cover"
              height={155}
              priority
              src={assets.avatar}
              width={155}
            />
          </span>
          <span className="whitespace-nowrap text-base font-medium leading-5 desktop:text-xl desktop:leading-none">
            {profile.name}
          </span>
        </a>

        <div className="hidden shrink-0 items-center gap-2 desktop:flex">
          <MapPin aria-hidden className="size-6 text-muted" />
          <span className="whitespace-nowrap text-xl leading-6 text-muted">{profile.location}</span>
        </div>

        <div className="hidden min-w-0 flex-1 desktop:block" />

        <nav aria-label="Основная навигация" className="hidden items-center gap-2 desktop:flex">
          <button
            className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-base font-semibold transition hover:bg-[rgba(48,144,234,0.1)] active:bg-[rgba(48,144,234,0.3)]"
            onClick={copyEmail}
            type="button"
          >
            Почта
            <Copy aria-hidden className="size-6" strokeWidth={1.8} />
          </button>
          <ButtonLink href={profile.resume} icon="download" variant="plain">
            Скачать резюме
          </ButtonLink>
        </nav>

        <button
          aria-expanded={menuMounted && menuOpen}
          aria-label="Открыть меню"
          className="inline-flex size-12 items-center justify-center rounded-full transition hover:bg-white/50 active:bg-white/70 desktop:hidden"
          onClick={openMenu}
          type="button"
        >
          <Menu aria-hidden className="size-6" />
        </button>
      </header>

      {menuMounted ? <MobileMenu open={menuOpen} onClose={closeMenu} onCopyEmail={copyEmail} /> : null}
      <div
        aria-live="polite"
        className={`fixed left-1/2 top-24 z-[60] -translate-x-1/2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium leading-5 text-ink shadow-lg transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          copied ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
        role="status"
      >
        Скопировано
      </div>
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  onCopyEmail
}: {
  open: boolean;
  onClose: () => void;
  onCopyEmail: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const itemClass = "transition-colors duration-200 ease-out";

  return (
    <div
      aria-modal="true"
      className={`fixed inset-0 z-50 flex items-start justify-center bg-page p-6 transition-opacity duration-300 ease-out desktop:hidden ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
    >
      <div
        aria-label="Мобильная навигация"
        className={`flex h-[calc(100dvh-48px)] w-full flex-col items-end rounded-2xl bg-primary-menu px-4 py-3 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        }`}
      >
        <button
          aria-label="Закрыть меню"
          autoFocus
          className={`inline-flex size-12 items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 ${itemClass}`}
          onClick={onClose}
          type="button"
        >
          <X aria-hidden className="size-6" />
        </button>
        <a
          className={`flex h-12 w-full items-center justify-center rounded-full px-4 text-xl font-semibold leading-6 text-ink hover:bg-black/5 active:bg-black/10 ${itemClass}`}
          href={profile.resume}
          rel="noreferrer"
          target="_blank"
        >
          Скачать резюме
        </a>
        <button
          className={`flex h-12 w-full items-center justify-center gap-2 rounded-full px-4 text-xl font-semibold leading-6 text-ink hover:bg-black/5 active:bg-black/10 ${itemClass}`}
          onClick={() => {
            onCopyEmail();
            onClose();
          }}
          type="button"
        >
          Почта
          <Copy aria-hidden className="size-6" strokeWidth={1.8} />
        </button>
        <a
          className={`flex h-12 w-full items-center justify-center rounded-full px-4 text-xl font-semibold leading-6 text-ink hover:bg-black/5 active:bg-black/10 ${itemClass}`}
          href={profile.vk}
          rel="noreferrer"
          target="_blank"
        >
          VK
        </a>
        <a
          className={`flex h-12 w-full items-center justify-center rounded-full px-4 text-xl font-semibold leading-6 text-ink hover:bg-black/5 active:bg-black/10 ${itemClass}`}
          href={profile.telegram}
          rel="noreferrer"
          target="_blank"
        >
          Telegram
        </a>
      </div>
    </div>
  );
}
