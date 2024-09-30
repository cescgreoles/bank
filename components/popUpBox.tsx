"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  const infoTexts: string[] = [
    "Información detallada sobre el servicio 1, incluyendo tarifas y horarios.",
    "Información detallada sobre el servicio 2, incluyendo tarifas y horarios.",
    "Información detallada sobre el servicio 3, incluyendo tarifas y horarios.",
    "Información detallada sobre el servicio 4, incluyendo tarifas y horarios.",
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow-lg w-64 cursor-pointer hover:shadow-xl transition-shadow bg-white text-gray-800"
          onClick={() => handleOpen(index)}
        >
          <h3 className="text-lg font-semibold mb-4">
            Información {index + 1}
          </h3>
          <p className="text-gray-700">
            Aquí puedes agregar información relevante del banco, como servicios,
            tarifas, horarios, etc.
          </p>
        </div>
      ))}

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Información {currentIndex !== null ? currentIndex + 1 : ""}
            </DialogTitle>
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
