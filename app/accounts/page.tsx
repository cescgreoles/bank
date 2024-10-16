"use client";

import { useEffect, useState } from "react";
import { Cuenta } from "@/lib/types";
import CreateAccount from "@/components/CreateAccount";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import Link from "next/link";
import {
  crearCuenta,
  obtenerCuentas,
  eliminarCuenta,
} from "@/lib/accountsServices";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Cuenta[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetch = async () => setAccounts(await obtenerCuentas(user));
    fetch();
  }, [user]);

  const handleEliminarCuenta = async (accountId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta cuenta?")) {
      await eliminarCuenta(accountId);
      setAccounts(await obtenerCuentas(user));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen m-6">
      <ul className="w-full max-w-7xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 flex flex-col justify-between items-center h-56 w-full border 1px"
          >
            <Link href={`/account/${account.id}`}>
              <div className="w-full">
                <p className="text-gray-800 font-medium text-center uppercase mb-2 text-lg">
                  {account.nombre}
                </p>
                <p className="text-gray-900 font-bold text-2xl mb-1 flex justify-center">
                  {account.saldo.toLocaleString("es")}
                </p>
                <p className="text-sm text-gray-600 text-center">
                  {account.moneda}
                </p>
              </div>
            </Link>

            <Button
              onClick={() => handleEliminarCuenta(account.id)}
              className="transition-colors duration-300 px-4 py-2 rounded-lg"
            >
              Eliminar Cuenta
            </Button>
          </div>
        ))}

        {user && (
          <Dialog>
            <DialogTrigger asChild>
              <div className="bg-white text-black shadow-md rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 flex flex-col justify-center items-center h-56 w-full cursor-pointer border-2 border-black border-dashed ">
                <p className="text-4xl font-bold">+</p>
              </div>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Crear nueva cuenta</DialogTitle>
                <DialogDescription>
                  Por favor, llena los detalles para crear una nueva cuenta.
                </DialogDescription>
              </DialogHeader>

              <CreateAccount
                onCuentaCreada={async (cuenta) => {
                  await crearCuenta(cuenta, user);
                  setAccounts(await obtenerCuentas(user));
                }}
                user={user}
              />

              <DialogClose asChild>
                <Button className="mt-4">Cerrar</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}
      </ul>
    </div>
  );
};

export default Accounts;
