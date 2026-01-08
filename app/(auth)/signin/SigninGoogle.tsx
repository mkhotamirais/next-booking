import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { FaG } from "react-icons/fa6";

export default function SigninGoogle({ redirectUrl }: { redirectUrl: string }) {
  console.log(redirectUrl);
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: `/${redirectUrl}` });
      }}
    >
      <Button className="flex items-center gap-1">
        <FaG />
        Sign in with google
      </Button>
    </form>
  );
}
