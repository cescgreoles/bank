import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Your Bank",
  description: "Tu banco de confianza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col justify-between`}
      >
        <header className="border border-solid">
          <Navbar />
        </header>

        <main className="flex-grow">{children}</main>

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
