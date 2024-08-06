"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";

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
      const payment = row.original;

      return (
        <Dialog>
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
                Eliminar venta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar venta</DialogTitle>
              <DialogDescription>
                Cambie los valores de la venta
              </DialogDescription>
              <div className="grid gap-4 py-4 text-black">
                <form className="h-fit flex-col">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pago" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Efectivo</SelectItem>
                        <SelectItem value="2">Transferencia</SelectItem>
                        <SelectItem value="3">Débito</SelectItem>
                        <SelectItem value="4">Crédito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="payment_type">
                      Monto
                      <Input
                        id="amount"
                        type="number"
                        defaultValue={Math.floor(payment.amount)}
                      />
                    </Label>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Turno" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Mañana</SelectItem>
                        <SelectItem value="2">Tarde</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <input type="submit" value="Guardar" />
                </form>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
