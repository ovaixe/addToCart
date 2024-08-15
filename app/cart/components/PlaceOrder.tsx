import { useEffect, useState } from "react";

import Loader from "../../../components/Loader";

export default function PlaceOrder() {
  const [payment, setPayment] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPayment(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {payment ? (
        <div className="bg-yellow-500 p-2 text-lg rounded-md flex flex-row items-center gap-3">
          Processing Payment
          <Loader size={5} />
        </div>
      ) : (
        <div className="bg-green-500 p-2 text-lg text-white rounded-md">
          Order placed successfully!
        </div>
      )}
    </div>
  );
}
