import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/custom/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "News",
  description: "Social media app like platefprm x",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <ReactQueryProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
