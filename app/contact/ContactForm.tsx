"use client";

import { contactMessage } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(contactMessage, null);

  return (
    <>
      {state?.message ? (
        <div className="text-green-500 py-2 px-3 bg-green-100 rounded mb-2">{state.message}</div>
      ) : null}
      <form action={formAction} className="w-full space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Input name="name" defaultValue={state?.values?.name as string} placeholder="Name" className="input" />
            <div aria-live="polite" aria-atomic="true" className="text-xs text-red-500">
              {state?.error?.properties?.name?.errors}
            </div>
          </div>
          <div>
            <Input
              type="email"
              name="email"
              defaultValue={state?.values?.email as string}
              placeholder="example@email.com"
              className="input"
            />
            <div aria-live="polite" aria-atomic="true" className="text-xs text-red-500">
              {state?.error?.properties?.email?.errors}
            </div>
          </div>
        </div>
        <div>
          <Input
            type="text"
            name="subject"
            defaultValue={state?.values?.subject as string}
            placeholder="subject"
            className="input"
          />
          <div aria-live="polite" aria-atomic="true" className="text-xs text-red-500">
            {state?.error?.properties?.subject?.errors}
          </div>
        </div>
        <div>
          <Textarea
            placeholder="message"
            defaultValue={state?.values?.message as string}
            name="message"
            rows={5}
            className="input"
          ></Textarea>
          <div aria-live="polite" aria-atomic="true" className="text-xs text-red-500">
            {state?.error?.properties?.message?.errors}
          </div>
        </div>
        <Button type="submit" className="btn" disabled={isPending}>
          {isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </>
  );
}
