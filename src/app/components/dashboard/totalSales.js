"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TotalSales() {
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
        .get(`${process.env.NEXT_PUBLIC_API_URL}/salestotalmonth`, {
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
        <p>Cargando...</p>
      </div>
    );
  if (error)
    return (
      <div className="text-black text-xs bg-white col-span-2 row-start-2 p-4 overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
        <p>Ha ocurrido un error</p>
        <p>{error}</p>
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
      <p>{JSON.stringify(sales)}</p>
    </div>
  );
}
