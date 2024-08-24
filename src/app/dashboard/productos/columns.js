"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteAlertDialogContent } from "../../components/ventas/deleteButton";
import { EditDialogContent } from "../../components/ventas/editButton";

const formatWeight = (weight) => {
  // Redondear el peso a un decimal y luego convertirlo en número entero si el decimal es .0
  return weight % 1 === 0 ? weight.toFixed(0) : weight.toFixed(1);
};

export const columns = [
  {
    accessorKey: "product_brand",
    header: "Marca",
  },
  {
    accessorKey: "product_name",
    header: "Nombre",
  },
  {
    accessorKey: "product_weight",
    header: "Peso",
    cell: ({ row }) => {
      const weight = parseFloat(row.getValue("product_weight"));
      // Formatear el peso para mostrar sin decimales si es entero
      const displayWeight =
        weight % 1 === 0 ? weight.toFixed(0) : weight.toFixed(1);
      return `${displayWeight}KG`;
    },
  },
  {
    accessorKey: "cost_price",
    header: "Precio de lista",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost_price"));
      return `$${amount.toFixed(2)}`;
    },
  },
  {
    accessorKey: "markup_percentage_kg",
    header: "Precio por Kg",
    cell: ({ row }) => {
      const total =
        (row.original.cost_price * row.original.markup_percentage_kg) /
        row.original.product_weight;
      return `$${Math.floor(total)}`;
    },
  },
  {
    accessorKey: "price_per_bag",
    header: "Precio por Bolson",
    cell: ({ row }) => {
      const total =
        row.original.cost_price * row.original.markup_percentage_bag;
      return `$${total}`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Dialog>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menú</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <DialogTrigger>Editar</DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  <AlertDialogTrigger>Eliminar</AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <EditDialogContent sale={product} />
            <DeleteAlertDialogContent sale_id={product.product_id} />
          </AlertDialog>
        </Dialog>
      );
    },
  },
];
