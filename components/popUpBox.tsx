"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import {
  BanknotesIcon,
  HomeIcon,
  CreditCardIcon,
  ShieldCheckIcon, // Asegúrate de importar el icono deseado
} from "@heroicons/react/24/outline";

const PopUpBox: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentIndex(null);
  };

  const infoTitles: string[] = [
    "Cuenta de Ahorro con Rendimiento Alto",
    "Créditos Hipotecarios con Tasa Fija",
    "Tarjeta de Crédito con Recompensas Exclusivas",
    "Seguro de Vida Protegido", // Título de la cuarta carta
  ];

  const infoTexts: string[] = [
    "Comienza a ahorrar hoy con nuestra cuenta de ahorro de alto rendimiento. Gana más intereses por tus ahorros, sin comisiones y con acceso a tu dinero en cualquier momento.",
    "Compra la casa de tus sueños con nuestras hipotecas de tasa fija. Ofrecemos financiamiento flexible, pagos accesibles y tasas competitivas para ayudarte a conseguir tu hogar ideal.",
    "Disfruta de beneficios únicos con nuestra tarjeta de crédito. Obtén cashback, millas aéreas, y descuentos en comercios seleccionados. ¡Haz que cada compra cuente!",
    "Protege a tu familia con nuestro seguro de vida. Ofrecemos coberturas flexibles y precios accesibles para brindarte tranquilidad en los momentos más difíciles.", // Texto de la cuarta carta
  ];

  const infoIcons = [
    <BanknotesIcon className="h-10 w-10 text-green-500 mx-auto" />,
    <HomeIcon className="h-10 w-10 text-blue-500 mx-auto" />,
    <CreditCardIcon className="h-10 w-10 text-yellow-500 mx-auto" />,
    <ShieldCheckIcon className="h-10 w-10 text-red-500 mx-auto" />, // Icono de la cuarta carta
  ];

  return (
    <div className="flex flex-wrap gap-4 m-4 mb-8 justify-center">
      {" "}
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow-lg w-64 cursor-pointer hover:shadow-xl transition-shadow bg-white text-gray-800 text-center"
          onClick={() => handleOpen(index)}
        >
          <div className="mb-4">{infoIcons[index]}</div>
          <h3 className="text-lg font-semibold mb-4">{infoTitles[index]}</h3>
          <p className="text-gray-600">{infoTexts[index]}</p>
        </div>
      ))}
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              {currentIndex !== null ? infoTitles[currentIndex] : "Cargando..."}
            </DialogTitle>
            {currentIndex !== null && (
              <div className="my-4">{infoIcons[currentIndex]}</div>
            )}
            <DialogDescription className="text-gray-600">
              {currentIndex !== null ? infoTexts[currentIndex] : "Cargando..."}{" "}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopUpBox;
