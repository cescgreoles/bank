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
          {[
            "https://picsum.photos/1920/300",
            "https://picsum.photos/1920/300",
            "https://picsum.photos/1920/300",
          ].map((url) => (
            <CarouselItem key={url} className="pl-2 w-full">
              <AspectRatio ratio={16 / 3}>
                <img src={url} alt="" className="w-full h-full object-cover" />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <h2>What do you need?</h2>
      <div className="btns-container">
        <Button className="m-1">Open Account</Button>
        <Button className="m-1">Transfer Money</Button>
        <Button className="m-1">Pay Bills</Button>
      </div>
    </main>
  );
};

export default Home;
