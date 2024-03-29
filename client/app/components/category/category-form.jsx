"use client";

import { useContext, useState } from "react";
import Input from "../common/input";
import Button from "../common/button";
import { postData } from "@/app/utils/utils";
import { UserContext } from "@/app/contexts/UserContext";

export default function CategoryForm() {
  const [categoryName, setCategoryName] = useState("");
  const { userId } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  function handleOnChange(e) {
    const { value } = e.target;
    setCategoryName(value);
  }

  async function submitCategory(e) {
    const response = await postData("http://localhost:8080/category", "POST", {
      name: categoryName,
      userId,
    });
    const responseBody = await response.json();
    if (responseBody.message) {
      setErrorMessage(responseBody.message);
    }
    setCategoryName("");
  }

  return (
    <form className="w-full max-w-sm p-7">
      <h1 className=" text-gray-700 font-bold md:text-right mb-1 md:mb-0 p-3">
        Create a new category
      </h1>
      <Input
        label="Name"
        type="text"
        placeholder="Apartment expenses"
        name="name"
        value={categoryName}
        onChange={handleOnChange}
        errorMessage={errorMessage}
      />
      <Button label="Create Category" onClick={submitCategory} />
    </form>
  );
}
