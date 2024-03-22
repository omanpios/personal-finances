import { CategoryContext } from "@/app/contexts/CategoryContext";
import { getCategoryBalance } from "@/app/utils/actions";
import { currency } from "@/app/utils/utils";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function CategoryCard({ categoryName, monthlyProvision, id }) {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    async function getBalance() {
      const balance = await getCategoryBalance(id);
      setBalance(balance);
    }
    getBalance();
  }, []);

  const { setCategoryId } = useContext(CategoryContext);
  function handleOnClick() {
    setCategoryId(id);
  }

  return (
    <div className="p-5" id={id}>
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-xl font-bold uppercase">{categoryName}</h1>
        <div className="mt-4 mb-10">
          <p className="text-gray-600">
            Monthly provision: {currency.format(monthlyProvision)}
          </p>
          <p className="text-gray-600">Balance: {currency.format(balance)}</p>
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
