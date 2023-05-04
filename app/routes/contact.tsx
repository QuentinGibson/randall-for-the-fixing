import { LoaderArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { BsEnvelope, BsPhone } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { getBusinessById, getIdForFirstBusiness } from "~/models/business.server";
import { getAllServices } from "~/models/service.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const firstBusinessId = await getIdForFirstBusiness().then(res => res.businessID)
  const business = await getBusinessById(firstBusinessId).then(res => res.business)
  const services = await getAllServices()
  return json({ business, services });
};

export default function Contact() {
  const { business, services } = useLoaderData<typeof loader>()
  return (
    <>
      <section className="mt-[100px] pt-28 pb-20 w-full relative" style={{ background: "url('/assets/svg/surf-background.svg') no-repeat center center / cover" }}>
        <div className="flex justify-center items-center">
          <h1 className="text-white font-bold text-4xl">Contact</h1>
        </div>
      </section>
      <section className="py-24">
        <div className="grid grid-cols-3 justify-items-center max-w-screen-xl mx-auto">
          <div className="flex items-center">
            <BsPhone className="text-4xl text-blue-500" />
            {business.phone}
          </div>
          <div className="flex items-center">
            <FaRegAddressBook className="text-4xl text-blue-500" />
            {business.address}
          </div>
          <div className="flex items-center break-all">
            <BsEnvelope className="text-4xl text-blue-500" />
            {business.email}
          </div>
        </div>
      </section>
      <section className="py-12 flex justify-center items-center">
        <div className="py-3 px-4 max-w-full w-[500px] bg-blue-800">
          <Form className="flex flex-col gap-1">
            <label className="uppercase text-white" htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Full Name:" className="py-3 px-2" />
            <label className="uppercase text-white" htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email Address:" className="py-3 px-2" />
            <label className="uppercase text-white" htmlFor="service">Service</label>
            <select name="service" id="service" className="py-3 px-2">
              <option value="Choose One:">Choose One:</option>
              {services.map((service, index) => (
                <option key={index} value={service.title}>{service.title}</option>
              ))}
            </select>
            <label className="uppercase text-white" htmlFor="message">Message</label>
            <textarea name="message" id="message" className="h-28 resize-none py-3 px-2"></textarea>
          </Form>
        </div>
      </section>
    </>
  );
};