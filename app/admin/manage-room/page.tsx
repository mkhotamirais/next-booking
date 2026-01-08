import Link from "next/link";
import React, { Suspense } from "react";
import RoomTable from "./RoomTable";
import { Button } from "@/components/ui/button";

export default function AdminRoom() {
  return (
    <section className="py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <h1 className="h1 mb-0!">Room List</h1>
          <Button>
            <Link href="/admin/manage-room/create">Create Room</Link>
          </Button>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <RoomTable />
        </Suspense>
      </div>
    </section>
  );
}
