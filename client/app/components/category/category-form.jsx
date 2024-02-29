"use client";

import { useState } from "react";
import Input from "../common/input";
import Button from "../common/button";
import { callApi } from "@/app/utils/utils";
import Head from "next/head";

export default function CategoryForm() {
  const [category, setCategory] = useState({ name: "", userId: 6 });

  function handleOnChange(e) {
    const { name, value } = e.target;
    setCategory((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  async function submitCategory(e) {
    e.preventDefault();
    const { name, userId } = category;
    await callApi("http://localhost:8080/category", "POST", {
      name,
      userId: parseInt(userId),
    });
  }

  return (
    <form className="w-full max-w-sm">
      <Head>Create a new category</Head>
      <Input
        label="Name"
        type="text"
        placeholder="Apartment expenses"
        name="name"
        value={category.name}
        onChange={handleOnChange}
      />
      <Input
        label="User"
        type="number"
        placeholder="6"
        name="userId"
        value={category.userId}
        onChange={handleOnChange}
      />
      <Button label="Create Category" onClick={submitCategory} />
    </form>
  );
}
