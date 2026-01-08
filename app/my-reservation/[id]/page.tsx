import { getReservationById } from "@/actions/reservation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";

export default async function MyreservationId({ params }: { params: Promise<{ id: string }> }) {
  const reservationId = (await params).id;

  const reservation = await getReservationById(reservationId);
  if (!reservation || !reservation.Payment) return <h1 className="h1">No reservation found</h1>;

  return (
    <section>
      <div className="container">
        <h1 className="h1">My Reservation Detail</h1>
        <div>Reservation ID: #{reservation.id}</div>
        <div>Book Date: {formatDate(reservation.createdAt.toISOString())}</div>
        <div>Name: {reservation.User.name}</div>
        <div>Email: {reservation.User.email}</div>
        <div>Phone: {reservation.User.phone}</div>
        <div>Payment Method: {reservation.Payment?.method ? reservation.Payment.method.replace("_", " ") : null}</div>
        <div>Payment Status: {reservation.Payment?.status}</div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Room: {reservation.Room.name}</th>
              <th className="px-6 py-3 min-w-60 md:min-w-0">Arrival</th>
              <th className="px-6 py-3">Departure</th>
              <th className="px-6 py-3">Duration</th>
              <th className="px-6 py-3 text-right">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 whitespace-nowrap">{reservation.Room.name}</span>
                  <span>Price: {formatCurrency(reservation.price)}</span>
                </div>
              </td>
              <td className="px-6 py-4">{formatDate(reservation.startDate.toISOString())}</td>
              <td className="px-6 py-4">{formatDate(reservation.endDate.toISOString())}</td>
              <td className="px-6 py-4">{differenceInCalendarDays(reservation.endDate, reservation.startDate)}</td>
              <td className="px-6 py-4 text-right">
                {reservation.Payment && formatCurrency(reservation.Payment.amount)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="px-6 py-4 font-bold" colSpan={2}>
                Total
              </td>
              <td className="px-6 py-4 font-bold text-right" colSpan={3}>
                {reservation.Payment && formatCurrency(reservation.Payment.amount)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
