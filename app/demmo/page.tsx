import React from "react";
import Link from "next/link";
import Image from "next/image";

const DownloadPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <h1 className="text-3xl font-bold mb-6">Descarga Nuestra App</h1>

      {/* Contenedor de las imágenes de descarga */}
      <div className="flex space-x-8">
        {/* Link para descargar en Google Play */}
        <Link href="https://play.google.com/store" passHref>
          <div className="flex items-center justify-center w-40 h-16 overflow-hidden bg-gray-100">
            <Image
              src="/android.png"
              alt="Descargar en Google Play"
              className="object-contain"
              width={160}
              height={64}
            />
          </div>
        </Link>

        {/* Link para descargar en la App Store */}
        <Link href="https://www.apple.com/app-store/" passHref>
          <div className="flex items-center justify-center w-40 h-16 overflow-hidden bg-gray-100">
            <Image
              src="/appStore.webp"
              alt="Descargar en la App Store"
              width={160}
              height={64}
            />
          </div>
        </Link>
      </div>

      {/* Imagen adicional alineada a la derecha */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <Image
          src="/canvaApp.png"
          alt="Imagen adicional"
          width={400}
          height={100}
        />
      </div>
    </div>
  );
};

export default DownloadPage;
