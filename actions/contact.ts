"use server";

import prisma from "@/lib/prisma";
import { ContactSchema } from "@/lib/zod";
import z from "zod";

export const contactMessage = async (prevState: unknown, formData: FormData) => {
  const rawData = Object.fromEntries(formData.entries());

  const validatedFields = ContactSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return { error: z.treeifyError(validatedFields.error), values: rawData };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    await prisma.contact.create({ data: { name, email, subject, message } });
    return { message: "Thanks for contact us" };
  } catch (error) {
    console.log(error);
  }
};
