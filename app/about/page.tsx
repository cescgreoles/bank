import React from "react";
import { FaUniversity, FaRegBuilding } from "react-icons/fa";

const About = () => {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            Quiénes Somos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Somos una plataforma dedicada a ayudarte a gestionar tus finanzas de
            manera fácil y efectiva. Nuestro objetivo es brindarte las
            herramientas necesarias para controlar tus ingresos y gastos,
            ofreciéndote una visión clara y precisa de tu situación financiera.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mb-12 space-y-6 md:space-y-0 md:space-x-12">
          <div className="flex flex-col items-center">
            <FaUniversity className="text-blue-600 mb-4" size={60} />
            <h3 className="text-2xl font-semibold text-gray-800">
              Nuestra Misión
            </h3>
            <p className="text-center text-gray-600 max-w-xs mt-2">
              Empoderar a las personas para que tomen control de sus finanzas
              mediante herramientas simples y accesibles.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <FaRegBuilding className="text-green-600 mb-4" size={60} />
            <h3 className="text-2xl font-semibold text-gray-800">
              Nuestra Visión
            </h3>
            <p className="text-center text-gray-600 max-w-xs mt-2">
              Convertirnos en la plataforma financiera líder, ofreciendo
              soluciones para gestionar gastos y maximizar el ahorro.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 border rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Lo que hacemos
          </h2>
          <p className="text-gray-600 leading-relaxed">
            En nuestra plataforma, podrás registrar todos tus gastos e ingresos
            de manera sencilla y clara. Te ofrecemos un análisis detallado para
            que puedas conocer cómo estás utilizando tu dinero y tomar
            decisiones más informadas. Con nuestras herramientas, tendrás acceso
            a gráficos, reportes y consejos personalizados que te ayudarán a
            optimizar tus finanzas personales.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Ya sea que estés buscando ahorrar, pagar deudas, o simplemente tener
            un mayor control sobre tus finanzas diarias, estamos aquí para
            acompañarte en ese camino. Creemos que la educación financiera es
            clave para lograr estabilidad económica, y nuestro propósito es
            hacerlo fácil para ti.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
