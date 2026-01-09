import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { HiClock } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Payment Pending",
};

export default function PaymentPending() {
  return (
    <section className="py-12">
      <div className="container">
        <HiClock className="text-6xl text-red-500" />
        <h3 className="h3">Payment Pending</h3>
        <p>Please finishing the payment soon</p>
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
