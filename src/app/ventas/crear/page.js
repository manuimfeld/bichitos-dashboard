"use client";
export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const saleData = {
      amount: e.target.elements.amount.value,
      customer_dni: null, // Ajusta esto según tus necesidades
      turn: "Mañana", // 'Mañana' o 'Tarde'
      created_by: 1, // Ajusta esto según tus necesidades
      payment_method_id: 1,
    };

    console.log(saleData);

    try {
      // Enviar la solicitud POST al endpoint /api/sales
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Venta guardada:", result);
        setSelectedTurn("Mañana");
        setSelectedPaymentMethod("Efectivo");
        e.target.amount.value = null;
      } else {
        console.error("Error al guardar la venta:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <main className="text-black text-xs bg-white col-span-2 row-start-2 p-4 overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
      <form onSubmit={(e) => handleSubmit(e)} className="bg-white p-4 w-fit">
        <p className="mb-2">Método de pago</p>

        {["Efectivo", "Transferencia", "Débito", "Crédito"].map((method) => (
          <>
            <input
              key={method}
              type="radio"
              id={method}
              name="payment_type"
              value={method}
            />
            <label for={method} className="ml-1 mr-4 text-xs">
              {method}
            </label>
          </>
        ))}

        <p className="mt-3 mb-1">Monto</p>
        <input
          type="number"
          id="number"
          name="amount"
          className="border-[#8D8D8D] border-[1.5px] rounded-custom outline-0 bg-transparent px-2 py-2 w-1/2"
          placeholder="$"
        />

        <p className="mb-1 mt-3">Turno</p>
        {["Mañana", "Tarde"].map((turn) => (
          <>
            <input key={turn} type="radio" id={turn} name="turn" value={turn} />
            <label for={turn} className="ml-1 mr-4 text-xs">
              {turn}
            </label>
          </>
        ))}

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
