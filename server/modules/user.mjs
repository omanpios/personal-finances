import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByEmail(email) {
  if (email) {
    const formattedEmail = email.toLowerCase();
    const user = await prisma.user.findUnique({
      where: {
        email: formattedEmail,
      },
    });
    return user;
  }
  return null;
}

export async function createUser(email, password) {
  const formattedEmail = email.toLowerCase();

  const user = await prisma.user.create({
    data: {
      email: formattedEmail,
      password,
    },
  });
  return user;
}

export async function getUserById(userId) {
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
  return null;
}

export async function getProvisionByUserId(userId) {
  const response = await prisma.subcategory.aggregate({
    where: { userId: userId },
    _sum: { monthlyProvision: true },
  });
  if (response._sum.monthlyProvision === null) {
    return 0;
  } else {
    return response._sum.monthlyProvision;
  }
}
