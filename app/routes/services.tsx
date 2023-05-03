import { LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { BsArrowRight } from "react-icons/bs";
import { getAllServices } from "~/models/service.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const services = await getAllServices()
  return json({ services })
};
export default function ServiceRoute() {
  const { services } = useLoaderData<typeof loader>()
  return (
    <>
      <section className="mt-[100px] pt-28 pb-20 w-full relative" style={{ background: "url('/assets/svg/surf-background.svg') no-repeat center center / cover" }}>
        <div className="flex justify-center items-center">
          <h1 className="text-white font-bold text-4xl">Services</h1>
        </div>
      </section>
      <section className="my-24 px-10">
        <div className="grid grid-cols-4 gap-12">
          {services.map((service) => (
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col hover:scale-105 transition duration-150" key={service.id}>
              <Link to={service.slug} >
                <img className="rounded-t-lg h-48 object-cover w-full" src={service.image} />
              </Link>
              <div key={service.id} className="flex flex-col  justify-center gap-4 px-4 py-3">
                <h1 className="text-xl font-bold uppercase">{service.title}</h1>
                <p className="font-normal">{service.subtext}</p>
                <Link to={service.slug} className="inline-flex items-center gap-2">See more <BsArrowRight /></Link>
              </div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
};