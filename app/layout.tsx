import type { ReactNode } from "react";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata = {
  title: "Math Engine",
  description: "Adaptive training",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
