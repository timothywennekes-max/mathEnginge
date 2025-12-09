import React from "react";
export const metadata = {
  title: "Math Engine",
  description: "Adaptive training",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
