"use client";

import "@/app/page.css";
import PopUpBox from "@/components/popUpBox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const images = [
    { src: "/1.png", alt: "Imagen 1" },
    { src: "/2.png", alt: "Imagen 2" },
    { src: "/3.png", alt: "Imagen 3" },
    { src: "/4.png", alt: "Imagen 4" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <main className="main">
      <div className="hidden md:flex items-center justify-center w-full h-10 bg-black text-white text-center">
        <p>
          Descarga aquí nuestra aplicación móbil{" "}
          <Link href="/demmo" className="text-white-500 font-bold underline ">
            aquí
          </Link>
        </p>
      </div>
      <div className="relative w-full h-96 overflow-hidden">
        {images.map((image, index) => {
          const isVisible =
            (index < 2 && !isMobile) || (index >= 2 && isMobile);

          return (
            isVisible && (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
            )
          );
        })}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start md:space-x-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-48 m-1">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center">
              <BanknotesIcon className="h-5 w-5 mr-2" />
              Abre tu cuenta
            </div>
          </Button>
        </div>
        <div className="w-full md:w-48 m-1">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center">
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />{" "}
              Transferencias
            </div>
          </Button>
        </div>
        <div className="w-full md:w-48 m-1">
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center">
              <ArrowPathIcon className="h-5 w-5 mr-2" /> Pagos
            </div>
          </Button>
        </div>
      </div>

      <PopUpBox />
    </main>
  );
};

export default Home;
