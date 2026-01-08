import React from "react";
import Card from "./Card";
import { getRooms } from "@/actions/room";

export default async function Main() {
  const rooms = await getRooms();
  if (!rooms?.length) return <p>No Rooms</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {rooms.map((room) => (
        <Card key={room.id} room={room} />
      ))}
    </div>
  );
}
