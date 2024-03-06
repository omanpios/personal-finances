import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createSubcategory({
  name,
  monthlyProvision,
  categoryId,
  userId,
}) {
  const formattedName = name.toLowerCase();
  return await prisma.subcategory.create({
    data: {
      name: formattedName,
      monthlyProvision,
      categoryId,
      userId,
    },
  });
}

export async function getSubcategory(data = { name: null, userId: null }) {
  const formattedName = data.name.toLowerCase();
  const formattedUserId = parseInt(data.userId);
  return await prisma.subcategory.findFirst({
    where: {
      name: formattedName,
      userId: formattedUserId,
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
