import React from "react";
import { FaUniversity, FaRegBuilding } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/footer/Footer";

const About = () => {
  return (
    <main>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Quiénes Somos</h1>

        <div className="flex flex-col md:flex-row items-center justify-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <FaUniversity className="text-black-700" size={40} />

          <p className="text-lg text-center max-w-3xl">
            Somos un banco comprometido con nuestros clientes, ofreciendo
            soluciones financieras innovadoras y un servicio de calidad. Nuestra
            misión es ayudarte a alcanzar tus metas financieras y brindarte la
            mejor experiencia bancaria.
          </p>

          <FaRegBuilding className="text-black-700" size={40} />
        </div>
      </div>

      <div className="m-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="pregunta-1">
            <AccordionTrigger>
              ¿Cómo puedo abrir una cuenta bancaria?
            </AccordionTrigger>
            <AccordionContent>
              Puedes abrir una cuenta visitando una de nuestras sucursales con
              tu identificación oficial, comprobante de domicilio y un monto
              inicial de depósito.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pregunta-2">
            <AccordionTrigger>
              ¿Requisitos para obtener una tarjeta de crédito?
            </AccordionTrigger>
            <AccordionContent>
              Necesitas ser mayor de edad, tener ingresos comprobables, y
              presentar documentos como identificación oficial y comprobante de
              domicilio. Los detalles específicos varían según el tipo de
              tarjeta.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pregunta-3">
            <AccordionTrigger>¿Cómo puedo consultar mi saldo?</AccordionTrigger>
            <AccordionContent>
              Puedes consultar tu saldo desde nuestra app móvil, a través de
              nuestra banca en línea, o en cualquiera de nuestros cajeros
              automáticos.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pregunta-4">
            <AccordionTrigger>
              ¿Cuál es el horario de atención de las sucursales?
            </AccordionTrigger>
            <AccordionContent>
              Nuestras sucursales están abiertas de lunes a viernes, de 9:00
              a.m. a 5:00 p.m., y los sábados de 9:00 a.m. a 2:00 p.m. Los
              horarios pueden variar según la ubicación.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pregunta-5">
            <AccordionTrigger>
              ¿Cómo puedo reportar mi tarjeta robada o perdida?
            </AccordionTrigger>
            <AccordionContent>
              Puedes reportar la pérdida o robo de tu tarjeta llamando
              inmediatamente a nuestro centro de atención al cliente o
              directamente desde nuestra app móvil para bloquearla.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pregunta-6">
            <AccordionTrigger>
              ¿Cómo solicito un préstamo personal?
            </AccordionTrigger>
            <AccordionContent>
              Puedes solicitar un préstamo personal en línea a través de nuestra
              página web o visitando una de nuestras sucursales. Los requisitos
              incluyen tener un buen historial crediticio y presentar documentos
              de ingresos.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pregunta-7">
            <AccordionTrigger>
              ¿Cómo puedo cambiar mi NIP de la tarjeta?
            </AccordionTrigger>
            <AccordionContent>
              Puedes cambiar tu NIP en cualquier cajero automático del banco o a
              través de nuestra banca en línea siguiendo los pasos de seguridad
              establecidos.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pregunta-8">
            <AccordionTrigger>
              ¿Cómo realizo una transferencia bancaria?
            </AccordionTrigger>
            <AccordionContent>
              Puedes realizar una transferencia desde nuestra app móvil, la
              banca en línea o directamente en una sucursal. Necesitarás los
              datos del beneficiario, como el número de cuenta y la CLABE
              interbancaria.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pregunta-9">
            <AccordionTrigger>
              ¿Qué hago si olvido mi usuario o contraseña?
            </AccordionTrigger>
            <AccordionContent>
              Si olvidaste tu usuario o contraseña, puedes recuperarlos
              siguiendo los pasos indicados en nuestra plataforma de banca en
              línea o contactando a nuestro centro de atención al cliente.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pregunta-10">
            <AccordionTrigger>
              ¿Ofrecen cuentas para estudiantes?
            </AccordionTrigger>
            <AccordionContent>
              Sí, ofrecemos cuentas especiales para estudiantes con beneficios
              como cero comisiones y requisitos mínimos. Visita nuestra página o
              acude a una sucursal para más detalles.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Footer />
    </main>
  );
};

export default About;
