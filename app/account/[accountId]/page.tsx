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
    <div className="space-y-6">
      <div
        key={account.id}
        className="border-b last:border-b-0 p-4 bg-white shadow-md rounded-lg flex items-center justify-between"
      >
        <p className="text-lg font-medium">{account.nombre}</p>
        <p className="text-lg font-semibold">
          {account.saldo.toLocaleString("es")} {account.moneda}
        </p>
      </div>

      <ul className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        {movimientos.map((movimiento) => (
          <li
            key={movimiento.id}
            className="border-b last:border-b-0 p-4 hover:bg-gray-50 transition flex items-center gap-4 justify-between"
          >
            <p className="text-gray-700">{movimiento.descripcion}</p>

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
