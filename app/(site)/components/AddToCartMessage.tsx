import { MdDone } from "react-icons/md";

export default function AddToCartMessage({ added }: { added: boolean }) {
  return (
    <div
      className={`flex flex-row items-center gap-1 absolute z-[45] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] py-2 px-3 bg-green-700 text-white rounded-sm transition-all duration-300 drop-shadow-4xl text-nowrap ${
        added ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
    >
      Added to Cart <MdDone className="text-lg" />
    </div>
  );
}
