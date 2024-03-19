import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createTransaction({
  description,
  amount,
  subcategoryId,
  userId,
  date,
}) {
  if (amount === 0 || description === "") {
    return { error: "Required values missing" };
  } else {
    return await prisma.transaction.create({
      data: {
        description: description,
        amount: parseFloat(amount),
        subcategoryId: subcategoryId,
        userId: userId,
        date: date,
      },
    });
  }
}

export async function getTransactionsBySubcategoryId(subcategoryId) {
  const id = parseInt(subcategoryId);
  const transactions = await prisma.transaction.findMany({
    where: {
      subcategoryId: id,
    },
  });
  const totalAmount = transactions.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
  return {
    count: transactions.length,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    transactions,
  };
}

export async function getTransactionsByUserId(userId) {
  const id = parseInt(userId);
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: id,
    },
  });
  const totalAmount = transactions.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
  return {
    count: transactions.length,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    transactions,
  };
}

export async function getBalanceBySubcategoryId(subcategoryId) {
  const id = parseInt(subcategoryId);
  const response = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { subcategoryId: id },
  });
  if (response._sum.amount === null) {
    return 0;
  } else {
    return response._sum.amount;
  }
}
