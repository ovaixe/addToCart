import { useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaStar } from "react-icons/fa";

import { Product } from "@/types";
import { useUser } from "@/hooks/useUser";
import formatPrice from "@/helpers/priceFormat";
import AddToCartMessage from "./AddToCartMessage";

const ProductCard: React.FC<Product> = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  const user = useUser();

  const [added, setAdded] = useState<boolean>(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    user.addToCart({
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="relative group overflow-hidden flex flex-col justify-between gap-2 rounded-md bg-white">
      <AddToCartMessage added={added} />

      <div className="relative mt-2 flex items-center justify-center w-full h-[150px] overflow-hidden">
        <Image
          src={image}
          priority
          fill
          alt="product"
          className="object-scale-down"
        />
      </div>

      <div className="flex flex-col gap-2 translate-y-16 group-hover:-translate-y-0 group-hover:drop-shadow-4xl bg-white transition-all duration-300 rounded-b-md p-2">
        <div className="text-sm text-white bg-yellow-600 w-fit p-1 rounded-sm">
          {category}
        </div>

        <div className="truncate">{title}</div>

        <div className="line-clamp-2 text-gray-400 text-sm"> {description}</div>

        <div className="text-sm flex flex-row gap-2 items-center">
          <div className="text-xs bg-green-700 px-2 py-1 rounded-md text-white flex flex-row gap-1 items-center">
            {rating.rate} <FaStar />
          </div>
          <div className="text-sm text-gray-600">{rating.count} Ratings</div>
        </div>

        <div className="text-lg font-bold">{formatPrice(price)}</div>

        <div className="mt-5 p-2">
          <button
            onClick={(e) => handleAddToCart(e)}
            className="flex flex-row items-center gap-1 text-sm text-white font-bold bg-green-500 p-2 rounded-md"
          >
            Add to Cart
            <FaShoppingCart className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
