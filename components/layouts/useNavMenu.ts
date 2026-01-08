"use client";

import { useSession } from "next-auth/react";
import { mainMenu as m, publicRoutes, userRoutes, adminRoutes } from "@/lib/content";

export default function useNavMenu() {
  const { data: session, status } = useSession();

  let menu = m.filter((item) => publicRoutes.includes(item.url));
  if (session && session?.user.role === "user") menu = m.filter((item) => userRoutes.includes(item.url));
  if (session && session?.user.role === "admin") menu = m.filter((item) => adminRoutes.includes(item.url));

  return { menu, status };
}
