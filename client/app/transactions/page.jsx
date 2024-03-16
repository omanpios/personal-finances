"use client";

import { useContext, useEffect, useState } from "react";
import { TransactionForm } from "../components/transaction/transaction-form";
import TransactionsTable from "../components/transaction/transactions-table";
import { getData } from "../utils/utils";
import { SubcategoryContext } from "../contexts/SubcategoryContext";

export default function Transaction() {
  const { subcategoryId } = useContext(SubcategoryContext);
  const [transactionsData, setTransactionsData] = useState({
    totalAmount: null,
    count: null,
    transactions: [
      {
        id: null,
        description: null,
        amount: null,
        subcategoryId: null,
        userId: null,
        date: new Date(),
      },
    ],
  });
  useEffect(() => {
    async function getTransactions() {
      const response = await getData(
        `http://localhost:8080/subcategory/${subcategoryId}/transactions`,
        "GET"
      );
      const transactions = await response.json();
      setTransactionsData(transactions);
    }
    getTransactions();
  }, []);

  const response = {
    count: 3,
    totalAmount: -79998.09,
    transactions: [
      {
        id: 44,
        description: "cositas",
        amount: 0,
        subcategoryId: 55,
        userId: 6,
        date: "2024-03-15T19:48:21.109Z",
      },
      {
        id: 45,
        description: "test",
        amount: -80000.09,
        subcategoryId: 55,
        userId: 6,
        date: "2024-03-15T19:51:38.136Z",
      },
      {
        id: 52,
        description: "hola",
        amount: 2,
        subcategoryId: 55,
        userId: 6,
        date: "2024-03-16T01:17:29.258Z",
      },
    ],
  };

  const headers = ["Date", "Description", "Amount", "Subcategory name"];
  const { transactions } = transactionsData;
  return (
    <>
      <h1>Transactions page</h1>
      <TransactionForm />
      <TransactionsTable headers={headers} transactions={transactions} />
    </>
  );
}
