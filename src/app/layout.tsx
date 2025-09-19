
import { AuthorsProvider } from "@/lib/context/AuthorsContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthorsProvider>
          {children}
        </AuthorsProvider>
      </body>
    </html>
  );
}
