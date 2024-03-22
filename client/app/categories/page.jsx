"use client";
import CategoryForm from "../components/category/category-form";
import CategoryCard from "../components/category/category-card";
import { useContext, useEffect, useState } from "react";
import { currency, getData } from "../utils/utils";
import { UserContext } from "../contexts/UserContext";

export default function Category() {
  const { userId } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [monthlyProvision, setMonthlyProvision] = useState(0);

  useEffect(() => {
    async function getCategories() {
      const response = await getData(
        `http://localhost:8080/user/${userId}/categories`
      );
      const categories = await response.json();
      setCategories(categories);
    }
    async function getMonthlyProvision() {
      const response = await getData(
        `http://localhost:8080/user/${userId}/monthlyProvision`
      );
      const { monthlyProvision } = await response.json();
      setMonthlyProvision(monthlyProvision);
    }
    getCategories();
    getMonthlyProvision();
  }, []);

  return (
    <>
      <div>
        <CategoryForm />{" "}
        <h1 className="pt-7 text-center text-gray-700 font-bold uppercase">
          Total monthly provision: {currency.format(monthlyProvision)}
        </h1>
        <div> </div>
        <div className="flex flex-row p-10 justify-around flex-wrap">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              categoryName={category.name}
              monthlyProvision={category.monthlyProvision}
              balance={category.balance}
              id={category.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
