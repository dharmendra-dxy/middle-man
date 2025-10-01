import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const popins = Poppins({
  subsets: ["latin"],
  weight: ["400","500", "600", "700", "800"],
});


export const metadata: Metadata = {
  title: "Middle-Man | API Testing",
  description: "Test your api's using middle-man",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${popins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
