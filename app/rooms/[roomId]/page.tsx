import React from "react";
import RoomDetail from "./RoomDetail";

export default async function RoomId({ params }: { params: Promise<{ roomId: string }> }) {
  const roomId = (await params).roomId;

  return (
    <section className="py-6">
      <div className="container">
        <RoomDetail roomId={roomId} />
      </div>
    </section>
  );
}
