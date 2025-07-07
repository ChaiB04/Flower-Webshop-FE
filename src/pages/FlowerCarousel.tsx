import { useState } from "react";
import { Product } from "../types/product";

export default function FlowerCarousel({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const photos = product?.photos || [];

  const prev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentPhoto = photos[index]
    ? `data:image/jpeg;base64,${photos[index]}`
    : "/logo.png";

  return (
   <div className="relative w-full h-[200px]">
      <img
        src={currentPhoto}
        alt={product.name}
        className="w-full h-full object-cover rounded-t-xl"
      />

      {photos.length > 1 ? (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
          >
            ◀
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
          >
            ▶
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {photos.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
