import Image from "next/image";
import React from "react";

export default function Card() {
  return (
    <div className="border p-3 rounded">
      <Image src="/globe.svg" alt="logo" width={400} height={400} />
      <h4>Title</h4>
      <p>Price / night</p>
      <div>
        <div>2 people</div>
        <div>book now</div>
      </div>
    </div>
  );
}
