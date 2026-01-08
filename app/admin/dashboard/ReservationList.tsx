import Image from "next/image";
import React from "react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { getReservations } from "@/actions/reservation";

export default async function ReservationList() {
  const reservation = await getReservations();
  if (!reservation?.length) return <p>No Reservation found</p>;

  return (
    <div>
      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Image</th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left hidden sm:table-cell">Name</th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left hidden sm:table-cell">
              Arrival
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left hidden sm:table-cell">
              Departure
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left hidden sm:table-cell">
              Room Name
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left hidden md:table-cell">
              Price
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left hidden md:table-cell">
              Created At
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left hidden md:table-cell">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reservation.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="px-6 py-4">
                <Image src={item.Room.image} width={100} height={100} alt={item.Room.name} />
              </td>
              <td className="px-6 py-4 hidden sm:table-cell">{item.User.name}</td>
              <td className="px-6 py-4 hidden md:table-cell">{formatDate(item.startDate.toISOString())}</td>
              <td className="px-6 py-4 hidden md:table-cell">{formatDate(item.endDate.toISOString())}</td>
              <td className="px-6 py-4 hidden md:table-cell">{item.Room.name}</td>
              <td className="px-6 py-4 hidden md:table-cell">{formatCurrency(item.price)}</td>
              <td className="px-6 py-4 hidden md:table-cell">{formatDate(item.createdAt.toISOString())}</td>
              <td className="px-6 py-4 hidden md:table-cell">{item.Payment?.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
