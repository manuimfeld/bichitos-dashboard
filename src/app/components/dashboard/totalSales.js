"use client";

export default function TotalSales({ allSales, allExpenses }) {
  return (
    <>
      <div class="card bg-white shadow-lg rounded-lg p-6 flex items-center">
        <div class="icon bg-teal-100 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-teal-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v8m-4-4h8"
            />
          </svg>
        </div>
        <div class="ml-4">
          <h2 class="text-xl font-semibold text-gray-800">Ingresos del mes</h2>
          <p id="ingresos-mes" class="text-3xl font-bold text-green-500 mt-2">
            $
            {Intl.NumberFormat(
              ("es-AR",
              {
                style: "currency",
                currency: "ARS",
              })
            ).format(allSales.total_sales)}
          </p>
        </div>
      </div>
      <div class="card bg-white shadow-lg rounded-lg p-6 flex items-center">
        <div class="icon bg-blue-100 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v8m-4-4h8"
            />
          </svg>
        </div>
        <div class="ml-4">
          <h2 class="text-xl font-semibold text-gray-800">Ventas del mes</h2>
          <p id="numero-ventas" class="text-3xl font-bold text-blue-500 mt-2">
            {allSales.total_sales_count} ventas
          </p>
        </div>
      </div>
      <div class="card bg-white shadow-lg rounded-lg p-6 flex items-center">
        <div class="icon bg-red-100 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v8m-4-4h8"
            />
          </svg>
        </div>
        <div class="ml-4">
          <h2 class="text-xl font-semibold text-gray-800">Gastos del mes</h2>
          <p id="gastos-mes" class="text-3xl font-bold text-red-500 mt-2">
            $
            {Intl.NumberFormat(
              ("es-AR",
              {
                style: "currency",
                currency: "ARS",
              })
            ).format(allExpenses.total_expenses_amount)}
          </p>
        </div>
      </div>
    </>
  );
}
