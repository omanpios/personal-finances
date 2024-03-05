"use client";

import { UserContext } from "@/app/contexts/UserContext";
import { useContext } from "react";

export default function CategoryPage({ params }) {
  const { userId } = useContext(UserContext);
  const slug = params.categorySlug;

  return (
    <>
      <header>
        <div className="flex flex-col items-center p-10">
          <h1 className="text-2xl font-semibold uppercase pb-5">{slug}</h1>{" "}
          <h2>Monthly provision: {userId}</h2>
          <h2>Current balance: </h2>
        </div>
      </header>
      <main>
        <p>form to create a new subcategory</p>
      </main>
    </>
  );
}
