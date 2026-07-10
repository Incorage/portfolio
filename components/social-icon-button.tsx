import { assets } from "@/lib/assets";

type SocialIconButtonProps = {
  href: string;
  label: string;
  type: "telegram" | "vk";
};

export function SocialIconButton({ href, label, type }: SocialIconButtonProps) {
  const src = type === "telegram" ? assets.telegramIcon : assets.vkIcon;

  return (
    <a
      aria-label={label}
      className="relative flex size-12 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-[rgba(48,144,234,0.1)] active:bg-[rgba(48,144,234,0.3)]"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <img alt="" aria-hidden className="size-6" src={src} />
    </a>
  );
}
