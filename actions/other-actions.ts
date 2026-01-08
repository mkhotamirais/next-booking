"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getAmenities = async () => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized access");
  }

  try {
    const result = await prisma.amenities.findMany({ orderBy: { name: "asc" } });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRevenueAndReserve = async () => {
  try {
    const result = await prisma.reservation.aggregate({
      _count: true,
      _sum: { price: true },
      where: {
        Payment: { status: { not: "failure" } },
      },
    });
    return {
      revenue: result._sum.price || 0,
      reserve: result._count,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getTotalCustomer = async () => {
  try {
    const result = await prisma.reservation.findMany({
      distinct: ["userId"],
      where: {
        Payment: { status: { not: "failure" } },
      },
      select: { userId: true },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
