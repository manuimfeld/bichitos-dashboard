"use client";
import { useState } from "react";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Sales() {
  const expenses = [
    {
      date: "2024-08-08",
      category: "Proveedor",
      provider: "CYH",
      amount: 153300,
      payment_type: "Efectivo",
      status: "Pago",
    },
    {
      date: "2024-08-07",
      category: "Proveedor",
      provider: "Merlo",
      amount: 232000,
      payment_type: "Transferencia + Efectivo",
      status: "Impago",
    },
    {
      date: "2024-08-04",
      category: "Alquiler local",
      provider: "-",
      amount: 222000,
      payment_type: "Efectivo",
      status: "Pago",
    },
  ];

  return (
    <div className="text-black text-xs bg-white col-span-2 row-start-2 p-4 overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
      <h2 className="text-2xl">Historial de gastos</h2>
      <DataTable columns={columns} data={expenses} />
    </div>
  );
}
