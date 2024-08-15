"use client";

import { useEffect, useState } from "react";

import { Product } from "@/types";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");

        // Ensure the response is OK
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data.data);
      } catch (err) {
        console.error("[ERROR][/api/products]:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between py-10 px-5">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            category={product.category}
            image={product.image}
            rating={product.rating}
          />
        ))}
      </div>
    </main>
  );
}
