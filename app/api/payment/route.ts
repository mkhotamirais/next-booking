import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { ReservationProps } from "@/types/reservation";

const snap = new Midtrans.Snap({
  isProduction: process.env.NODE_ENV === "production",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export const POST = async (req: Request) => {
  const reservation: ReservationProps = await req.json();

  const parameter = {
    transaction_details: { order_id: reservation.id, gross_amount: reservation.Payment?.amount || 0 },
    credit_card: { secure: true },
    customer_details: { first_name: reservation.User.name, email: reservation.User.email },
  };

  const token = await snap.createTransaction(parameter);

  return NextResponse.json(token);
};
