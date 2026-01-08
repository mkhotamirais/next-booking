"use client";

import React from "react";
import Logo from "../Logo";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

export default function Header() {
  return (
    <header className="sticky top-0 h-16 bg-white border-b border-gray-300">
      <div className="container flex items-center justify-between">
        <Logo />
        <div>
          <NavDesktop />
          <NavMobile />
        </div>
      </div>
    </header>
  );
}
