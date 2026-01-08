import Image from "next/image";
import React from "react";
import { IoPeople } from "react-icons/io5";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Room } from "@/lib/generated/prisma";
import { Button } from "./ui/button";

export default function Card({ room }: { room: Room }) {
  return (
    <div className="shadow-md">
      <Image src={room.image} alt="mimbar" width={500} height={500} className="h-72 object-cover object-center" />
      <div className="p-3 space-y-2">
        <Link href={`/room/${room.id}`} className="block mb-2">
          <h3 className="h3">{room.name}</h3>
        </Link>
        <p>
          {formatCurrency(room.price)} <span>/night</span>
        </p>
        <div className="flex items-center justify-between">
          <p className="flex gap-2">
            <IoPeople className="size-6" />{" "}
            <span>
              {room.capacity} {room.capacity === 1 ? "person" : "people"}
            </span>
          </p>
          <Button asChild>
            <Link href={`/rooms/${room.id}`} type="button" className="btn">
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
