"use client";
import CategoryForm from "../components/category/category-form";
import CategoryCard from "../components/category/category-card";
import { useEffect, useState } from "react";
import { getData } from "../utils/utils";

export default function Category() {
  const userId = 6;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const response = await getData(
        `http://localhost:8080/user/${userId}/categories`
      );
      const categories = await response.json();
      setCategories(categories);
    }
    getCategories();
  }, []);

  return (
    <>
      <CategoryForm />
      <div className="flex flex-row p-10 justify-around flex-wrap">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            categoryName={category.name}
            monthlyProvision={category.monthlyProvision}
            balance={category.balance}
          />
        ))}
      </div>
    </>
  );
}
