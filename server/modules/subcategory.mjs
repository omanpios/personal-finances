import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function calculateMonthlyProvision(amount, frequency) {
  switch (frequency) {
    case "MONTHLY":
      return amount.toFixed(2);
    case "QUARTERLY":
      return parseFloat((amount / 3).toFixed(2));
    case "HALF_YEARLY":
      return parseFloat((amount / 6).toFixed(2));
    case "YEARLY":
      return parseFloat((amount / 12).toFixed(2));
    default:
      break;
  }
}

export async function createSubcategory({
  name,
  amount,
  categoryId,
  userId,
  frequency,
}) {
  const monthlyProvision = calculateMonthlyProvision(amount, frequency);

  const formattedName = name.toLowerCase();
  const formattedAmount = parseFloat(amount.toFixed(2));

  return await prisma.subcategory.create({
    data: {
      name: formattedName,
      monthlyProvision,
      categoryId,
      userId,
      frequency,
      budget: amount,
    },
  });
}

export async function getSubcategory(data = { name, categoryId }) {
  const formattedName = data.name.toLowerCase();
  const formattedCategoryId = parseInt(data.categoryId);
  return await prisma.subcategory.findFirst({
    where: {
      name: formattedName,
      categoryId: formattedCategoryId,
    },
  });
}

export async function getSubcategoriesByCategoryId(id) {
  const formattedCategoryId = parseInt(id);
  return await prisma.subcategory.findMany({
    where: {
      categoryId: formattedCategoryId,
    },
  });
}

export async function getSubcategoryBySubcategoryAndUserId(
  subcategoryId,
  userId
) {
  const formattedUserID = parseInt(userId);
  const formattedSubcategoryId = parseInt(subcategoryId);
  return await prisma.subcategory.findFirst({
    where: { id: formattedSubcategoryId, userId: formattedUserID },
    include: { transactions: true },
  });
}
