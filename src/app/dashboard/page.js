"use client";
import DashboardSummary from "../components/dashboard/dashboardSummary";
import useDashboardData from "../hooks/useDashboardData";

export default function Dashboard() {
  const {
    salesToday,
    allSales,
    allExpenses,
    error,
    loadingToday,
    loadingExpenses,
    loadingAll,
  } = useDashboardData();

  if (loadingToday || loadingExpenses || loadingAll) {
    return (
      <div className="flex flex-wrap justify-between gap-3">
        <DashboardSummary
          loadingToday={loadingToday}
          loadingExpenses={loadingExpenses}
          loadingAll={loadingAll}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-wrap justify-between gap-3">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center md:justify-between gap-3">
      <DashboardSummary
        salesToday={salesToday}
        allSales={allSales}
        allExpenses={allExpenses}
      />
    </div>
  );
}
