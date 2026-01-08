import Image from "next/image";
import React from "react";
import { formatDate, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { IoPencil } from "react-icons/io5";
import DeleteBtn from "./DeleteBtn";
import { getRooms } from "@/actions/room";

export default async function RoomTable() {
  const rooms = await getRooms();
  if (!rooms?.length) return <p>No Rooms</p>;

  return (
    <div>
      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Image</th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left hidden sm:table-cell">
              Room Name
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left hidden md:table-cell">
              Price
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left hidden md:table-cell">
              Created At
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rooms.map((room) => (
            <tr key={room.id} className="hover:bg-gray-100">
              <td className="px-6 py-4">
                <Image src={room.image} width={100} height={100} alt={room.name} />
              </td>
              <td className="px-6 py-4 hidden sm:table-cell">{room.name}</td>
              <td className="px-6 py-4 hidden md:table-cell">{formatCurrency(room.price)}</td>
              <td className="px-6 py-4 hidden md:table-cell">{formatDate(room.createdAt.toISOString())}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-4">
                  <DeleteBtn id={room.id} image={room.image} />
                  <Link href={`/admin/manage-room/edit/${room.id}`} className="p-2 border rounded text-green-500">
                    <IoPencil />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
