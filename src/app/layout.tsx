import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/core/ThemeProvider"; // ThemeProvider'ı import et

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bubilet - Otobüs Bilet Satış",
  description: "Projesoft için geliştirilmiş bilet satış uygulaması",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning uyarısını engellemek için html etiketine eklenir.
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" 
          forcedTheme="dark"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}