import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://propofy-five.vercel.app"),
  title: {
    default: "propofy — propostas e orçamentos profissionais em minutos",
    template: "%s",
  },
  description:
    "Monte propostas comerciais e orçamentos profissionais em minutos com IA e envie um link pronto pelo WhatsApp. Grátis para começar, sem cartão.",
  openGraph: {
    title: "propofy — propostas e orçamentos profissionais em minutos",
    description:
      "Monte propostas e orçamentos profissionais em minutos com IA e envie um link pronto pelo WhatsApp. Grátis para começar, sem cartão.",
    type: "website",
    locale: "pt_BR",
    siteName: "propofy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
