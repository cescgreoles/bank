"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { Cuenta } from "@/lib/types";
import CreateAccount from "@/components/CreateAccount";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import Link from "next/link";
import { crearCuenta, obtenerCuentas } from "@/lib/accountsServices";

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Cuenta[]>([]);

  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetch = async () => setAccounts(await obtenerCuentas(user));
    fetch();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Cuentas del Usuario
      </h1>

      <ul className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden p-2 m-2">
        {accounts.map((account) => (
          <Link href={`/account/${account.id}`} key={account.id}>
            <li className="border-b last:border-b-0 p-4 hover:bg-gray-50 transition-colors duration-300 flex gap-4 justify-between items-center">
              <p className="text-gray-800 font-medium">{account.nombre}</p>
              <p className="text-gray-600 font-semibold">
                {account.saldo.toLocaleString("es")}
              </p>
              <p className="text-sm text-gray-500">{account.moneda}</p>
            </li>
          </Link>
        ))}
      </ul>

      {user && (
        <CreateAccount
          onCuentaCreada={async (cuenta) => {
            await crearCuenta(cuenta, user);
            setAccounts(await obtenerCuentas(user));
          }}
          user={user}
        />
      )}
    </div>
  );
};

export default Accounts;
