"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const { toast } = useToast();
  const [date, setDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      amount: "",
      payment_method: "",
      turn: "",
      date: date,
    },
  });

  function getToken() {
    let token = localStorage.getItem("authorization");
    return token;
  }

  const paymentMethodMapping = {
    Efectivo: 1,
    Transferencia: 2,
    Débito: 3,
    Crédito: 4,
  };

  const turnMapping = {
    Mañana: "1",
    Tarde: "2",
  };

  const onSubmit = (data) => {
    const saleData = {
      payment_method_id: paymentMethodMapping[data.payment_method],
      amount: data.amount,
      customer_dni: null, // Ajusta esto según tus necesidades
      sale_date: data.date,
      created_by: 1, // Ajusta esto según tus necesidades
      turn: turnMapping[data.turn], // 'Mañana' o 'Tarde'
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/sales`, saleData, {
        headers: {
          authorization: `${getToken()}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        console.log("Venta guardada:", response.data);
        resetField("amount"); // Solo resetear el campo de monto

        toast({
          variant: "success",
          title: "Venta guardada",
          description: "La venta fue guardada correctamente",
        });
      })
      .catch(function (error) {
        console.error("Error en la solicitud:", error);
      });
  };

  return (
    <div className="lg:gap-4 flex flex-wrap lg:justify-normal text-black text-xs col-span-2 row-start-2 overflow-y-auto w-[calc(100%_-_32px)] mx-auto lg:mx-0 lg:w-full lg:max-h-[calc(100%_-_48px)]">
      <h3 className="text-2xl py-2 w-full">Guardar ventas</h3>
      <div className=" shadow-lg border border-[#E0E0E0] bg-white h-fit w-fit rounded-xl border-separate">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-4 rounded-sm"
        >
          <div className="flex flex-col">
            <p className="mb-2 text-lg md:text-xs">Fecha</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    setValue("date", date); // Update react-hook-form with the selected date
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div className="flex flex-wrap justify-between md:justify-normal mb-2 gap-2">
            {["Efectivo", "Transferencia", "Débito", "Crédito"].map(
              (method) => (
                <div key={method} className="w-fit">
                  <input
                    type="radio"
                    id={method}
                    {...register("payment_method", {
                      required: "Método de pago es requerido",
                    })}
                    value={method}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={method}
                    className="flex items-center justify-center w-32 h-12 md:w-24 md:h-8 text-lg md:text-xs border-2 border-gray-300 rounded-md cursor-pointer text-center peer-checked:border-cyan-500 peer-checked:text-black transition-all duration-300"
                  >
                    {method}
                  </label>
                </div>
              )
            )}
            {errors.payment_method && (
              <p className="text-red-500">{errors.payment_method.message}</p>
            )}
          </div>

          <p className="mt-3 mb-1 text-lg md:text-xs">Monto</p>
          <input
            type="number"
            id="amount"
            {...register("amount", {
              required: "Monto es requerido",
              valueAsNumber: true,
            })}
            className="border-[#8D8D8D] border-[1.5px] rounded-md text-lg md:text-sm outline-0 bg-transparent px-2 py-2 w-full md:w-1/4 h-12 md:h-8"
            placeholder="$"
          />
          {errors.amount && (
            <p className="text-red-500">{errors.amount.message}</p>
          )}

          <p className="mb-1 mt-3 text-lg md:text-xs">Turno</p>
          <div className="flex flex-wrap justify-between md:justify-normal mb-2 gap-2">
            {["Mañana", "Tarde"].map((turn) => (
              <div key={turn} className="w-fit">
                <input
                  type="radio"
                  id={turn}
                  {...register("turn", { required: "Turno es requerido" })}
                  value={turn}
                  className="hidden peer"
                />
                <label
                  htmlFor={turn}
                  className="flex items-center justify-center w-32 h-12 md:w-24 md:h-8 text-lg md:text-xs border-2 border-gray-300 rounded-md cursor-pointer text-center peer-checked:border-cyan-500 peer-checked:text-black transition-all duration-300"
                >
                  {turn}
                </label>
              </div>
            ))}
            {errors.turn && (
              <p className="text-red-500">{errors.turn.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-3 block uppercase text-white bg-[#00ADD2] md:text-xs text-lg h-12 md:h-fit rounded-md md:w-1/2 w-full py-[5px]"
          >
            Guardar Venta
          </button>
        </form>
      </div>
    </div>
  );
}
