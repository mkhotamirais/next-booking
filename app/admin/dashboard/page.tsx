import React, { Suspense } from "react";
import DashboardCard from "./DashboardCard";
import { Metadata } from "next";
import ReservationList from "./ReservationList";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminDashboard() {
  return (
    <section>
      <div className="container">
        <h1 className="h1">Dashboard</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardCard />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <ReservationList />
        </Suspense>
      </div>
    </section>
  );
}
