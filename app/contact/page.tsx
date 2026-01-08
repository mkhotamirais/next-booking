import { Metadata } from "next";
import React from "react";
import { IoMailOutline, IoLocationOutline, IoCallOutline } from "react-icons/io5";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <>
      <section className="bg-gray-100 py-12">
        <div className="container text-center">
          <h1 className="h1">Contact</h1>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </section>
      <section className="py-12">
        <div className="container grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="h3">Contact Us</h3>
              <h2 className="h2">Get In Touch Today</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas voluptate doloremque fuga.</p>
            </div>
            <div className="flex items-center gap-4 my-4">
              <div className="p-2.5 bg-gray-200 rounded">
                <IoMailOutline className="text-xl" />
              </div>
              <div className="flex flex-col">
                <b>Email:</b>
                <span>example@email.com</span>
              </div>
            </div>
            <div className="flex items-center gap-4 my-4">
              <div className="p-2.5 bg-gray-200 rounded">
                <IoCallOutline className="text-xl" />
              </div>
              <div className="flex flex-col">
                <b>Phone Number:</b>
                <span>+62 123 456 789</span>
              </div>
            </div>
            <div className="flex items-center gap-4 my-4">
              <div className="p-2.5 bg-gray-200 rounded">
                <IoLocationOutline className="text-xl" />
              </div>
              <div className="flex flex-col">
                <b>Address:</b>
                <span>Jl. Raya, Jakarta</span>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
