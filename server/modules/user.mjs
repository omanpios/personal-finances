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
