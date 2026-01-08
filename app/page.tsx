import Card from "@/components/Card";
import Main from "@/components/Main";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="container">
      {/* hero */}
      <section className="flex flex-col justify-center items-center py-8">
        <h1>Home hero title</h1>
        <p>Home hero description</p>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/rooms">Rooms</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </section>
      {/* main */}
      <section>
        <h2>Room and Rates</h2>
        <Main />
      </section>
    </div>
  );
}
