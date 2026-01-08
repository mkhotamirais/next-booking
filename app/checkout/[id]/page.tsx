import { Metadata } from "next";
import CheckoutDetail from "./CheckoutDetail";
import { Suspense } from "react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutId({ params }: { params: Promise<{ id: string }> }) {
  const reservationId = (await params).id;
  return (
    <section className="py-8">
      <div className="container">
        <h1 className="h1">Reservation Summary</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <CheckoutDetail reservationId={reservationId} />
        </Suspense>
        <Script
          src="https://app.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="lazyOnload"
        />
      </div>
    </section>
  );
}
