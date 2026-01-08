import React from "react";
import CreateRoomForm from "./CreateRoomForm";
import { Metadata } from "next";
import { getAmenities } from "@/actions/other-actions";

export const metadata: Metadata = {
  title: "Create Room",
};

export default async function CreateRoom() {
  const amenities = await getAmenities();
  if (!amenities) return null;

  return (
    <section className="py-4">
      <div className="container">
        <h1 className="h1">Create Room</h1>
        <CreateRoomForm amenities={amenities} />
      </div>
    </section>
  );
}
