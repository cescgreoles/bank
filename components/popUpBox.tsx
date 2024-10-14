"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CalculatorIcon,
  ChartBarIcon,
  BanknotesIcon,
  UserPlusIcon,
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
    "Calcula tus Gastos",
    "Calcula tus Ingresos",
    "Gráficos de Rendimiento Financiero",
    "Abre una Cuenta con Nosotros",
  ];

  const infoTexts: string[] = [
    "Utiliza nuestra herramienta para calcular tus gastos mensuales de manera precisa. Lleva un control detallado y ajusta tu presupuesto de forma eficiente.",
    "Mantén un registro claro de tus ingresos. Con nuestra plataforma, puedes visualizar fácilmente el flujo de dinero que entra cada mes.",
    "Genera gráficos visuales que te permiten entender tu rendimiento financiero. Analiza tus gastos, ingresos y ahorros para mejorar tu gestión.",
    "Abre una cuenta con nosotros y empieza a gestionar tus finanzas de manera integral. Disfruta de una plataforma segura y confiable para manejar tus ingresos y gastos.",
  ];

  const infoIcons = [
    <CalculatorIcon className="h-10 w-10 text-blue-500 mx-auto" />,
    <BanknotesIcon className="h-10 w-10 text-green-500 mx-auto" />,
    <ChartBarIcon className="h-10 w-10 text-purple-500 mx-auto" />,
    <UserPlusIcon className="h-10 w-10 text-red-500 mx-auto" />,
  ];

  return (
    <div className="flex flex-wrap gap-4 m-4 mb-8 justify-center">
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
              {currentIndex !== null ? infoTexts[currentIndex] : "Cargando..."}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopUpBox;
