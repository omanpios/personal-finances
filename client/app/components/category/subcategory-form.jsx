import { useContext, useState } from "react";
import Button from "../common/button";
import Input from "../common/input";
import { UserContext } from "@/app/contexts/UserContext";
import { CategoryContext } from "@/app/contexts/CategoryContext";
import { postData } from "@/app/utils/utils";
import DropdownList from "../common/dropdown";

export default function SubcategoryForm() {
  const { userId } = useContext(UserContext);
  const { categoryId } = useContext(CategoryContext);
  const [frequency, setFrequency] = useState("MONTHLY");
  const [subcategory, setSubcategory] = useState({
    name: "",
    amount: 0,
    frequency: "MONTHLY",
  });

  function handleOnChange(e) {
    const { name, value } = e.target;
    setSubcategory((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  }

  function handleDropdown(e) {
    const { value } = e.target;
    const formattedValue = value.replace(" ", "_").toUpperCase();
    setFrequency(formattedValue);
  }

  async function submitSubcategory() {
    subcategory.categoryId = categoryId;
    subcategory.userId = userId;
    subcategory.frequency = frequency;
    const response = await postData(
      "http://localhost:8080/subcategory",
      "POST",
      {
        ...subcategory,
        categoryId,
        userId,
        frequency,
      }
    );
    if (response.status === 400) {
      const { error } = await response.json();
      console.log(error);
      alert(error);
    }
    setSubcategory({
      name: "",
      amount: 0,
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
        label="Amount"
        type="number"
        placeholder="150.000"
        name="amount"
        value={subcategory.monthlyProvision}
        onChange={handleOnChange}
      />
      <DropdownList
        label="Frequency"
        options={["Monthly", "Quarterly", "Half yearly", "Yearly"]}
        handleDropdown={handleDropdown}
      />
      <Button label="Create Subcategory" onClick={submitSubcategory} />
    </form>
  );
}
