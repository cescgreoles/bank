// pages/download.js
import React from "react";
import Link from "next/link";

const DownloadPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Descarga Nuestra App</h1>
      <div className="flex space-x-8">
        <Link href="https://play.google.com/store" passHref>
          <img
            src="" // Logo de Google Play
            alt="Descargar en Google Play"
            className="h-16 w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>

        <Link href="https://www.apple.com/app-store/" passHref>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/App_Store_%28iOS%29_logo.svg" // Logo de la App Store
            alt="Descargar en la App Store"
            className="h-16 w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default DownloadPage;
