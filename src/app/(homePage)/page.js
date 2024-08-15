"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TotalSales from "../components/dashboard/totalSales";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authorization");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const Card = ({ title, description, href }) => (
    <a
      href={href}
      className="w-fit block bg-white rounded-lg shadow-lg p-4 text-center h-fit hover:bg-gray-100 transition duration-300"
    >
      <div className="text-xl font-semibold text-gray-800 mb-2">{title}</div>
      <p className="text-gray-600">{description}</p>
    </a>
  );

  return (
    <main className="px-4 text-black text-xs  col-span-2 row-start-2  overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
      <div className=" flex flex-wrap justify-between gap-3">
        <div class="card bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-xl font-semibold text-gray-800">Ventas Totales</h2>
          <p class="text-3xl font-bold text-green-500 mt-2">$200,000</p>
          <p class="text-gray-600">Ventas del día</p>
        </div>
        <TotalSales />
        <Card
          title="Ventas"
          description="Ver las ventas del día"
          href="/ventas"
        />
        <Card
          title="Inventario"
          description="Revisar stado del inventario"
          href="/"
        />

        <Card
          title="Gastos"
          description="Visualiar los gastos del mes"
          href="/"
        />
      </div>
    </main>
  );
}
