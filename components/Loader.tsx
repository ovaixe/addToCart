export default function Loader({ size }: { size: number }) {
  return (
    <div
      className={`w-${size} h-${size} rounded-full border-4 border-t-blue-600 animate-spin`}
    ></div>
  );
}
