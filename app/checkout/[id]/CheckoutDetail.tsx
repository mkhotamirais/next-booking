import { formatCurrency, formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { differenceInCalendarDays } from "date-fns";
import PaymentButton from "./PaymentButton";
import { getReservationById } from "@/actions/reservation";

export default async function CheckoutDetail({ reservationId }: { reservationId: string }) {
  const reservation = await getReservationById(reservationId);
  if (!reservation || !reservation.Payment) return <h1 className="h1">No reservation found</h1>;

  const duration = differenceInCalendarDays(reservation.endDate, reservation.startDate);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <Image
          src={reservation.Room.image}
          alt={reservation.Room.name}
          width={500}
          height={500}
          className="object-cover w-full rounded aspect-video"
        />
        <h3 className="h3">{reservation.Room.name}</h3>
        <p>{reservation.price}/night</p>
        {/* payment button */}
        <PaymentButton reservation={reservation} />
      </div>
      <div>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="py-2">Reservation ID</td>
              <td className="py-2 text-right truncate">#{reservation.id}</td>
            </tr>
            <tr>
              <td className="py-2">Name</td>
              <td className="py-2 text-right truncate">{reservation.User.name}</td>
            </tr>
            <tr>
              <td className="py-2">Email</td>
              <td className="py-2 text-right truncate">{reservation.User.email}</td>
            </tr>
            <tr>
              <td className="py-2">Phone Number</td>
              <td className="py-2 text-right truncate">{reservation.User.phone}</td>
            </tr>
            <tr>
              <td className="py-2">Arrival</td>
              <td className="py-2 text-right truncate">{formatDate(reservation.startDate.toISOString())}</td>
            </tr>
            <tr>
              <td className="py-2">Departure</td>
              <td className="py-2 text-right truncate">{formatDate(reservation.endDate.toISOString())}</td>
            </tr>
            <tr>
              <td className="py-2">Duration</td>
              <td className="py-2 text-right truncate">
                <span>
                  {duration} {duration > 1 ? "nights" : "night"}
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-2">Amount in Rupiah</td>
              <td className="py-2 text-right truncate">
                <span>{formatCurrency(reservation.Payment.amount)}</span>
              </td>
            </tr>
            <tr>
              <td className="py-2">Status</td>
              <td className="py-2 text-right truncate">
                <span>{reservation.Payment.status}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
