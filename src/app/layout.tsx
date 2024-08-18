import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderComponent from "../app/redux/provider";
import GuestSessionInitializer from "./components/GuestSessionInitializer/GuestSessionInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Movies Demo",
  description: "Movie DB movies api display demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderComponent>
          <GuestSessionInitializer />
          {children}
        </ProviderComponent>
      </body>
    </html>
  );
}
