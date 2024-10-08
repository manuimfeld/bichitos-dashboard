"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { logout } from "../utils/logout";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Bell, Moon, Sun } from "lucide-react";

const SHEET_SIDES = ["left"];

export default function Header() {
  const currentLocation = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-start-2 md:row-start-1 md:row-end-2 bg-white dark:bg-[#020817] dark:text-white h-12 border-b border-[#E5E7EB] dark:border-[#2D2F40] md:p-4">
      <div className="flex items-center w-full h-full">
        <div className="md:hidden flex h-full w-fit items-center">
          {SHEET_SIDES.map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    className="mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>
                    <Image
                      src="/bichitos-logo.webp"
                      width={50}
                      height={50}
                      alt="logo"
                      className="mx-auto"
                    />
                  </SheetTitle>
                </SheetHeader>
                <ul className="text-black font-light w-full px-2 mt-4 mx-auto">
                  <li className=" hover:bg-[#EDEDED] w-full px-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                      <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
                    </svg>
                    <Link href="/dashboard" className="ml-1">
                      Inicio
                    </Link>
                  </li>
                  <li className="font-normal mt-2 hover:bg-[#EDEDED] w-full px-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <circle cx="10" cy="20.5" r="1" />
                      <circle cx="18" cy="20.5" r="1" />
                      <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
                    </svg>
                    Ventas
                  </li>
                  <li className=" mt-1 ml-6 hover:bg-[#EDEDED] w-fit px-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20v-6M6 20V10M18 20V4" />
                    </svg>
                    <Link href="/dashboard/ventas" className="ml-1">
                      Ver ventas
                    </Link>
                  </li>
                  <li className=" mt-1 ml-6 hover:bg-[#EDEDED] w-fit px-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <Link href="/dashboard/ventas/crear" className="ml-1">
                      Crear ventas
                    </Link>
                  </li>

                  <li className="font-normal mt-2 hover:bg-[#EDEDED] w-full px-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M7 15h0M2 9.5h20" />
                    </svg>
                    Gastos
                  </li>
                  <li className=" mt-1 ml-6 hover:bg-[#EDEDED] w-fit px-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M12 20v-6M6 20V10M18 20V4" />
                    </svg>
                    <Link href="/dashboard/gastos">Ver gastos</Link>
                  </li>
                  <li className=" mt-1 ml-6 hover:bg-[#EDEDED] w-fit px-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <Link href="/dashboard/gastos/crear">Crear gastos</Link>
                  </li>

                  <li className="font-normal mt-2 hover:bg-[#EDEDED] w-full px-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M7 15h0M2 9.5h20" />
                    </svg>
                    Productos
                  </li>
                  <li className=" mt-1 ml-6 hover:bg-[#EDEDED] w-fit px-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M12 20v-6M6 20V10M18 20V4" />
                    </svg>
                    <Link href="/dashboard/productos">Ver productos</Link>
                  </li>
                  <li className=" mt-1 ml-6 hover:bg-[#EDEDED] w-fit px-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <Link href="/dashboard/productos/crear">
                      Crear productos
                    </Link>
                  </li>
                  <li className=" mt-2 hover:bg-[#EDEDED] w-full px-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                      <line x1="12" y1="2" x2="12" y2="12"></line>
                    </svg>
                    <Link onClick={logout} href="/login">
                      Cerrar sesión
                    </Link>
                  </li>
                </ul>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Cerrar</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
        <p className="w-fit">
          {currentLocation.length <= 1 ? "Inicio" : currentLocation}{" "}
        </p>
        <Bell stroke="currentColor" className="ml-auto" />
        {theme === "light" ? (
          <>
            <Moon
              stroke="currentColor"
              onClick={() => setTheme("dark")}
              className="ml-4 cursor-pointer"
            />
          </>
        ) : (
          <>
            <Sun
              stroke="#FDB813"
              onClick={() => setTheme("light")}
              className="ml-4 cursor-pointer"
            />
          </>
        )}
      </div>
    </header>
  );
}
