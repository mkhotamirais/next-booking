import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaG } from "react-icons/fa6";

export default function SigninGoogle() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="flex items-center gap-1">
        <FaG />
        Sign in with google
      </Button>
    </form>
  );
}
