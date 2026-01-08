"use client";

import { useState, useActionState } from "react";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DisabledDateProps, RoomDetailProps } from "@/types/room";
import { createReservation } from "@/actions/reservation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ReserveForm({
  room,
  disabledDate,
}: {
  room: RoomDetailProps;
  disabledDate: DisabledDateProps[];
}) {
  const StartDate = new Date();
  const EndDate = addDays(new Date(), 1);

  const [startDate, setStartDate] = useState(StartDate);
  const [endDate, setEndDate] = useState(EndDate);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start!);
    setEndDate(end!);
  };

  const [state, formAction, isPending] = useActionState(
    createReservation.bind(null, room.id, room.price, startDate, endDate),
    null
  );

  const excludeDates = disabledDate.map((item) => {
    return { start: item.startDate, end: item.endDate };
  });

  return (
    <div>
      <h2 className="h2">Reserve Form</h2>
      <form action={formAction}>
        <div className="mb-4">
          <Label htmlFor="">Arrival - Departure</Label>
          <DatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            selectsRange={true}
            onChange={handleDateChange}
            excludeDateIntervals={excludeDates}
            dateFormat={"dd-MM-YYYY"}
            wrapperClassName="w-full"
            className="py-2 px-4 rounded-md border border-gray-300 w-full"
          />
          <div aria-live="polite" aria-atomic="true" className="">
            <p className="text-sm text-red-500">{state?.messageDate}</p>
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="">Your Name</Label>
          <Input type="text" name="name" className="input" placeholder="Your name.." />
          <div aria-live="polite" aria-atomic="true" className="">
            <p className="text-sm text-red-500">{state?.error?.properties?.name?.errors}</p>
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="">Phone Number</Label>
          <Input type="text" name="phone" className="input" placeholder="Your phone number.." />
          <div aria-live="polite" aria-atomic="true" className="">
            <p className="text-sm text-red-500">{state?.error?.properties?.phone?.errors}</p>
          </div>
        </div>
        <Button type="submit" className="btn w-full block" disabled={isPending}>
          {isPending ? "Reserving..." : "Reserve Now"}
        </Button>
      </form>
    </div>
  );
}
