import formatPrice from "@/helpers/priceFormat";
import { Cart } from "@/types";

interface SummaryProps {
  cart: Cart;
  handlePlaceOrder: () => void;
}

const Summary: React.FC<SummaryProps> = ({ cart, handlePlaceOrder }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-lg font-bold">
        Subtotal: {formatPrice(cart.subTotal)}
      </div>
      <button
        onClick={handlePlaceOrder}
        className="w-fit text-sm bg-yellow-500 py-2 px-3 rounded-md"
      >
        Proceed to Buy ({cart.products.length} items)
      </button>
    </div>
  );
};

export default Summary;
