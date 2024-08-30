"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

export default function Sales() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getToken() {
    let token = localStorage.getItem("authorization");
    return token;
  }

  useEffect(() => {
    const fetchSales = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/expenses`, {
          headers: {
            authorization: `${getToken()}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(function (response) {
          setExpenses(response.data);
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
      <div className="text-xs col-span-2 row-start-2 p-4 overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
        <Skeleton className="h-[24px] w-2/4" />
        <Skeleton className="h-[15px] w-1/4 mt-4" />
        <Skeleton className="h-[15px] w-1/4 mt-2" />
        <Skeleton className="h-[85px] w-full mt-4" />
      </div>
    );
  if (error)
    return (
      <div className="text-xs col-span-2 row-start-2 p-4 overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
        <p>Ha ocurrido un error, por favor inicia sesión</p>
        <Link
          href="/login"
          className="inline-block mt-2 px-2 py-2 bg-[#039ABD] rounded-full text-white"
        >
          Iniciar sesión
        </Link>
      </div>
    );

  return (
    <div className="text-xs col-span-2 row-start-2 p-4 overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
      <h2 className="text-2xl">Historial de ventas</h2>
      <DataTable columns={columns} data={expenses} />
    </div>
  );
}
