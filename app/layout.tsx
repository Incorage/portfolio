import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Роман Ушаков - UX/UI-дизайнер",
  description:
    "Портфолио UX/UI-дизайнера: CRM, мобильные сервисы, дизайн-системы и сложные пользовательские сценарии.",
  icons: {
    icon: "favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} bg-page font-sans text-ink antialiased`}>{children}</body>
    </html>
  );
}
