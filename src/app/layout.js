import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
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
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rubikSans.variable} ${rubikMono.variable} ${playfair.variable} font-sans antialiased`}
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
