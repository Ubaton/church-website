import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "next-themes";
import { metadata } from "./metadata";

const rubikSans = localFont({
  src: "./fonts/Rubik-VariableFont_wght.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const rubikMono = localFont({
  src: "./fonts/Rubik-VariableFont_wght.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rubikSans.variable} ${rubikMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
