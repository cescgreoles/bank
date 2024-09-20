import "@/app/page.css";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const images = ["./1.png", "./2.png", "./3.png", "./4.png"];

  return (
    <main className="main">
      <Carousel
        className="relative w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="w-full flex">
          {[...Array(6)].map((_, index) => (
            <CarouselItem key={index} className="w-full sm:w-1/2 md:w-1/3 px-2">
              <div className="flex flex-col justify-center items-center p-4 bg-gray-100 rounded-lg shadow-lg h-full">
                <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-center">
                  Título {index + 1}
                </h3>

                <p className="text-lg md:text-xl text-gray-700 text-center mb-4">
                  Esta es la descripción del elemento {index + 1}. El contenido
                  es completamente responsive.
                </p>

                <Button className="w-full md:w-1/3">Leer más</Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition" />
      </Carousel>
      <div className="flex flex-wrap  gap-4 mb-8">
        {images.slice(0, 3).map((image, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-lg w-64">
            <h3 className="text-lg font-semibold mb-4">Card {index + 1}</h3>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <Button className="w-full">View More</Button>
          </div>
        ))}
      </div>

      <h2>What do you need?</h2>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start md:space-x-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-48 m-1">
          <Button className="w-full">Open Account</Button>
        </div>
        <div className="w-full md:w-48 m-1">
          <Button className="w-full">Transfer Money</Button>
        </div>
        <div className="w-full md:w-48 m-1">
          <Button className="w-full">Pay Bills</Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
