"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import reduceAmount from "../../utils/reduceAmunt";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Sales({ params }) {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getToken() {
    let token = localStorage.getItem("authorization");
    return token;
  }

  useEffect(() => {
    const fetchSales = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/sales/${params.date}`, {
          headers: {
            authorization: `${getToken()}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(function (response) {
          setSales(response.data);
        })
        .catch(function (error) {
          setError("Error fetching sales");
          console.error(error);
        })
        .finally(function () {
          setLoading(false);
        });
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
  if (error)
    return (
      <div className="text-black text-xs bg-white col-span-2 row-start-2 p-4 overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
        <p>Ha ocurrido un error, por favor inicia sesión</p>
        <Link
          href="/login"
          className="inline-block mt-2 px-2 py-2 bg-[#039ABD] rounded-full text-white"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  if (error) {
    return (
      <div className="text-black text-xs bg-white col-span-2 row-start-2 p-4 overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
        <p className="mx-auto w-fit">{error}</p>
      </div>
    );
  }

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
