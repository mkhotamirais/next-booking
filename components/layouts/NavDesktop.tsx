"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import useNavMenu from "./useNavMenu";
import Logout from "./Logout";

export default function NavDesktop() {
  const { menu, status } = useNavMenu();

  if (status === "loading") return null;

  return (
    <nav className="hidden lg:flex">
      {menu.map((item, i) => (
        <Button key={i} asChild variant={item.label === "Sign In" ? "default" : "ghost"}>
          <Link href={item.url}>{item.label}</Link>
        </Button>
      ))}
      <Logout />
    </nav>
  );
}
