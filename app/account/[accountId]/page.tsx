"use client";

import CreateTransaction from "@/components/CreateTransaction";
import { obtenerCuentas } from "@/lib/accountsServices";
import { auth } from "@/lib/firebaseConfig";
import { Cuenta, Movimiento, TipoMovimiento } from "@/lib/types";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useStore } from "@nanostores/react";
import {
  $transactions,
  createTransaction,
  deleteTransaction,
} from "@/lib/nano/transactionServices";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface Props {
  params: {
    accountId: string;
  };
}

const Account = ({ params: { accountId } }: Props) => {
  const [account, setAccount] = useState<Cuenta | null>(null);
  // const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const movimientos = useStore($transactions);
  const [user] = useAuthState(auth);

  console.log(movimientos);

  useEffect(() => {
    const fetch = async () => {
      const cuentas = await obtenerCuentas(user);
      if (cuentas.length > 0) setAccount(cuentas[0]);
    };
    fetch();
  }, [user]);

  const handleEliminarMovimiento = async (movimientoId: string) => {
    deleteTransaction(movimientoId);
  };

  const calcularGastosPorCategoria = (movimientos: Movimiento[]) => {
    const gastosPorCategoria: Record<string, number> = {};

    movimientos
      .filter((movimiento) => movimiento.tipo === TipoMovimiento.GASTO)
      .forEach((movimiento) => {
        if (!gastosPorCategoria[movimiento.categoria]) {
          gastosPorCategoria[movimiento.categoria] = 0;
        }
        gastosPorCategoria[movimiento.categoria] += movimiento.dinero;
      });

    return gastosPorCategoria;
  };

  if (!account) return null;

  const gastosPorCategoria = calcularGastosPorCategoria(movimientos);
  const categorias = Object.keys(gastosPorCategoria);
  const cantidades = Object.values(gastosPorCategoria);

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      <div
        key={account.id}
        className="p-4 bg-white rounded-lg flex items-center justify-between sm:px-6 sm:py-4 border-2 border-black-200"
      >
        <p className="text-lg uppercase font-bold">{account.nombre}</p>
        <p className="text-lg font-semibold">
          {account.saldo.toLocaleString("es")} {account.moneda}
        </p>
      </div>

      <ul className="w-full bg-white rounded-lg border 1px overflow-hidden">
        {movimientos.map((movimiento) => (
          <li
            key={movimiento.id}
            className="border-b last:border-b-0 p-4 hover:bg-gray-50 transition flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <p className="text-gray-700">{movimiento.descripcion}</p>
            <div className="flex items-center justify-between w-full sm:w-auto sm:gap-4">
              <p
                className={cn(
                  "font-bold text-lg",
                  movimiento.tipo === TipoMovimiento.GASTO && "text-red-600",
                  movimiento.tipo === TipoMovimiento.INGRESO && "text-green-600"
                )}
              >
                {`${
                  movimiento.tipo === TipoMovimiento.GASTO ? "- " : "+ "
                }${movimiento.dinero.toLocaleString("es")}`}
              </p>
              <p className="text-gray-500 text-sm">
                {movimiento.fecha.toLocaleDateString("es", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <button
                onClick={() => handleEliminarMovimiento(movimiento.id)}
                className="black font-bold"
                title="Eliminar movimiento"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      <CreateTransaction
        onTransactionCreated={async (transaction) => {
          createTransaction(transaction);
        }}
        accountId={account.id}
      />

      {categorias.length > 0 && cantidades.length > 0 && (
        <Bar
          data={{
            labels: categorias,
            datasets: [
              {
                label: "Gastos por Categoría",
                data: cantidades,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Account;
