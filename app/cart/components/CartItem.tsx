import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { Product } from "@/types";
import { useUser } from "@/hooks/useUser";
import formatPrice from "@/helpers/priceFormat";

type CartItemProps = {
  product: Product;
  quantity: number;
};

const CartItem: React.FC<CartItemProps> = ({ product, quantity }) => {
  const user = useUser();
  const [count, setCount] = useState<number>(quantity);

  useEffect(() => {
    user.updateQuantity(product.id, count);
  }, [count]);

  const handleRemoveFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    user.removeFromCart(product.id);
  };

  const handleMinus = () => {
    setCount((prev) => {
      if (prev === 1) return prev;
      return prev - 1;
    });
  };

  const handlePlus = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col rounded-md bg-white">
      <div className="flex flex-row gap-2 items-center justify-between">
        <div
          className="relative flex items-center justify-center w-[30%]
         h-[150px] ml-2"
        >
          <Image
            src={product.image}
            priority
            fill
            alt="product"
            className="object-scale-down"
          />
        </div>

        <div className="w-[70%] flex flex-col gap-2 rounded-md p-2">
          <div className="text-sm text-white bg-yellow-600 w-fit p-1 rounded-sm">
            {product.category}
          </div>

          <div className="truncate">{product.title}</div>

          <div className="line-clamp-2 text-gray-400 text-sm">
            {product.description}
          </div>

          <div className="text-sm flex flex-row gap-2 items-center">
            <div className="text-xs bg-green-700 px-2 py-1 rounded-md text-white flex flex-row gap-1 items-center">
              {product.rating.rate} <FaStar />
            </div>
            <div className="text-sm text-gray-600">
              {product.rating.count} Ratings
            </div>
          </div>

          <div className="text-lg font-bold">{formatPrice(product.price)}</div>
        </div>
      </div>

      <div className="flex flex-row gap-5 p-2 bg-slate-300 rounded-b-md">
        <button
          onClick={(e) => handleRemoveFromCart(e)}
          className="flex flex-row items-center gap-1 text-xs text-white font-bold bg-red-500 p-2 rounded-md"
        >
          <MdDelete className="text-lg" />
          Remove
        </button>

        <div className="flex flex-row items-center gap-1 text-xs font-bold bg-gray-400 p-2 rounded-md">
          <FaMinus onClick={handleMinus} className="cursor-pointer" />
          <div className="w-[25px] h-[25px] flex items-center justify-center bg-white rounded-sm focus:outline-none p-1">
            {count}
          </div>
          <FaPlus onClick={handlePlus} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
