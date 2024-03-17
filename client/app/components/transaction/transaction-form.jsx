"use client";

import { useContext, useState } from "react";
import Button from "../common/button";
import Input from "../common/input";
import RadioButton from "../common/radio-button";
import { postData } from "@/app/utils/utils";
import { UserContext, UserProvider } from "@/app/contexts/UserContext";
import {
  SubcategoryContext,
  SubcategoryProvider,
} from "@/app/contexts/SubcategoryContext";

export function TransactionForm() {
  const [transactionType, setTransactionType] = useState();
  const { userId } = useContext(UserContext);
  const { subcategoryId } = useContext(SubcategoryContext);
  const [transaction, setTransaction] = useState({
    description: "",
    amount: 0,
  });

  function handleOnChange(e) {
    const { name, value } = e.target;
    setTransaction((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  async function submitTransaction() {
    const newTransaction = {
      ...transaction,
      userId,
      subcategoryId,
      date: new Date(),
    };
    const response = await postData(
      "http://localhost:8080/transaction",
      "POST",
      newTransaction
    );
    setTransaction({ description: "", amount: 0 });
  }

  return (
    <div className="w-full max-w-sm p-7">
      <Input
        label="Description"
        type="text"
        placeholder="Netflix subscription"
        name="description"
        value={transaction.description}
        onChange={handleOnChange}
      />
      <div className="flex flex-row justify-center">
        <form>
          <RadioButton
            label="Income"
            value=""
            id="1"
            // onClick={handleRadioButtons}
            name="income"
            defaultChecked={true}
          />
          <RadioButton
            label="Expense"
            value=""
            id="2"
            name="expense"
            // onClick={handleRadioButtons}
            defaultChecked={false}
          />
        </form>
      </div>
      <Input
        label="Amount"
        type="number"
        placeholder="300.000"
        name="amount"
        value={transaction.amount}
        onChange={handleOnChange}
      />
      <Button label="Create" onClick={submitTransaction} />
    </div>
  );
}
