"use client";

import SubcategoryForm from "@/app/components/category/subcategory-form";

export default function CategoryPage({ params }) {
  const slug = params.categorySlug;

  return (
    <>
      <header>
        <div className="flex flex-col items-center p-10">
          <h1 className="text-2xl font-semibold uppercase pb-5">{slug}</h1>{" "}
          <h2>Monthly provision: </h2>
          <h2>Current balance: </h2>
        </div>
      </header>
      <main>
        <SubcategoryForm />
      </main>
    </>
  );
}
