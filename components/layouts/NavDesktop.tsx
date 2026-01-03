import React from "react";
import { mainMenu as m } from "@/lib/content";
import { Button } from "../ui/button";
import Link from "next/link";

export default function NavDesktop() {
  return (
    <nav className="hidden lg:flex">
      {m.map((item, i) => (
        <Button key={i} asChild variant={item.label === "Sign In" ? "default" : "ghost"}>
          <Link href={item.url}>{item.label}</Link>
        </Button>
      ))}
    </nav>
  );
}
