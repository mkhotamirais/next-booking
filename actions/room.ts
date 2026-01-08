"use server";

import prisma from "@/lib/prisma";
import { RoomSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { del } from "@vercel/blob";

export const updateRoom = async (image: string, roomId: string, prevState: unknown, formData: FormData) => {
  if (!image) return { message: "Image is required" };
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const vlidatedFields = RoomSchema.safeParse(rawData);
  if (!vlidatedFields.success) {
    return { error: z.treeifyError(vlidatedFields.error), values: rawData };
  }

  const { name, description, capacity, price, amenities } = vlidatedFields.data;
  try {
    await prisma.$transaction([
      prisma.room.update({
        where: { id: roomId },
        data: { name, description, capacity, price, image, RoomAmenities: { deleteMany: {} } },
      }),
      prisma.roomAmenities.createMany({
        data: amenities.map((amenity) => ({ amenitiesId: amenity, roomId: roomId })),
      }),
    ]);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/room");
  redirect("/admin/manage-room");
};

export const deleteRoom = async (id: string, image: string) => {
  try {
    await del(image);
    await prisma.room.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/room");
};

export const createRoom = async (image: string, prevState: unknown, formData: FormData) => {
  if (!image) return { message: "Image is required" };
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  console.log(rawData);
  console.log(image);

  const vlidatedFields = RoomSchema.safeParse(rawData);
  if (!vlidatedFields.success) {
    return { error: z.treeifyError(vlidatedFields.error), values: rawData };
  }

  const { name, description, capacity, price, amenities } = vlidatedFields.data;
  try {
    await prisma.room.create({
      data: {
        name,
        description,
        image,
        price,
        capacity,
        RoomAmenities: { createMany: { data: amenities.map((amenity) => ({ amenitiesId: amenity })) } },
      },
    });
  } catch (error) {
    console.log(error);
  }
  redirect("/admin/manage-room");
};

export const getRooms = async () => {
  try {
    const result = await prisma.room.findMany({ orderBy: { createdAt: "desc" } });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: { id: roomId },
      include: { RoomAmenities: { select: { amenitiesId: true } } },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomDetailById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: { id: roomId },
      include: { RoomAmenities: { include: { Amenities: { select: { name: true } } } } },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getDisabledRoomById = async (roomId: string) => {
  try {
    const result = await prisma.reservation.findMany({
      select: {
        startDate: true,
        endDate: true,
      },
      where: {
        roomId: roomId,
        Payment: { status: { not: "failure" } },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
