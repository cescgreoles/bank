import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <HiOutlinePhone className="mr-2 text-xl" />
                <span>(+34) 900 123 456</span>
              </li>
              <li className="flex items-center">
                <HiOutlineMail className="mr-2 text-xl" />
                <span>contacto@yourbank.com</span>
              </li>
              <li className="flex items-center">
                <FiMapPin className="mr-2 text-xl" />
                <span>Calle Falsa 123, Madrid, España</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Útiles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/abrir-cuenta" className="hover:underline">
                  Abrir una cuenta
                </Link>
              </li>
              <li>
                <Link href="/solicitar-prestamo" className="hover:underline">
                  Solicitar préstamo
                </Link>
              </li>
              <li>
                <Link href="/servicios-tarjetas" className="hover:underline">
                  Servicios de tarjetas
                </Link>
              </li>
              <li>
                <Link href="/banca-online" className="hover:underline">
                  Banca en línea
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <FaFacebookF className="text-2xl" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <FaTwitter className="text-2xl" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <FaInstagram className="text-2xl" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <FaLinkedinIn className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            © 2024 YourBank. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
