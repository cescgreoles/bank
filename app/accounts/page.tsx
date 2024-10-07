"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { obtenerCuentas } from "@/lib/firebaseService"; // Adjust this path as necessary
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Accounts = () => {
  const [user] = useAuthState(auth);
  const [cuentas, setCuentas] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchCuentas = async () => {
        try {
          const cuentasData = await obtenerCuentas(user.uid); // Fetch accounts for the authenticated user
          setCuentas(cuentasData || []);
        } catch (err) {
          setError("Error al cargar cuentas");
        }
      };
      fetchCuentas();
    } else {
      setError("No estás autenticado");
    }
  }, [user]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white">
      <h1 className="text-2xl font-bold text-center">Mis Cuentas</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        {cuentas.length === 0 ? (
          <p>No tienes cuentas disponibles.</p>
        ) : (
          <ul>
            {cuentas.map((cuenta) => (
              <li key={cuenta.id} className="mb-2">
                {cuenta.nombre}: ${cuenta.saldo}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Link href="/profile" passHref>
          <Button className="w-full">Volver al Perfil</Button>
        </Link>
      </div>
    </div>
  );
};

export default Accounts;
