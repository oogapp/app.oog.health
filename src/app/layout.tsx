import { AuthTokenProvider } from "@/components/context/auth";
import { QueryProvider } from "@/components/context/query";
import { ThemeProvider } from "@/components/context/theme";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oog Health",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
  minimumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let bearerToken = cookies().get('token')
  return (
    <AuthTokenProvider bearerToken={bearerToken?.value}>
      <html suppressHydrationWarning lang="en">

        <QueryProvider>
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </QueryProvider>
      </html>
    </AuthTokenProvider>
  );
}
