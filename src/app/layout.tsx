import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fast Car Paint Repair Estimate",
  description: "Upload damage photos and get an estimated auto body paint repair price range.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
