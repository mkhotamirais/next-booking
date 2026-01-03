import { Button } from "@/components/ui/button";
import React from "react";
import { FaG } from "react-icons/fa6";
import SigninGoogle from "./SigninGoogle";

export default function Signin() {
  return (
    <div className="container flex items-center justify-center h-80">
      <div className="border w-72 rounded p-4">
        <h1>Sign In</h1>
        <SigninGoogle />
      </div>
    </div>
  );
}
