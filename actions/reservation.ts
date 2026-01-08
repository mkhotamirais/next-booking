"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";
import { ReserveSchema } from "@/lib/zod";
import z from "zod";

export const getReservations = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id || session.user.role !== "admin") {
    throw new Error("Unauthorized Access");
  }
  try {
    const result = await prisma.reservation.findMany({
      include: {
        Room: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        User: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        Payment: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getReservationByUserId = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized Access");
  }
  try {
    const result = await prisma.reservation.findMany({
      where: { userId: session.user.id },
      include: {
        Room: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        User: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        Payment: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getReservationById = async (id: string) => {
  try {
    const result = await prisma.reservation.findUnique({
      where: { id },
      include: {
        Room: { select: { name: true, image: true, price: true } },
        User: { select: { name: true, email: true, phone: true } },
        Payment: true,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const createReservation = async (
  roomId: string,
  price: number,
  startDate: Date | null,
  endDate: Date | null,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) redirect(`/signin?redirect_url=rooms/${roomId}`);

  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };

  const validatedFields = ReserveSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return { error: z.treeifyError(validatedFields.error) };
  }

  const { name, phone } = validatedFields.data;
  const night = differenceInCalendarDays(endDate as Date, startDate as Date);
  if (night < 0) return { messageDate: "Date must be at least 1 night" };
  const total = night * price;

  let reservationId;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        data: { name, phone },
        where: { id: session.user.id },
      });

      const reservation = await tx.reservation.create({
        data: {
          startDate: startDate as Date,
          endDate: endDate as Date,
          price,
          roomId,
          userId: session.user.id as string,
          Payment: { create: { amount: total } },
        },
      });
      reservationId = reservation.id;
    });
  } catch (error) {
    console.log(error);
  }
  redirect(`/checkout/${reservationId}`);
};
