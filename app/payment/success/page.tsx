import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { HiCheckCircle } from "react-icons/hi2";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Success",
};

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: Promise<{ transaction_status: string }>;
}) {
  const paymentStatus = (await searchParams)?.transaction_status;
  if (paymentStatus === "pending") redirect("/payment/pending");
  if (paymentStatus === "failure") redirect("/payment/failure");

  return (
    <section className="py-12">
      <div className="container">
        <HiCheckCircle className="text-6xl text-green-500" />
        <h3 className="h3">Payment Done</h3>
        <p>Thank you for completing your secure online payment.</p>
        <p>Have a great day!</p>
        <div>
          <Link href="/my-reservation" className="btn">
            Go to my reservation
          </Link>
        </div>
      </div>
    </section>
  );
}
