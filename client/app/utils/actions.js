import { getData } from "./utils";

export async function getSubcategoryBalance(subcategoryId) {
  const response = await getData(
    `http://localhost:8080/subcategory/${subcategoryId}/balance`,
    "GET"
  );
  const { balance } = await response.json();
  return balance;
}
