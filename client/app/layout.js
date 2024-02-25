import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Money Tracker",
  description: "Money Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* <link href="./output.css" rel="stylesheet" /> */}</head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
