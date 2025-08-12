import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LayoutClient from "../components/Layout/LayoutClient";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Go Travels Itinerary",
    template: "%s - Go Travels Itinerary",
  },
  description:
    "Go Travels Itinerary is your ultimate travel companion, helping you plan and organize your trips with ease.",
  twitter: {
    card: "summary_large_image",
    creator: "@NugarRahman",
  },
  openGraph: {
    type: "website",
    url: "https://gotravelsco.vercel.app",
  },
  keywords: [
    "Go Travel",
    "travel itinerary",
    "trip planner",
    "travel guide",
    "vacation planning",
    "travel tips",
    "explore destinations",
    "travel app",
  ],
};

export const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontPoppins.className} antialiased`}>
        <Toaster position="top-right" expand={true} richColors />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
