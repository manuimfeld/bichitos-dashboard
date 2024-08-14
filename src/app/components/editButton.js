import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  amount: z
    .string()
    .regex(/^\d+$/, { message: "Monto debe ser un número válido sin letras" }) // Asegura que solo contiene dígitos
    .min(1, { message: "Monto es requerido" }) // Asegura que el monto no esté vacío
    .max(10, { message: "Monto debe tener un máximo de 10 caracteres" }), // Asegura un máximo de caracteres

  payment_method_id: z
    .string()
    .min(1, { message: "Método de pago es requerido" }), // Asegura que el campo no esté vacío
  turn: z.enum(["Mañana", "Tarde"], {
    message: "Turno debe ser 'mañana' o 'tarde'",
  }), // Asegura que solo puede ser 'mañana' o 'tarde'

  date: z.date(),
});

const methodMapping = {
  1: "Efectivo",
  2: "Transferencia",
  3: "Débito",
  4: "Crédito",
};
const turnMapping = {
  1: "Mañana",
  2: "Tarde",
};

export const EditDialogContent = ({ sale }) => {
  const saleAdapted = {
    amount: sale.amount,
    payment_method_id: methodMapping[sale.payment_method_id],
    turn: turnMapping[sale.turn],
    date: sale.sale_date ? new Date(sale.sale_date) : new Date(),
  };

  const { toast } = useToast();
  const [date, setDate] = useState(new Date(sale.sale_date));

  function getToken() {
    let token = localStorage.getItem("authorization");
    return token;
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: saleAdapted.amount,
      payment_method_id: saleAdapted.payment_method_id,
      turn: saleAdapted.turn,
      date: saleAdapted.sale_date ? new Date(sale.sale_date) : new Date(),
    },
  });

  const onSubmit = (data) => {
    console.log("Viejo", data);
    const updatedSaleData = {
      payment_method_id: data.payment_method_id,
      amount: data.amount,
      turn: data.turn,
      sale_date: data.date,
    };
    console.log(updatedSaleData, "Nuevo");

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/sales/${sale.sale_id}`,
        updatedSaleData,
        {
          headers: {
            authorization: `${getToken()}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(function (response) {
        console.log("Venta actualizada:", response.data);
        toast({
          variant: "success",
          title: "Venta actualizada",
          description: "La venta fue actualizada correctamente",
        });
      })
      .catch(function (error) {
        console.error("Error en la solicitud:", error);
      });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar venta</DialogTitle>
        <DialogDescription>Cambie los valores de la venta</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4 text-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="w-[240px] pl-3 text-left font-normal border rounded-md p-2"
                        >
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            if (selectedDate) {
                              setDate(selectedDate);
                              field.onChange(selectedDate);
                            }
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Seleccione la fecha de la venta.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_method_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pago</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pago" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Efectivo">Efectivo</SelectItem>
                        <SelectItem value="Transferencia">
                          Transferencia
                        </SelectItem>
                        <SelectItem value="Débito">Débito</SelectItem>
                        <SelectItem value="Crédito">Crédito</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Seleccione el método de pago.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Ingrese el monto"
                    />
                  </FormControl>
                  <FormDescription>
                    Ingrese el monto de la venta.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="turn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Turno</FormLabel>
                  <FormControl>
                    <Select {...field} value={field.value || ""}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Turno" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mañana">Mañana</SelectItem>
                        <SelectItem value="tarde">Tarde</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Seleccione el turno de la venta.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-3 block uppercase text-white bg-[#00ADD2] md:text-xs text-lg h-12 md:h-fit rounded-md md:w-1/2 w-full py-[5px]"
            >
              Guardar
            </Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};
