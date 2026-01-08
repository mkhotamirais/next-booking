"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Logout() {
  const { data: session } = useSession();

  if (!session) return null;

  return <Button onClick={() => signOut()}>Logout</Button>;
}
