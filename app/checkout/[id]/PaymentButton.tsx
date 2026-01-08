"use client";

import { Button } from "@/components/ui/button";
import { ReservationProps } from "@/types/reservation";
import { useTransition } from "react";

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}

export default function PaymentButton({ reservation }: { reservation: ReservationProps }) {
  const [isPending, startTransition] = useTransition();

  const handlePayment = () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/payment", { method: "POST", body: JSON.stringify(reservation) });
        const { token } = await response.json();
        if (token) {
          window.snap.pay(token);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <Button type="button" className="btn" onClick={handlePayment} disabled={isPending}>
      {isPending ? "Loading..." : "Pay Now"}
    </Button>
  );
}
