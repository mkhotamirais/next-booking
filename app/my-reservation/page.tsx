import React from "react";
import MyReserveList from "./MyReserveList";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "My Reservation",
};

export default async function Myreservation() {
  const session = await auth();
  if (!session || !session.user) redirect("/signin");

  return (
    <section className="py-12">
      <div className="container">
        <h1 className="h1">My Reservation</h1>
        <p>Hi, {session.user.name}</p>
        <p>Here is your reservation</p>
        <MyReserveList />
      </div>
    </section>
  );
}
