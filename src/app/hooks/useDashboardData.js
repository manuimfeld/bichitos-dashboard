import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useStore from "../store/store";

const useDashboardData = () => {
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

  return {
    salesToday,
    allSales,
    allExpenses,
    error,
    loadingToday,
    loadingExpenses,
    loadingAll,
    dataLoaded,
  };
};

export default useDashboardData;
