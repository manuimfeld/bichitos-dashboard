"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function CreateProducts() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      price: "",
      provider: "",
      name: "",
    },
  });

  function getToken() {
    let token = localStorage.getItem("authorization");
    return token;
  }

  const onSubmit = (data) => {
    const productData = {
      provider: data.provider,
      price: data.price,
      name: data.name, // Ajusta esto según tus necesidades
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/products`, productData, {
        headers: {
          authorization: `${getToken()}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        reset(); // Limpiar el formulario
        toast({
          variant: "success",
          title: "Producto guardado",
          description: "El producto fue guardado correctamente",
        });
      })
      .catch(function (error) {
        console.error("Error en la solicitud:", error);
      });
  };

  return (
    <main className="text-black text-xs bg-white col-span-2 row-start-2 p-4 overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 space-y-4"
      >
        <div className="flex flex-wrap justify-between md:justify-normal mb-2 gap-2">
          {["Señor Gonzales", "Merlo", "CYH"].map((method) => (
            <div key={method} className="w-fit">
              <input
                type="radio"
                id={method}
                {...register("provider", {
                  required: "Proveedor es requerido",
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
          ))}
          {errors.payment_method && (
            <p className="text-red-500">{errors.payment_method.message}</p>
          )}
        </div>

        <p className="mt-3 mb-1 text-lg md:text-xs">Precio</p>
        <input
          type="number"
          id="price"
          {...register("price", {
            required: "Precio es requerido",
            valueAsNumber: true,
          })}
          className="border-[#8D8D8D] border-[1.5px] rounded-md text-lg md:text-sm outline-0 bg-transparent px-2 py-2 w-full md:w-1/4 h-12 md:h-8"
          placeholder="$"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}

        <p className="mb-1 mt-3 text-lg md:text-xs">Nombre</p>
        <div className="flex flex-wrap justify-between md:justify-normal mb-2 gap-2">
          <input
            type="text"
            id="name"
            {...register("name", { required: "Nombre es requerido" })}
            className="border-[#8D8D8D] border-[1.5px] rounded-md text-lg md:text-sm outline-0 bg-transparent px-2 py-2 w-full md:w-1/4 h-12 md:h-8"
            placeholder="Nombre"
          />

          {errors.turn && <p className="text-red-500">{errors.turn.message}</p>}
        </div>

        <button
          type="submit"
          className="mt-3 block uppercase text-white bg-[#00ADD2] md:text-xs text-lg h-12 md:h-fit rounded-md md:w-1/2 w-full py-[5px]"
        >
          Crear producto
        </button>
      </form>
    </main>
  );
}
