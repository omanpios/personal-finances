import { useContext, useState } from "react";
import Button from "../common/button";
import Input from "../common/input";
import { UserContext } from "@/app/contexts/UserContext";
import { CategoryContext } from "@/app/contexts/CategoryContext";
import { postData } from "@/app/utils/utils";
import env from "dotenv";

env.config();

export default function SubcategoryForm() {
  const { userId } = useContext(UserContext);
  const { categoryId } = useContext(CategoryContext);
  const [subcategory, setSubcategory] = useState({
    name: "",
    monthlyProvision: 0,
  });

  function handleOnChange(e) {
    const { name, value } = e.target;
    setSubcategory((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  }

  async function submitSubcategory() {
    subcategory.categoryId = categoryId;
    subcategory.userId = userId;
    const response = await postData(
      "http://localhost:8080/subcategory",
      "POST",
      {
        ...subcategory,
        categoryId,
        userId,
      }
    );
    if (response.status === 400) {
      const { error } = await response.json();
      console.log(error);
      alert(error);
    }
    setSubcategory({
      name: "",
      monthlyProvision: 0,
    });
  }

  return (
    <form className="w-full max-w-sm p-7">
      <h1 className=" text-gray-700 font-bold md:text-right mb-1 md:mb-0 p-3">
        Add a new subcategory
      </h1>
      <Input
        label="Name"
        type="text"
        placeholder="Energy bill"
        name="name"
        value={subcategory.name}
        onChange={handleOnChange}
      />
      <Input
        label="Monthly provision"
        type="number"
        placeholder="Energy bill"
        name="monthlyProvision"
        value={subcategory.monthlyProvision}
        onChange={handleOnChange}
      />
      <Button label="Create Subcategory" onClick={submitSubcategory} />
    </form>
  );
}
