import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { HiXCircle } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Payment Failure",
};

export default function PaymentFailure() {
  return (
    <section className="py-12">
      <div className="container">
        <HiXCircle className="text-6xl text-red-500" />
        <h3 className="h3">Payment Failure</h3>
        <p>Fayment has failed</p>
        <p>Have a great day!</p>
        <div>
          <Link href="/myreservation" className="btn">
            Go to my reservation
          </Link>
        </div>
      </div>
    </section>
  );
}
