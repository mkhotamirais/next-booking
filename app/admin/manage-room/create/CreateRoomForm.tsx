"use client";

import { useState, useTransition, useActionState } from "react";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { useRef } from "react";
import { type PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { BarLoader } from "react-spinners";
import { Amenities } from "@/lib/generated/prisma";
import { createRoom } from "@/actions/room";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreateRoomForm({ amenities }: { amenities: Amenities[] }) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  const handleUpload = () => {
    if (!inputFileRef.current?.files) return null;

    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.set("file", file);

    setMessage("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/upload", {
          method: "PUT",
          body: formData,
        });
        const data = await response.json();

        if (response.status !== 200) {
          setMessage(data.message);
        }
        const img = data as PutBlobResult;
        setImage(img.url);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const deleteImage = (image: string) => {
    startTransition(async () => {
      try {
        await fetch(`/api/upload?imageUrl=${image}`, {
          method: "DELETE",
        });
        setImage("");
      } catch (error) {
        console.log(error);
      }
    });
  };

  const [state, formAction, isPending] = useActionState(createRoom.bind(null, image), null);

  return (
    <form action={formAction} className="grid sm:grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={state?.values?.name as string}
            className="input"
            placeholder="Name"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500">{state?.error?.properties?.name?.errors}</span>
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            rows={4}
            id="description"
            defaultValue={state?.values?.description as string}
            className="input"
            placeholder="Description"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500">{state?.error?.properties?.description?.errors}</span>
          </div>
        </div>
        <div className="mb-4">
          <p>Amenites</p>
          <div className="grid grid-cols-3 gap-4 border border-gray-400 rounded mt-2 p-4">
            {amenities.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="checkbox"
                  name={"amenities"}
                  defaultValue={item.id}
                  className=""
                  placeholder="room amenities"
                />
                <label htmlFor="">{item.name}</label>
              </div>
            ))}
          </div>
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500">{state?.error?.properties?.amenities?.errors}</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="input-file" className="">
          <div className="relative h-64 bg-gray-100 rounded border border-dashed flex items-center justify-center">
            <div className="p-8 flex h-full w-full py-16 cursor-pointer flex-col items-center text-center">
              {pending ? <BarLoader /> : null}
              <IoCloudUploadOutline className="size-8" />
              <p>Select Image</p>
              {message ? <p className="text-red-500">{message}</p> : <p>SVG, PNG, JPG, GIF, or Others (Max: 2MB)</p>}
            </div>
            {!image ? (
              <Input
                type="file"
                ref={inputFileRef}
                onChange={handleUpload}
                name="input-file"
                id="input-file"
                className="hidden"
              />
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() => deleteImage(image)}
                  title="Delete"
                  className="absolute top-2 right-2 z-50 p-1.5 rounded border border-gray-500"
                >
                  <IoTrashOutline className="size-8" />
                </Button>
                <Image
                  src={image}
                  alt=""
                  width={500}
                  height={500}
                  className="absolute w-full h-full object-cover object-center inset-0"
                />
              </>
            )}
          </div>
        </label>
        <div className="mb-4">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            type="text"
            name="capacity"
            id="capacity"
            defaultValue={state?.values?.capacity as string}
            className="input"
            placeholder="Capacity"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500">{state?.error?.properties?.capacity?.errors}</span>
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="price">Price</Label>
          <Input
            type="text"
            name="price"
            id="price"
            defaultValue={state?.values?.price as string}
            className="input"
            placeholder="Price"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500">{state?.error?.properties?.price?.errors}</span>
          </div>
        </div>
        {/* General Message */}
        {state?.message ? <div className="text-red-500 py-2 px-3 bg-red-100 rounded mb-2">{state.message}</div> : null}
        <Button type="submit" className="btn block w-full" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
