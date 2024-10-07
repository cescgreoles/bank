"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState(user?.displayName || "");
  const [email] = useState(user?.email || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setError("No estás autenticado");
    }
  }, [user]);

  const router = useRouter();

  const handleUpdateProfile = async () => {
    setError(null);
    try {
      await updateProfile(auth.currentUser!, {
        displayName: name,
      });
      router.push("/");
    } catch (error: any) {
      setError("Error al actualizar el perfil");
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/"); // Redirect to home after logout
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white">
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
        <div className="flex justify-center mt-4">
          <Button onClick={handleUpdateProfile} className="w-50 mr-2">
            Actualizar Perfil
          </Button>
          <Link href="/" passHref>
            <Button onClick={handleLogout} className="w-50 ml-2">
              Cerrar Sesión
            </Button>
          </Link>
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/accounts" passHref>
            <Button className="w-full">Mis Cuentas</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
