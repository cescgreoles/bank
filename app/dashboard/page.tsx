import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold">Resumen de Cuenta</h2>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-gray-600">Saldo Actual:</p>
            <p className="text-2xl font-bold">$5,000.00</p>
          </div>
          <div>
            <p className="text-gray-600">Saldo Disponible:</p>
            <p className="text-2xl font-bold">$4,800.00</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold">Actividad Reciente</h2>
        <ul className="mt-4">
          <li className="flex justify-between py-2 border-b">
            <span>Compra en Supermercado</span>
            <span className="text-red-500">-$150.00</span>
          </li>
          <li className="flex justify-between py-2 border-b">
            <span>Depósito</span>
            <span className="text-green-500">+$1,000.00</span>
          </li>
          <li className="flex justify-between py-2 border-b">
            <span>Pago de Factura</span>
            <span className="text-red-500">-$75.00</span>
          </li>
        </ul>
      </div>

      {/* Próximos Pagos */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold">Próximos Pagos</h2>
        <ul className="mt-4">
          <li className="flex justify-between py-2 border-b">
            <span>Electricidad</span>
            <span className="text-red-500">-$120.00</span>
          </li>
          <li className="flex justify-between py-2 border-b">
            <span>Internet</span>
            <span className="text-red-500">-$50.00</span>
          </li>
        </ul>
      </div>

      {/* Meta de Ahorro */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold">Meta de Ahorro</h2>
        <div className="mt-4">
          <p>Ahorro para Vacaciones: $1,500.00 de $2,000.00 (75% alcanzado)</p>
          <div className="w-full bg-gray-200 rounded-full mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Botones Rápidos */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold">Acciones Rápidas</h2>
        <div className="flex space-x-4 mt-4">
          <button className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Transferir Dinero
          </button>
          <button className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
            Pagar Factura
          </button>
        </div>
      </div>

      {/* Ofertas y Promociones */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold">Ofertas y Promociones</h2>
        <p className="mt-4">Tarjeta de Crédito con 0% de Interés por 6 meses</p>
      </div>
    </div>
  );
};

export default Dashboard;
