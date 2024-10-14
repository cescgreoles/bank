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
import Footer from "@/components/footer/Footer";

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
    }, 1500);

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
          <Link
            href="/downloadP"
            className="text-white-500 font-bold underline "
          >
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
      <PopUpBox />
    </main>
  );
};

export default Home;
