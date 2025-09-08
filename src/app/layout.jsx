// src/app/layout.js (server component)
import { Toaster } from "react-hot-toast";
import './app.css';
import ThemeProvider from "./theme-provider";

export const metadata = {
  title: "FitNext",
  description: "Your fitness workaround in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "var(--toast-background)",
                color: "var(--toast-color)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
