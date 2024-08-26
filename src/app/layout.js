import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import AsideMenu from "./components/asideMenu";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./components/themeProvider";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="h-screen w-screen grid grid-cols-[19vw_auto] grid-rows-[48px_1fr] bg-[#FBF7F3] dark:bg-[#0C0D14] dark:text-white text-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <AsideMenu />
          <main className="px-4 col-start-1 col-end-3 row-start-2 md:col-start-2 md:row-start-2 text-black dark:text-white text-xs overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
            {children}
          </main>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
