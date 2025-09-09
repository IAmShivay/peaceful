import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from '@/components/providers/session-provider';
import ToastProvider from '@/components/providers/toast-provider';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AudioStream Pro - Premium Audio Streaming & Downloads",
  description: "The ultimate platform for high-quality audio streaming and downloads. Discover, stream, and download premium audio content with flexible subscription plans.",
  keywords: ["audio streaming", "music download", "premium audio", "sound library", "audio subscription"],
  authors: [{ name: "AudioStream Pro Team" }],
  creator: "AudioStream Pro",
  publisher: "AudioStream Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: "AudioStream Pro - Premium Audio Streaming & Downloads",
    description: "The ultimate platform for high-quality audio streaming and downloads.",
    url: "/",
    siteName: "AudioStream Pro",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AudioStream Pro",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AudioStream Pro - Premium Audio Streaming & Downloads",
    description: "The ultimate platform for high-quality audio streaming and downloads.",
    images: ["/og-image.jpg"],
    creator: "@audiostreamPro",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <AuthSessionProvider>
          {children}
          <ToastProvider />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
