"use client";

import CreateTransaction from "@/components/CreateTransaction";
import {
  calcularSaldo,
  crearMovimiento,
  obtenerCuentas,
  obtenerMovimientos,
} from "@/lib/accountsServices";
import { auth, db } from "@/lib/firebaseConfig";
import { Cuenta, Movimiento, TipoMovimiento } from "@/lib/types";
import { cn } from "@/lib/utils";
import { collection, query, where, getDocs, and } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  params: {
    accountId: string;
  };
}

const Account = ({ params: { accountId } }: Props) => {
  const [account, setAccount] = useState<Cuenta | null>(null);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetch = async () => {
      const cuentas = await obtenerCuentas(user);
      if (cuentas.length > 0) setAccount(cuentas[0]);
    };
    fetch();
  }, [user]);

  useEffect(() => {
    if (!account) return;
    const fetch = async () =>
      setMovimientos(await obtenerMovimientos(account.id));
    fetch();
  }, [account]);

  if (!account) return null;
  console.log(account.saldo);

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      <div
        key={account.id}
        className="border-b last:border-b-0 p-4 bg-white rounded-lg flex items-center justify-between sm:px-6 sm:py-4 border 1px"
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
            </div>
          </li>
        ))}
      </ul>

      <CreateTransaction
        onTransactionCreated={async (transaction) => {
          await crearMovimiento(transaction);
          setMovimientos(await obtenerMovimientos(account.id));
        }}
        accountId={account.id}
      />
    </div>
  );
};

export default Account;
