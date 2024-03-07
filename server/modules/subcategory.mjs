import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createSubcategory({
  name,
  monthlyProvision,
  categoryId,
  userId,
}) {
  const formattedName = name.toLowerCase();
  const formattedProvision = parseFloat(monthlyProvision);
  return await prisma.subcategory.create({
    data: {
      name: formattedName,
      monthlyProvision: formattedProvision,
      categoryId,
      userId,
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
