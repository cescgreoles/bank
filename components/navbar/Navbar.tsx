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
import { useAuthState } from "react-firebase-hooks/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [user] = useAuthState(auth);

  const handleOpen = (registering: boolean) => {
    setIsRegistering(registering);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const router = useRouter();

  const handleLogin = async () => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleClose();
    } catch (error: any) {
      setError("Error al acceder");
    }
  };

  const handleRegister = async () => {
    setError(null);
    const correctSecretCode = process.env.NEXT_PUBLIC_SECRET_CODE;

    if (secretCode !== correctSecretCode) {
      setError("Código secreto incorrecto");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      handleClose();
    } catch (error: any) {
      setError("Error al registrarse");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <nav className="flex md:flex-row md:items-center justify-between p-4 border-1 border-solid">
      <div className="flex items-center justify-center">
        <Link href="/" className="flex items-center justify-center" passHref>
          <Image src="/favicon.png" alt="Your Bank" width={30} height={20} />
          <h2 className="ml-2 font-semibold">YOUR BANK</h2>
        </Link>
      </div>

      <div className="nav-right flex flex-col md:flex-row items-center text-center">
        <div className="flex items-center justify-center md:hidden">
          {!user ? (
            <>
              <Button onClick={() => handleOpen(false)}>Acceder</Button>
              <Button onClick={() => handleOpen(true)} className="m-1">
                Registrarse
              </Button>
            </>
          ) : (
            <div className="flex items-center">
              <Link href="/profile">
                <Button className="m-1 flex items-center">
                  <UserCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                </Button>
              </Link>
              <Button onClick={handleLogout} className="m-1">
                Cerrar sesión
              </Button>
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center">
          {!user ? (
            <>
              <Button variant="ghost" className="font-bold" asChild>
                <Link href="/">Inicio</Link>
              </Button>
              <Button variant="ghost" className="font-bold" asChild>
                <Link href="/about">Quién somos?</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="font-bold" asChild>
                <Link href="/">Inicio</Link>
              </Button>
              <Button variant="ghost" className="font-bold" asChild>
                <Link href="/about">Quiénes somos?</Link>
              </Button>
              <Button variant="ghost" className="font-bold" asChild>
                <Link href="/accounts">Mis Cuentas</Link>
              </Button>
            </>
          )}

          <div className="inputs-container flex justify-center items-center">
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
                  placeholder="Contraseña"
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
                <div className="flex items-center justify-center">
                  <span className="mr-2 text-center p-2">
                    Hola, {user.displayName || user.email}
                  </span>
                  <Link href="/profile">
                    <Button className="m-1 flex items-center">
                      <UserCircleIcon
                        className="h-5 w-5 mr-1"
                        aria-hidden="true"
                      />
                    </Button>
                  </Link>
                  <Button className="m-1" onClick={handleLogout}>
                    Cerrar sesión
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              {isRegistering ? "Registro" : "Acceder"}
            </DialogTitle>
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
                placeholder="Contraseña"
                className="mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isRegistering && (
                <>
                  <Input
                    type="text"
                    placeholder="Nombre"
                    className="mb-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Código Secreto"
                    className="mb-2"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                  />
                </>
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
