import type { Metadata } from "next";
import {
  Playfair_Display,
  Crimson_Text,
  Dancing_Script,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const crimson = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lì Xì Bính Ngọ 2026 — Chúc Mừng Năm Mới",
  description:
    "Thiệp lì xì Tết Bính Ngọ 2026 từ Minh Quân (Bin) gửi tặng gia đình thân yêu. Mã đáo thành công!",
  openGraph: {
    title: "🧧 Lì Xì Bính Ngọ 2026",
    description: "Thiệp chúc Tết từ Minh Quân (Bin) gửi gia đình",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${playfair.variable} ${crimson.variable} ${dancing.variable}`}
        style={{
          fontFamily: "var(--font-crimson), Georgia, serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
