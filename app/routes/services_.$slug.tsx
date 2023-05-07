import { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllServices, getServiceBySlug } from "~/models/service.server";
import invariant from 'tiny-invariant';
import { BsArrowRight } from "react-icons/bs";


export const loader = async ({ request, params }: LoaderArgs) => {
  const { slug } = params;
  invariant(slug, 'slug is required')
  const serviceResponse = await getServiceBySlug(slug)
  const { service } = serviceResponse
  const services = await getAllServices();
  return { service, services }
};

export default function SingleService() {
  const { service, services } = useLoaderData<typeof loader>();
  return (
    <>
      <section className="mt-[100px] pt-28 pb-20 w-full relative" style={{ background: "url('/assets/svg/surf-background.svg') no-repeat center center / cover" }}>
        <div className="flex justify-center items-center">
          <h1 className="text-white font-bold text-4xl">{service.title}</h1>
        </div>
      </section>
      <section className="my-24 px-4">
        <div className="md:px-16">
          <div className="grid md:grid-cols-[2fr_1fr] gap-16">
            <div className="flex flex-col">
              <img className="h-[330px] object-cover" src={service.image} alt="" />
              <div className="flex flex-col my-4">
                <h2 className="text-gray-700 text-4xl my-4 font-bold">{service.title}</h2>
                <p className="text-gray-500 ">{service.serviceDescription}</p>
              </div>
              <div className="flex flex-col my-4">
                <h2 className="text-gray-700 text-4xl my-4 font-bold">{service.title} Overview</h2>
                <p className="text-gray-500 ">{service.serviceFiller}</p>
              </div>
              <div className="flex flex-col my-4">
                <h2 className="text-gray-700 text-4xl my-4 font-bold">How to get started</h2>
                <p className="text-gray-500">{service.serviceCta}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="bg-gray-100 px-6 py-12 flex flex-col">
                <h3 className="mb-10 text-xl font-bold py-4 px-6">Our Services</h3>
                <ul className="flex flex-col gap-10">
                  {services.map((service) => (
                    <li className="w-full">
                      <Link className="text-small w-full py-5 inline-flex bg-white text-gray-700 items-center" to={`/services/${service.slug}`}><BsArrowRight className="mx-4" />{service.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

      </section>
    </>
  );
};