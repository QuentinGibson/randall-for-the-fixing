import { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getAllServices } from "~/models/service.server";
import { BsArrowDown, BsArrowRight, BsCaretDown, BsCaretDownFill } from 'react-icons/bs'

export default function QuoteForm({ services }: { services: any[] }) {
  return (
    <section id="QuoteForm" className="flex flex-col bg-blue-200">
      <div className="px-6 py-16">
        <div className="flex flex-col">
          <div className="flex">
            <div className="bg-blue-800 text-white font-bold px-6 py-2 relative yellow-block uppercase text-sm tracking-wide">Get a free qoute</div>
          </div>
          <p className="uppercase text-3xl font-bold tracking-wide my-4">Get a Free Quote</p>
          <Form method="POST">
            <input className="w-full mt-2 px-2 py-3 bg-white border border-gray-300 rounded" placeholder="Full Name:" type="text" name="name" id="full_name" />
            <input className="w-full mt-2 px-2 py-3 bg-white border border-gray-300 rounded" placeholder="Email Address:" type="email" name="email" id="email_address" />
            <div className="relative mt-2 ">
              <select className="w-full px-2 py-3 appearance-none bg-white border border-gray-300 rounded" name="service" id="services">
                <option value="Choose a Service:">Choose a Service:</option>
                {services.map(service => <option value={service.title}>{service.title}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <BsCaretDownFill />
              </div>
            </div>
            <textarea className="w-full mt-2 px-2 py-3" placeholder="Write a message" name="message" id="message"></textarea>
            <button className="flex items-center bg-slate-900 text-white py-2 px-2 mt-4">Submit Now<BsArrowRight className="ml-1" /></button>
          </Form>
        </div>
      </div>
    </section>

  );
};