import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "StayLux — Premium Vacation Rentals",
    template: "%s | StayLux",
  },
  description:
    "Discover extraordinary vacation rentals — villas, cabins, treehouses, beachfronts and more. Book unique stays with StayLux.",
  keywords: [
    "vacation rentals",
    "luxury stays",
    "villa rental",
    "cabin rental",
    "airbnb alternative",
  ],
  authors: [{ name: "StayLux" }],
  creator: "StayLux",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "StayLux — Premium Vacation Rentals",
    description:
      "Discover extraordinary vacation rentals — villas, cabins, treehouses, beachfronts and more.",
    siteName: "StayLux",
  },
  twitter: {
    card: "summary_large_image",
    title: "StayLux — Premium Vacation Rentals",
    description:
      "Discover extraordinary vacation rentals — villas, cabins, treehouses, beachfronts and more.",
    creator: "@staylux",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SessionProvider>
            <QueryProvider>
              {children}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
              />
            </QueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
