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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true); // Estado para alternar entre "Acceder" y "Registro"

  const handleOpen = (
    registering: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsRegistering(registering); // Establece el modo de "Acceder" o "Registro"
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <nav className="flex md:flex-row md:items-center justify-between p-4 border 1px solid ">
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
          <Button onClick={() => handleOpen(false)}>Acceder</Button>
          <Button onClick={() => handleOpen(true)} className="m-1">
            Registrarse
          </Button>
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
            <Input type="email" placeholder="E-mail" className="m-1" />
            <Input type="password" placeholder="Contrasenya" className="m-1" />
            <Button className="m-1">Acceder</Button>
            <Button onClick={() => handleOpen(true)} className="m-1">
              Registrarse
            </Button>
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
              <Input type="email" placeholder="E-mail" className="mb-2" />
              <Input
                type="password"
                placeholder="Contrasenya"
                className="mb-2"
              />
              {isRegistering && (
                <Input type="text" placeholder="Nombre" className="mb-2" />
              )}
            </div>
          </DialogHeader>
          <div className="flex justify-center">
            <Button onClick={handleClose}>
              {isRegistering ? "Registrar" : "Acceder"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
