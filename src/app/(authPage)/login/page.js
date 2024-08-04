"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        // Verifica el estado de la respuesta
        if (response.status === 200) {
          const result = response.data; // Obtén los datos de la respuesta
          const token = result.jwt;
          localStorage.setItem("authorization", token);
          router.push("/");
        } else {
          console.error("Error en la solicitud:", response.statusText);
        }
      })
      .catch(function (error) {
        console.error("Error en la solicitud:", error);
      });
  };

  return (
    <div className="mt-8 h-fit w-3/4 mx-auto bg-white p-8 rounded-2xl">
      <Image
        src="/bichitos-logo.webp"
        width={150}
        height={150}
        className="mx-auto"
        alt="Logo"
      />
      <p className="mt-2 text-xl font-medium mx-auto w-fit">Iniciar sesión</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 divide-y divide-gray-200"
      >
        <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <div className="relative">
            <input
              {...register("username", { required: true })}
              defaultValue=""
              autoComplete="off"
              id="username"
              name="username"
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
              placeholder="Nombre de usuario"
            />
            <label
              htmlFor="username"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Nombre de usuario
            </label>
          </div>
          <div className="relative">
            <input
              defaultValue=""
              placeholder="Contraseña"
              {...register("password", { required: true })}
              autoComplete="off"
              id="password"
              name="password"
              type={`${showPassword ? "text" : "password"}`}
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Contraseña
            </label>
            {errors.password && <span>Por favor, escriba la contraseña</span>}
            <span
              onClick={handleClick}
              className="text-sm mt-2 inline-block cursor-pointer"
            >
              {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            </span>
          </div>
          <div className="relative">
            <input
              type="submit"
              value="Iniciar sesión"
              className="bg-cyan-500 text-white rounded-md px-2 py-1 w-full"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
