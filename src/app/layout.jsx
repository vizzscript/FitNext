// src/app/layout.js (server component)
import { Toaster } from "react-hot-toast";
import './app.css';

export const metadata = {
  title: "FitNext",
  description: "Your fitness workaround in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
          {children}
        <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--toast-background)", // Use CSS variable for theme-aware bg
            color: "var(--toast-color)", // Use CSS variable for theme-aware text
          },
        }}
      />
      </body>
    </html>
  );
}
