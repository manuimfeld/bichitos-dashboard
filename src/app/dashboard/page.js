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
    </div>
  );
}
