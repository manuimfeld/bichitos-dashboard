"use client";

export const columns = [
  {
    accessorKey: "payment_method_id",
    header: "Pago",
    cell: ({ getValue }) => {
      const paymentMethodMap = {
        1: "Efectivo",
        2: "Transferencia",
        3: "Débito",
        4: "Crédito",
      };
      return paymentMethodMap[getValue()] || getValue();
    },
  },
  {
    accessorKey: "amount",
    header: "Monto",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(amount);
      return formatted;
    },
  },
  { accessorKey: "turn", header: "Turno" },
];
