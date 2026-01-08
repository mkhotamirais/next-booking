import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IoCheckmark, IoPeopleOutline } from "react-icons/io5";
import ReserveForm from "./ReserveForm";
import { getDisabledRoomById, getRoomDetailById } from "@/actions/room";

export default async function RoomDetail({ roomId }: { roomId: string }) {
  const [room, disabledDate] = await Promise.all([getRoomDetailById(roomId), getDisabledRoomById(roomId)]);
  if (!room || !disabledDate) return notFound();

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="space-y-4 lg:col-span-2">
        <h1 className="h1">{room.name}</h1>
        <h3 className="h3">{formatCurrency(room.price)}</h3>
        <Image
          src={room.image}
          width={500}
          height={500}
          alt={room.name}
          className="w-full h-80 object-cover object-center"
        />
        <p>{room.description}</p>
        <div>
          <h3 className="h3">Amenities</h3>
          <div className="grid grid-cols-3 gap-4">
            {room.RoomAmenities.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <IoCheckmark />
                {item.Amenities.name}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="h3">Capacity</h3>
          <div className="flex items-center gap-2">
            <IoPeopleOutline /> {room.capacity} {room.capacity === 1 ? "person" : "people"}
          </div>
        </div>
      </div>
      <div className="lg:col-span-1">
        <ReserveForm room={room} disabledDate={disabledDate} />
      </div>
    </div>
  );
}
