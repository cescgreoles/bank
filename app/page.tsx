import "@/app/page.css";
import PopUpBox from "@/components/popUpBox";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const Home = () => {
  const images = ["./1.png", "./2.png]"];

  return (
    <main className="main">
      <div className=" w-full h-10 flex items-center justify-center  bg-black text-white text-center">
        <p>
          Para ver la demo de tu cuenta YourBank haz clic{" "}
          <Link href="/demmo" className="text-white-500 font-bold underline ">
            aquí
          </Link>
        </p>
      </div>
      {/* <Carousel className="relative w-full h-screen" opts={{ loop: true }}>
        <CarouselContent className="w-full h-full flex">
          {images.map((image, index) => (
            <CarouselItem key={index} className="flex-shrink-0 w-full h-full">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition z-10" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition z-10" />
      </Carousel> */}
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
      <PopUpBox />
    </main>
  );
};

export default Home;
