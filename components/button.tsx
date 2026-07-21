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
    "group relative inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-base font-semibold leading-6 transition-[background-color,color,box-shadow] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const styles = {
    primary:
      "bg-primary text-invert shadow-button after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:shadow-button-inner hover:bg-[#5da8ef] active:bg-[#1783e8]",
    plain: "text-ink hover:bg-[#eaeaeb] active:bg-[#e0e0e1]",
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
        <span
          aria-hidden
          className="relative z-10 size-6 bg-current"
          style={{
            WebkitMask: `url(${assets.downloadIcon}) center / contain no-repeat`,
            mask: `url(${assets.downloadIcon}) center / contain no-repeat`
          }}
        />
      ) : null}
    </a>
  );
}
