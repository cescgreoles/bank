"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      // No se necesita redirección aquí si estás usando Link en el logout
      setError("No estás autenticado");
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setError(null);
    try {
      await updateProfile(auth.currentUser!, {
        displayName: name,
      });
      alert("Perfil actualizado con éxito");
    } catch (error: any) {
      setError("Error al actualizar el perfil: " + error.message);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    // Aquí no necesitas redirigir, ya que se usará Link para regresar a la página de inicio.
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center">Perfil</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        <Input
          type="text"
          placeholder="Nombre"
          className="mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="E-mail"
          className="mb-2"
          value={email}
          disabled
        />
        <div className="flex justify-between mt-4">
          <Button onClick={handleUpdateProfile} className="w-full mr-2">
            Actualizar Perfil
          </Button>
          <Link href="/" passHref>
            <Button
              onClick={handleLogout}
              className="w-full ml-2"
              variant="ghost"
            >
              Cerrar Sesión
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
