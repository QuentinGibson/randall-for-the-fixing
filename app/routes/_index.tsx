import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import QuoteForm from "../components/QuoteForm";
import { getAllServices } from "~/models/service.server";
import Badges from "~/components/Badges";
import { BsArrowRight, BsAward, BsAwardFill } from "react-icons/bs";

export const meta: V2_MetaFunction = () => [{ title: "Randall's for the Fixing" }];


export const loader = async ({ request, params }: LoaderArgs) => {
  const services = await getAllServices()
  return { services }
};
export default function Index() {
  const { services } = useLoaderData<typeof loader>()
  return (
    <>
      <Header />
      <Hero />
      <div className="px-8 py-24">
        <QuoteForm services={services} />
        <Badges />
      </div>
      <section className="bg-blue-200 py-24 px-8">
        <div className="flex flex-col gap-8">
          <div className="flex">
            <div className="bg-gradient-to-r from-yellow-400 to-transparent text-sm py-2 pl-6 pr-6 blue-block relative">
              <p className="font-bold tracking-wide text-sm">About Our Company</p>
            </div>
          </div>
          <h3 className="font-bold text-5xl">Great Service at Unbelievable Prices</h3>
          <p className="text-base text-gray-600">We pressure wash and clean tough spots and grime until they vanish.</p>
          <div className="w-24 h-24 rounded-full bg-white shadow hover:shadow-lg transform hover:translate-y-1 transition duration-300 flex items-center justify-center">
            <BsAward className="w-10 h-10 rounded" />
          </div>
          <p className="font-bold text-2xl">Award Winning</p>
          <div>
            <button className="flex items-center bg-yellow-400 px-10 py-4">Our Services<BsArrowRight className="ml-1" /></button>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="bg-gray-200 h-full"><img src="assets/img/about/home-2/img-1.webp" className="h-[200px]" alt="A dirty concert driveway" /></div>
            <div className="bg-gray-200 h-full"><img src="assets/img/about/home-2/img-2.webp" className="h-[200px]" alt="A clean version of the dirty driveway" /></div>
            <div className="bg-gray-400 h-full col-span-2"><img src="assets/img/about/home-2/img-3.webp" className="h-[200px]" alt="" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
