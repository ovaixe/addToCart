"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const { cart } = useUser();

  return (
    <div>
      <div className="sticky h-[70px] top-0 z-50 w-full flex items-center justify-between bg-blue-600 text-white py-2 px-5">
        <Link href={"/"} className="text-2xl font-bold">
          ECOM
        </Link>

        <Link
          href={"/cart"}
          className="flex flex-row items-center gap-1 cursor-pointer"
        >
          {cart.products.length > 0 && (
            <div className=" bg-red-500 text-xs py-1 px-2 rounded-md flex items-center justify-center">
              {cart.products.length}
            </div>
          )}

          <FaShoppingCart className="text-2xl" />
        </Link>
      </div>

      {children}
    </div>
  );
};

export default Navbar;
