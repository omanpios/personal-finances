"use client";
import CategoryForm from "../components/category/category-form";
import CategoryCard from "../components/category/category-card";

export default function Category() {
  const categories = [
    { name: "apartment", monthlyProvision: 7535900, balance: 14800293 },
  ];

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
