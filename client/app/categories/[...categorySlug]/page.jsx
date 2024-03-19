"use client";

import SubcategoryCard from "@/app/components/category/subcategory-card";
import SubcategoryForm from "@/app/components/category/subcategory-form";
import { CategoryContext } from "@/app/contexts/CategoryContext";
import { currency, getData } from "@/app/utils/utils";
import { useContext, useEffect, useState } from "react";
import env from "dotenv";

env.config();

export default function CategoryPage({ params }) {
  const slug = params.categorySlug;
  const [subcategories, setSubcategories] = useState([]);
  const [totalProvision, setTotalProvision] = useState(0);
  const { categoryId } = useContext(CategoryContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function getSubcategories() {
      const response = await getData(
        `http://localhost:8080/category/${categoryId}/subcategories`
      );
      const res = await response.json();
      const { subcategories, totalProvision } = res;
      setSubcategories(subcategories);
      setTotalProvision(totalProvision);
    }
    async function getBalance() {
      const response = await getData(
        `http://localhost:8080/category/${categoryId}/balance`
      );
      const { balance } = await response.json();
      setBalance(balance);
    }
    getSubcategories();
    getBalance();
  }, []);

  const percentage = (balance / totalProvision) * 100;

  const style = {
    width: `${percentage}%`,
  };

  return (
    <>
      <header>
        <div className="flex flex-col items-center p-10">
          <h1 className="text-2xl font-semibold uppercase pb-5">{slug}</h1>
          <h2>Provision: {currency.format(totalProvision)}</h2>
          <h2>Current balance: {currency.format(balance)} </h2>
          <div className="bg-gray-400 w-64 h-3 rounded-lg mt-2 overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-lg shadow-md"
              style={style}
            ></div>
          </div>
        </div>
      </header>
      <main>
        <SubcategoryForm />
        <div className="flex flex-row p-10 justify-around flex-wrap">
          {subcategories.map((subcategory, index) => (
            <SubcategoryCard
              key={index}
              id={subcategory.id}
              name={subcategory.name}
              monthlyProvision={subcategory.monthlyProvision}
            />
          ))}
        </div>
      </main>
    </>
  );
}
