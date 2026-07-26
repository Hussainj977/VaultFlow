import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VaultFlow",
  description: "Unified AI-powered knowledge and communication workspace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}