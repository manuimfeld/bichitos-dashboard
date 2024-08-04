"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import reduceAmount from "../utils/reduceAmunt";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getToken() {
    let token = localStorage.getItem("Authorization");
    return token;
  }

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/sales/today`,
          {
            headers: {
              authorization: `${getToken()}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        ); // Esto llama a la API Route que hemos creado
        setSales(response.data);
      } catch (error) {
        setError("Error fetching sales");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading)
    return (
      <div className="text-black text-xs bg-white col-span-2 row-start-2 p-4 overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
        <Skeleton className="h-[24px] w-2/4" />
        <Skeleton className="h-[15px] w-1/4 mt-4" />
        <Skeleton className="h-[15px] w-1/4 mt-2" />
        <Skeleton className="h-[85px] w-full mt-4" />
      </div>
    );
  if (error) return;
  <div className="text-black text-xs bg-white col-span-2 row-start-2 p-4 overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
    <p className="mx-auto w-fit">{error}</p>
  </div>;

  return (
    <div className="text-black text-xs bg-white col-span-2 row-start-2 p-4 overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
      <h2 className="text-2xl">Historial de ventas</h2>
      <p className="mt-4">Ventas en total: {sales.length}</p>
      <p className="mb-2">
        Monto total: <span className="text-amount">${reduceAmount(sales)}</span>
      </p>

      <DataTable columns={columns} data={sales} />
    </div>
  );
}
