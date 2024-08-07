import { Roboto } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next Appp",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={roboto.className}>
      <body className="flex justify-center items-center h-screen max-w-screen bg-[#FBF7F3]">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
