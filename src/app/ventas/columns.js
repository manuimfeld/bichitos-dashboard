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
import { DeleteAlertDialogContent } from "../components/deleteButton";
import { EditDialogContent } from "../components/editButton";

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
      const roundedAmount = Math.floor(amount);
      return roundedAmount;
    },
  },
  {
    accessorKey: "turn",
    header: "Turno",
    cell: ({ getValue }) => {
      const turnMethodMap = {
        1: "Mañana",
        2: "Tarde",
      };
      return turnMethodMap[getValue()] || getValue();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sale = row.original;

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
            <EditDialogContent sale={sale} />
            <DeleteAlertDialogContent sale={sale} />
          </AlertDialog>
        </Dialog>
      );
    },
  },
];
