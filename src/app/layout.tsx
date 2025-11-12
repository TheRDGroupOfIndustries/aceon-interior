import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aceon Interior",
  description: "Aceon Interior is a premier interior design company offering bespoke solutions for residential and commercial spaces. We specialize in creating luxurious, functional, and aesthetically pleasing environments tailored to our clients' unique tastes and needs.",
  icons: {
    icon: "/aceonLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <ReduxProvider>{children}</ReduxProvider>

        {/* {children} */}
      </body>
    </html>
  );
}
