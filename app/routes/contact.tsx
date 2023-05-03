import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BsEnvelope, BsPhone } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { getBusinessById, getIdForFirstBusiness } from "~/models/business.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const firstBusinessId = await getIdForFirstBusiness().then(res => res.businessID)
  const business = await getBusinessById(firstBusinessId).then(res => res.business)
  return json({ business });
};

export default function Contact() {
  const { business } = useLoaderData()
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
    </>
  );
};