import "@/app/page.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const images = [
    "./1.png",
    "./2.png",
    "./3.png",
    "./4.png",
    "./5.png",
    "./6.png",
  ];

  return (
    <main className="main">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="-ml-1">
          {images.map((url) => (
            <CarouselItem key={url} className="pl-2 md:basis-1/2 lg:basis-1/3 ">
              <AspectRatio ratio={1}>
                <img src={url} alt="" className="image" />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
};

export default Home;
