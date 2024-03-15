import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./contexts/UserContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import { SubcategoryProvider } from "./contexts/SubcategoryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Money Tracker",
  description: "Money Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* <link href="./output.css" rel="stylesheet" /> */}</head>
      <UserProvider>
        <CategoryProvider>
          <SubcategoryProvider>
            <body className={inter.className}>{children}</body>
          </SubcategoryProvider>
        </CategoryProvider>
      </UserProvider>
    </html>
  );
}
