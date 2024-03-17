"use client";
import CategoryForm from "../components/category/category-form";
import CategoryCard from "../components/category/category-card";
import { useContext, useEffect, useState } from "react";
import { currency, getData } from "../utils/utils";
import { UserContext } from "../contexts/UserContext";

export default function Category() {
  const { userId } = useContext(UserContext);
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
            id={category.id}
          />
        ))}
      </div>
    </>
  );
}
