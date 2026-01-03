import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { mainMenu as m } from "@/lib/content";
import Link from "next/link";

export default function NavMobile() {
  return (
    <div className="block lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="px-2">
            {m.map((item, i) => (
              <SheetClose key={i} asChild>
                <Button
                  variant={item.label === "Sign In" ? "default" : "ghost"}
                  asChild
                  className={`block ${item.label === "Sign In" ? "mt-4" : ""}`}
                >
                  <Link href={item.url}>{item.label}</Link>
                </Button>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
