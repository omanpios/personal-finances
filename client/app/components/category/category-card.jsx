import { CategoryContext } from "@/app/contexts/CategoryContext";
import { currency } from "@/app/utils/utils";
import Link from "next/link";
import { useContext } from "react";

export default function CategoryCard({
  categoryName,
  monthlyProvision,
  balance,
  id,
}) {
  const { setCategoryId } = useContext(CategoryContext);
  function handleOnClick() {
    setCategoryId(id);
  }

  return (
    <div className="p-5" id={id}>
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-xl font-bold capitalize">{categoryName}</h1>
        <div className="mt-4 mb-10">
          <p className="text-gray-600">
            Monthly provision: {currency.format(monthlyProvision)}
          </p>
          <p className="text-gray-600">Balance: ${balance}</p>
          <div className="bg-gray-400 w-64 h-3 rounded-lg mt-2 overflow-hidden">
            <div className="bg-purple-500 w-0 h-full rounded-lg shadow-md"></div>
          </div>
        </div>
        <Link
          href={`/categories/${categoryName}`}
          onClick={handleOnClick}
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
