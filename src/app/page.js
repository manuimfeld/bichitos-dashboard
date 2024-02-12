export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logo */}
      <img
        src="/bichitos-logo.webp"
        alt="Logo"
        className="w-16 h-16 mb-4 md:w-20 md:h-20"
      />
      <h1 className="text-xl font-semibold text-blue-500 mb-4">
        Bichitos administración
      </h1>
      {/* Formulario */}
      <form className="bg-white p-8 rounded shadow-md w-calc(90vw) md:w-96">
        <h4 className="text-xl font-semibold mb-4">
          Inicie sesión para continuar
        </h4>

        {/* Nombre de usuario */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600 mb-2">
            Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full p-2 border rounded"
            placeholder="Nombre de usuario"
          />
        </div>

        {/* Contraseña */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border rounded"
            placeholder="Contraseña"
          />
        </div>

        {/* Botón de inicio de sesión */}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
