import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vidaamuyarchi DSA SaaS Dashboard",
  description: "Modern C++ and DSA preparation workspace with progress analytics and Firebase-ready architecture.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
