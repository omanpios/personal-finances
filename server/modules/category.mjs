import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createCategory(categoryName, userId) {
  const formattedName = categoryName.toLowerCase();
  return await prisma.category.create({
    data: {
      name: formattedName,
      userId,
    },
  });
}
