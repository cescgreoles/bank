"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth"; // Hook para controlar el estado de autenticación
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true); // Estado para alternar entre "Acceder" y "Registro"
  const [email, setEmail] = useState(""); // Estado para el email
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [name, setName] = useState(""); // Estado para el nombre (en caso de registro)
  const [error, setError] = useState<string | null>(null); // Estado para errores

  // Estado de autenticación del usuario
  const [user] = useAuthState(auth);

  // Abre el modal para login o registro
  const handleOpen = (registering: boolean) => {
    setIsRegistering(registering); // Alterna entre "Acceder" y "Registrar"
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Función para manejar el login
  const handleLogin = async () => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleClose();
    } catch (error: any) {
      setError("Error al acceder: " + error.message);
    }
  };

  // Función para manejar el registro
  const handleRegister = async () => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Opcional: Guardar nombre del usuario en Firestore
      handleClose();
    } catch (error: any) {
      setError("Error al registrarse: " + error.message);
    }
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="flex md:flex-row md:items-center justify-between p-4 border 1px solid">
      {/* Contenedor del Logo y el Nombre */}
      <div className="flex items-center justify-center">
        <Link href="/" className="flex items-center justify-center">
          <Image src="/favicon.png" alt="Your Bank" width={30} height={20} />
          <h2 className="ml-2 font-semibold items-center ">YOUR BANK</h2>
        </Link>
      </div>

      {/* Contenedor del menú */}
      <div className="nav-right flex flex-col md:flex-row items-center">
        {/* Solo visible en dispositivos móviles */}
        <div className="flex items-center justify-center md:hidden">
          {!user ? (
            <>
              <Button onClick={() => handleOpen(false)}>Acceder</Button>
              <Button onClick={() => handleOpen(true)} className="m-1">
                Registrarse
              </Button>
            </>
          ) : (
            <Button onClick={handleLogout}>Cerrar sesión</Button>
          )}
        </div>

        {/* Contenido para pantallas grandes */}
        <div className="hidden md:flex items-center">
          <Button variant="ghost" className="font-bold" asChild>
            <Link href="/">Inicio</Link>
          </Button>
          <Button variant="ghost" className="font-bold" asChild>
            <Link href="/dashboard">Cuenta</Link>
          </Button>
          <Button variant="ghost" className="font-bold" asChild>
            <Link href="/about">Quién somos?</Link>
          </Button>
          <div className="inputs-container flex">
            {!user ? (
              <>
                <Input
                  type="email"
                  placeholder="E-mail"
                  className="m-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Contrasenya"
                  className="m-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="m-1" onClick={handleLogin}>
                  Acceder
                </Button>
                <Button onClick={() => handleOpen(true)} className="m-1">
                  Registrarse
                </Button>
              </>
            ) : (
              <>
                <span className="mr-2">
                  Hola, {user.displayName || user.email}
                </span>
                <Link href="/profile">
                  <Button className="m-1">Perfil</Button>
                </Link>
                <Button className="m-1" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Diálogo dinámico de acceso/registro visible en ambas vistas */}
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              {isRegistering ? "Registro" : "Acceder"}
            </DialogTitle>
            {/* Campos de acceso o registro */}
            <div className="my-4">
              <Input
                type="email"
                placeholder="E-mail"
                className="mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Contrasenya"
                className="mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isRegistering && (
                <Input
                  type="text"
                  placeholder="Nombre"
                  className="mb-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </DialogHeader>
          <div className="flex justify-center">
            <Button onClick={isRegistering ? handleRegister : handleLogin}>
              {isRegistering ? "Registrar" : "Acceder"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
