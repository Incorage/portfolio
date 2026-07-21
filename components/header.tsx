"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/button";
import { assets } from "@/lib/assets";
import { profile, type Language, type SiteCopy } from "@/lib/portfolio";

export function Header({
  copy,
  language,
  onChangeLanguage
}: {
  copy: SiteCopy;
  language: Language;
  onChangeLanguage: () => void;
}) {
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

  useEffect(() => {
    if (!menuMounted) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuMounted]);

  const scrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (window.matchMedia("(pointer: coarse)").matches) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const startY = window.scrollY;
    const duration = Math.min(1300, Math.max(800, startY * 0.45));
    const startedAt = window.performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startedAt;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, startY * (1 - eased));

      if (progress < 1) window.requestAnimationFrame(animateScroll);
    };

    window.requestAnimationFrame(animateScroll);
  };

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
        <a
          aria-label={profile.name[language]}
          className="group flex shrink-0 items-center gap-2"
          href="#top"
          onClick={scrollToTop}
        >
          <span className="relative size-12 overflow-hidden rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-focus-visible:scale-110">
            <img alt="" className="absolute inset-0 size-full object-cover" src={assets.avatar} />
          </span>
          <span className="whitespace-nowrap text-base font-medium leading-5 desktop:text-xl desktop:leading-none">
            {profile.name[language]}
          </span>
        </a>

        <div className="hidden shrink-0 items-center gap-2 desktop:flex">
          <img alt="" aria-hidden className="size-6" src={assets.geolocationIcon} />
          <span className="whitespace-nowrap text-xl leading-6 text-muted">{profile.location[language]}</span>
        </div>

        <div className="hidden min-w-0 flex-1 desktop:block" />

        <nav aria-label={copy.mainNav} className="hidden items-center gap-2 desktop:flex">
          <button
            className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-base font-semibold text-ink transition-colors duration-200 ease-out hover:bg-[#eaeaeb] active:bg-[#e0e0e1]"
            onClick={copyEmail}
            type="button"
          >
            {copy.mailCta}
            <span
              aria-hidden
              className="size-6 bg-current"
              style={{
                WebkitMask: `url(${assets.copyIcon}) center / contain no-repeat`,
                mask: `url(${assets.copyIcon}) center / contain no-repeat`
              }}
            />
          </button>
          <ButtonLink href={profile.resume} icon="download" variant="plain">
            {copy.resumeCta}
          </ButtonLink>
          <button
            aria-label={copy.switchLanguage}
            className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-base font-semibold leading-6 text-ink transition-colors duration-200 ease-out hover:bg-[#eaeaeb] active:bg-[#e0e0e1]"
            onClick={onChangeLanguage}
            type="button"
          >
            <img
              alt=""
              aria-hidden
              className="size-6 rounded-full"
              src={language === "ru" ? assets.languageRu : assets.languageEn}
            />
            <span>{language === "ru" ? "РУ" : "EN"}</span>
          </button>
        </nav>

        <button
          aria-expanded={menuMounted && menuOpen}
          aria-label={copy.openMenu}
          className="inline-flex size-12 items-center justify-center rounded-full transition hover:bg-white/50 active:bg-white/70 desktop:hidden"
          onClick={openMenu}
          type="button"
        >
          <img alt="" aria-hidden className="size-6" src={assets.menuIcon} />
        </button>
      </header>

      {menuMounted ? (
        <MobileMenu
          copy={copy}
          language={language}
          onChangeLanguage={onChangeLanguage}
          onClose={closeMenu}
          onCopyEmail={copyEmail}
          open={menuOpen}
        />
      ) : null}
      <div
        aria-live="polite"
        className={`fixed left-1/2 top-24 z-[60] inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium leading-5 text-ink shadow-lg transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          copied ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
        role="status"
      >
        <img alt="" aria-hidden className="size-5" src={assets.copyIcon} />
        <span>{copy.copiedMail}</span>
      </div>
    </>
  );
}

function MobileMenu({
  copy,
  language,
  onChangeLanguage,
  open,
  onClose,
  onCopyEmail
}: {
  copy: SiteCopy;
  language: Language;
  onChangeLanguage: () => void;
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

  const itemClass = "transition-colors duration-200 ease-out hover:text-white";

  return (
    <div
      aria-modal="true"
      className={`fixed inset-0 z-50 flex items-start justify-center bg-page p-6 transition-opacity duration-300 ease-out desktop:hidden ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
    >
      <div
        aria-label={copy.mobileNav}
        className={`flex h-[calc(100dvh-48px)] w-full flex-col items-end rounded-2xl bg-primary-menu px-4 py-3 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        }`}
      >
        <button
          aria-label={copy.closeMenu}
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
          {copy.resumeCta}
        </a>
        <button
          className={`flex h-12 w-full items-center justify-center gap-2 rounded-full px-4 text-xl font-semibold leading-6 text-ink hover:bg-black/5 active:bg-black/10 ${itemClass}`}
          onClick={() => {
            onCopyEmail();
            onClose();
          }}
          type="button"
        >
          {copy.mailCta}
          <span
            aria-hidden
            className="size-6 bg-current"
            style={{
              WebkitMask: `url(${assets.copyIcon}) center / contain no-repeat`,
              mask: `url(${assets.copyIcon}) center / contain no-repeat`
            }}
          />
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
        <button
          aria-label={copy.switchLanguage}
          className={`flex h-12 w-full items-center justify-center gap-2 rounded-full px-4 text-xl font-semibold leading-6 text-ink hover:bg-black/5 active:bg-black/10 ${itemClass}`}
          onClick={() => {
            onChangeLanguage();
            onClose();
          }}
          type="button"
        >
          <img
            alt=""
            aria-hidden
            className="size-6 rounded-full"
            src={language === "ru" ? assets.languageRu : assets.languageEn}
          />
          <span>{language === "ru" ? "РУ" : "EN"}</span>
        </button>
      </div>
    </div>
  );
}
