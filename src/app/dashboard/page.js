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
    allExpenses,
    error,
    loadingToday,
    loadingExpenses,
    dataLoaded,
    loadingAll,
    fetchAllData,
  } = useStore((state) => ({
    salesToday: state.salesToday,
    allSales: state.allSales,
    allExpenses: state.allExpenses,
    error: state.error,
    loadingToday: state.loadingToday,
    loadingExpenses: state.loadingExpenses,
    dataLoaded: state.dataLoaded,
    loadingAll: state.loadingAll,
    fetchAllData: state.fetchAllData,
  }));

  useEffect(() => {
    const token = localStorage.getItem("authorization");
    if (!token) {
      router.push("/login");
    } else if (!dataLoaded) {
      fetchAllData(); // Fetch all data when component mounts
    }
  }, [router, fetchAllData, dataLoaded]);

  if (loadingToday || loadingExpenses || loadingAll)
    return (
      <div className="flex flex-wrap justify-between gap-3">
        <p>Loading data...</p>;
      </div>
    );

  if (error)
    return (
      <div className="flex flex-wrap justify-between gap-3">
        <p>{error}</p>;
      </div>
    );

  // Get the latest 5 sales of the day
  const latestSalesToday = salesToday.slice(-5);

  return (
    <div className="flex flex-wrap justify-between gap-3">
      <TotalSales allSales={allSales} allExpenses={allExpenses} />
      <div className="flex flex-col gap-4 p-4">
        <div className="card bg-white bg-opacity-20 shadow-lg rounded-lg p-6 backdrop-filter backdrop-blur-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Últimas 5 Ventas
          </h2>
          <table className="w-full table-fixed text-center">
            <thead>
              <tr className="text-gray-500 uppercase text-sm">
                <th className="w-1/3 py-2">Monto</th>
                <th className="w-1/3 py-2">Método de Pago</th>
                <th className="w-1/3 py-2">Turno</th>
              </tr>
            </thead>
            <tbody className="text-black text-opacity-80 select-none">
              {latestSalesToday.map((sale, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-2">
                    {Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    }).format(sale.amount)}
                  </td>
                  <td className="py-2">{sale.payment_method_id}</td>
                  <td className="py-2">{sale.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
