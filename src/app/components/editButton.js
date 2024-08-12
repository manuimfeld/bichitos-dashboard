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

export const EditDialogContent = ({ sale }) => {
  const { toast } = useToast();
  const [date, setDate] = useState(new Date(sale.sale_date));

  function getToken() {
    let token = localStorage.getItem("authorization");
    return token;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: sale.amount,
      payment_method: sale.payment_method_id,
      turn: sale.turn,
      date: sale.sale_date ? new Date(sale.sale_date) : new Date(), // Pre-carga la fecha
    },
  });

  useEffect(() => {
    setValue("date", date);
  }, [date, setValue]);

  const paymentMethodMapping = {
    1: "Efectivo",
    2: "Transferencia",
    3: "Débito",
    4: "Crédito",
  };

  const turnMapping = {
    1: "Mañana",
    2: "Tarde",
  };

  const onSubmit = (data) => {
    const updatedSaleData = {
      payment_method_id: data.payment_method_id,
      amount: data.amount,
      turn: data.turn,
      sale_date: data.date,
    };

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
        <form onSubmit={handleSubmit(onSubmit)} className="h-fit flex-col">
          <div className="flex flex-col">
            <p className="mb-2 text-lg md:text-xs">Fecha</p>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-[240px] pl-3 text-left font-normal border rounded-md p-2"
                >
                  {date ? format(date, "PPP") : <span>Seleccionar fecha</span>}
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
                      setValue("date", selectedDate); // Actualiza react-hook-form con la fecha seleccionada
                    }
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Select
              {...register("payment_method", {
                required: "Método de pago es requerido",
              })}
              defaultValue={paymentMethodMapping[sale.payment_method_id]}
            >
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
            {errors.payment_method && (
              <p className="text-red-500">{errors.payment_method.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount">
              Monto
              <Input
                id="amount"
                type="number"
                {...register("amount", {
                  required: "Monto es requerido",
                  valueAsNumber: true,
                })}
                defaultValue={sale.amount}
              />
            </Label>
            {errors.amount && (
              <p className="text-red-500">{errors.amount.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Select
              {...register("turn", { required: "Turno es requerido" })}
              defaultValue={sale.turn}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Turno" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Mañana</SelectItem>
                <SelectItem value="2">Tarde</SelectItem>
              </SelectContent>
            </Select>
            {errors.turn && (
              <p className="text-red-500">{errors.turn.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-3 block uppercase text-white bg-[#00ADD2] md:text-xs text-lg h-12 md:h-fit rounded-md md:w-1/2 w-full py-[5px]"
          >
            Guardar
          </button>
        </form>
      </div>
    </DialogContent>
  );
};
