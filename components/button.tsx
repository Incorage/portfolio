import { assets } from "@/lib/assets";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "plain" | "inverted";
  icon?: "telegram" | "download";
  onClick?: () => void;
};

export function ButtonLink({ href, children, variant = "primary", icon, onClick }: ButtonLinkProps) {
  const base =
    "group relative inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-base font-semibold leading-6 transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const styles = {
    primary:
      "bg-primary text-invert shadow-button after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:shadow-button-inner hover:bg-[#5da8ef] active:bg-[#1783e8]",
    plain: "text-primary hover:bg-[rgba(48,144,234,0.1)] active:bg-[rgba(48,144,234,0.3)]",
    inverted: "text-invert hover:bg-white/10 active:bg-white/30"
  };

  return (
    <a className={`${base} ${styles[variant]}`} href={href} onClick={onClick} rel="noreferrer" target="_blank">
      {icon === "telegram" ? (
        <img
          alt=""
          aria-hidden
          className="relative z-10 size-6"
          src={assets.telegramWhite}
        />
      ) : null}
      <span className="relative z-10">{children}</span>
      {icon === "download" ? (
        <img alt="" aria-hidden className="relative z-10 size-6" src={assets.downloadIcon} />
      ) : null}
    </a>
  );
}
