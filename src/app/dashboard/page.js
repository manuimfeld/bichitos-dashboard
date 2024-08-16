"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TotalSales from "../components/dashboard/totalSales";
import useStore from "../store/store";

export default function Dashboard() {
  const router = useRouter();
  const {
    salesToday,
    allSales,
    error,
    loadingToday,
    loadingAll,
    fetchAllData,
  } = useStore((state) => ({
    salesToday: state.salesToday,
    allSales: state.allSales,
    error: state.error,
    loadingToday: state.loadingToday,
    loadingAll: state.loadingAll,
    fetchAllData: state.fetchAllData,
  }));

  useEffect(() => {
    const token = localStorage.getItem("authorization");
    if (!token) {
      router.push("/login");
    } else {
      fetchAllData(); // Fetch all data when component mounts
    }
  }, [router, fetchAllData]);

  const Card = ({ sale }) => (
    <a
      href=""
      className="w-fit block bg-white rounded-lg shadow-lg p-4 text-center h-fit hover:bg-gray-100 transition duration-300"
    >
      <div className="text-xl font-semibold text-gray-800 mb-2">
        {sale.amount}
      </div>
      <p className="text-gray-600">{sale.turn}</p>
    </a>
  );

  if (loadingToday || loadingAll) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  // Get the latest 5 sales of the day
  const latestSalesToday = salesToday.slice(-5);

  return (
    <main className="lg:px-4 text-black text-xs  col-span-2 row-start-2  overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
      <div className=" flex flex-wrap justify-between gap-3">
        <div class="card bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-xl font-semibold text-gray-800">Ventas Totales</h2>
          <p class="text-3xl font-bold text-green-500 mt-2">$200,000</p>
          <p class="text-gray-600">Ventas del día</p>
        </div>
        <TotalSales />
        {latestSalesToday.map((sale, index) => {
          return <Card sale={sale} key={index} />;
        })}
        {/* <Card
          title="Inventario"
          description="Revisar stado del inventario"
          href="/"
        /> */}
      </div>
    </main>
  );
}
