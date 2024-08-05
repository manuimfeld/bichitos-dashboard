"use client";

import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export default function Home() {
  const { toast } = useToast();
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
        <p className="mb-2">Método de pago</p>
        <div className="flex-col md:flex-row md:flex-wrap mb-2 gap-2">
          {["Efectivo", "Transferencia", "Débito", "Crédito"].map((method) => (
            <div key={method}>
              <input
                type="radio"
                id={method}
                name="payment_method"
                value={method}
                className="mr-2"
              />
              <label htmlFor={method} className="mr-2 text-xs">
                {method}
              </label>
            </div>
          ))}
        </div>
        <p className="mt-3 mb-1">Monto</p>
        <input
          type="number"
          id="amount"
          name="amount"
          className="border-[#8D8D8D] border-[1.5px] rounded-custom outline-0 bg-transparent px-2 py-2 w-1/2"
          placeholder="$"
        />

        <p className="mb-1 mt-3">Turno</p>
        <div className="flex items-center mb-2">
          {["Mañana", "Tarde"].map((turn) => (
            <>
              <input
                key={turn}
                type="radio"
                id={turn}
                name="turn"
                value={turn}
                className="mr-2"
              />
              <label htmlFor={turn} className="ml-1 mr-4 text-xs">
                {turn}
              </label>
            </>
          ))}
        </div>
        <button
          type="submit"
          className="mt-3 block uppercase text-white bg-[#00ADD2] rounded-custom w-1/2 py-[5px]"
        >
          Guardar Venta
        </button>
      </form>
    </main>
  );
}
