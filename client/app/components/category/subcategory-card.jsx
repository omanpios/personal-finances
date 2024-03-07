import { currency } from "@/app/utils/utils";

export default function SubcategoryCard({ id, name, monthlyProvision }) {
  const balance = 0;
  const percentage = (balance / monthlyProvision) * 100;

  const style = {
    width: `${percentage}%`,
  };
  return (
    <div className="p-5" id={id}>
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-xl font-bold capitalize">{name}</h1>
        <div className="mt-4 mb-10">
          <p className="text-gray-600">
            Monthly provision: {currency.format(monthlyProvision)}
          </p>
          <p className="text-gray-600">Balance: {currency.format(balance)}</p>
          <div className="bg-gray-400 w-64 h-3 rounded-lg mt-2 overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-lg shadow-md"
              style={style}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
