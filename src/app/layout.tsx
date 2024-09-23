import type { Metadata } from "next";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "프로티너",
  description: "단백질 급원 성분, 맛 필터링, 가겨비교 분석 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  );
}
