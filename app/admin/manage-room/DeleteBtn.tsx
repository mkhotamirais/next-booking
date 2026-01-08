import { deleteRoom } from "@/actions/room";
import { IoTrashOutline } from "react-icons/io5";

export default function DeleteBtn({ id, image }: { id: string; image: string }) {
  const handleDelete = deleteRoom.bind(null, id, image);
  return (
    <form action={handleDelete}>
      <button type="submit" aria-label="Delete" className="text-red-500 p-2 border rounded">
        <IoTrashOutline />
      </button>
    </form>
  );
}
