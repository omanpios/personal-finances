import { PrismaClient } from "@prisma/client";
import { isInvalidText } from "./common.mjs";

const prisma = new PrismaClient();

export async function createCategory(categoryName, userId) {
  const formattedName = categoryName.toLowerCase();
  if (isInvalidText(categoryName)) {
    return { message: "Invalid value submitted!" };
  }
  return await prisma.category.create({
    data: {
      name: formattedName,
      userId,
    },
  });
}

export async function readCategoriesByUserId(userId) {
  return await prisma.category.findMany({
    where: { userId },
    include: { subcategories: true },
  });
}

export async function getBalanceByCategoryId(categoryId) {
  const id = parseInt(categoryId);
  const response = await prisma.$queryRaw`
  SELECT SUM(amount) AS "balance"
  FROM "Transaction"
  JOIN "Subcategory" ON "Transaction"."subcategoryId" = "Subcategory".id
  WHERE "Subcategory"."categoryId" = ${id}`;
  if (response[0].balance === null) {
    return { balance: 0 };
  } else {
    return response[0];
  }
}
