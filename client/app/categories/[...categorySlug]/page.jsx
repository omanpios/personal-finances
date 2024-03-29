"use client";

import SubcategoryCard from "@/app/components/category/subcategory-card";
import SubcategoryForm from "@/app/components/category/subcategory-form";
import { CategoryContext } from "@/app/contexts/CategoryContext";
import { currency, getData } from "@/app/utils/utils";
import { useContext, useEffect, useState } from "react";

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

  return (
    <>
      <header>
        <div className="flex flex-col items-center p-10">
          <h1 className="text-2xl font-semibold uppercase pb-5">{slug}</h1>
          <h2>
            <span className="font-semibold">Provision:</span>{" "}
            {currency.format(totalProvision)}
          </h2>
          <h2>
            <span className="font-semibold">Current balance:</span>{" "}
            {currency.format(balance)}{" "}
          </h2>
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
              budget={subcategory.budget}
              frequency={subcategory.frequency}
            />
          ))}
        </div>
      </main>
    </>
  );
}
