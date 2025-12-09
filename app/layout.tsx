import "./globals.css";

export const metadata = {
  title: "Math Engine",
  description: "Adaptive training",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
