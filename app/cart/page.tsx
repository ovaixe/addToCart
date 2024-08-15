"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";

import { useUser } from "@/hooks/useUser";
import CartItem from "./components/CartItem";
import PlaceOrder from "./components/PlaceOrder";
import Summary from "./components/Summary";

export default function Home() {
  const { cart, placeOrder } = useUser();
  const [order, setOrder] = useState<boolean>(false);

  const handlePlaceOrder = () => {
    setOrder(true);

    const timeout = setTimeout(() => {
      setOrder(false);
      placeOrder();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  };

  return (
    <main className="flex flex-col gap-5 items-center justify-center py-10 px-5">
      {order && <PlaceOrder />}

      <div className="w-full md:w-[70%] lg:w-[50%]">
        {cart.products.length > 0 ? (
          <div className="flex flex-col gap-5">
            <Summary cart={cart} handlePlaceOrder={handlePlaceOrder} />

            <div className="flex flex-col gap-5">
              {cart.products.map((product, index) => (
                <CartItem
                  key={index}
                  product={product.item}
                  quantity={product.quantity}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Link
              href={"/"}
              className="bg-yellow-700 text-white py-1 px-2 rounded-sm flex flex-row gap-1 items-center w-fit"
            >
              Add Items to Cart
              <FaCartPlus className="text-lg" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
