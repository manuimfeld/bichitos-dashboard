"use client";

import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const date = new Date();
  const hours = date.getHours();
  const { toast } = useToast();
  function getToken() {
    let token = localStorage.getItem("authorization");
    return token;
  }
  const [actualTurn, setActualTurn] = useState(
    hours <= 16 ? "Mañana" : "Tarde"
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const saleData = {
      amount: form.elements.amount.value,
      customer_dni: null, // Ajusta esto según tus necesidades
      turn: turnMapping[form.elements.turn.value], // 'Mañana' o 'Tarde'
      created_by: 1, // Ajusta esto según tus necesidades
      payment_method_id:
        paymentMethodMapping[form.elements.payment_method.value],
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
        form.reset(); // Limpiar el formulario
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
    <main className="text-black text-xs bg-white col-span-2 row-start-2 p-4 overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
      <form onSubmit={handleSubmit} className="bg-white p-4">
        <p className="mb-2 text-lg md:text-xs">Método de pago</p>
        <div className="flex flex-wrap justify-between md:justify-normal mb-2 gap-2">
          {["Efectivo", "Transferencia", "Débito", "Crédito"].map((method) => (
            <div key={method} className="w-fit">
              <input
                type="radio"
                id={method}
                name="payment_method"
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
          ))}
        </div>
        <p className="mt-3 mb-1 text-lg md:text-xs">Monto</p>
        <input
          type="number"
          id="amount"
          name="amount"
          className="border-[#8D8D8D] border-[1.5px] rounded-md text-lg md:text-sm outline-0 bg-transparent px-2 py-2 w-full md:w-1/4 h-12 md:h-8"
          placeholder="$"
        />

        <p className="mb-1 mt-3 text-lg md:text-xs">Turno</p>
        <div className="flex flex-wrap justify-between md:justify-normal mb-2 gap-2">
          {["Mañana", "Tarde"].map((turn, index) => (
            <div key={turn} className="w-fit">
              <input
                type="radio"
                id={turn}
                name="turn"
                value={turn}
                className="hidden peer"
                checked={actualTurn === turn ? true : false}
              />
              <label
                htmlFor={turn}
                className="flex items-center justify-center w-32 h-12 md:w-24 md:h-8 text-lg md:text-xs border-2 border-gray-300 rounded-md cursor-pointer text-center peer-checked:border-cyan-500 peer-checked:text-black transition-all duration-300"
              >
                {turn}
              </label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-3 block uppercase text-white bg-[#00ADD2] md:text-xs text-lg h-12 md:h-fit rounded-md md:w-1/2 w-full py-[5px]"
        >
          Guardar Venta
        </button>
      </form>
    </main>
  );
}
