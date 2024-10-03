import Link from "next/link";
import React from "react";

const page = () => {
  const cuentas = [
    {
      id: 1,
      tipo: "Cuenta Corriente",
      saldo: 5000.0,
      disponible: 4800.0,
    },
    {
      id: 2,
      tipo: "Cuenta de Ahorros",
      saldo: 15000.0,
      disponible: 15000.0,
    },
    {
      id: 3,
      tipo: "Cuenta de Inversión",
      saldo: 20000.0,
      disponible: 19500.0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Mis Cuentas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cuentas.map((cuenta) => (
          <div
            key={cuenta.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold">{cuenta.tipo}</h2>
            <div className="mt-4">
              <p className="text-gray-600">
                Saldo Total:{" "}
                <span className="font-bold">${cuenta.saldo.toFixed(2)}</span>
              </p>
              <p className="text-gray-600">
                Saldo Disponible:{" "}
                <span className="font-bold">
                  ${cuenta.disponible.toFixed(2)}
                </span>
              </p>
            </div>

            <Link href={`/accounts/${cuenta.id}`}>
              <button className="mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 w-full">
                Ver Detalles
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
