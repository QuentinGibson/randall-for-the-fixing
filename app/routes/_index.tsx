import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import QuoteForm from "../components/QuoteForm";
import { getAllServices } from "~/models/service.server";
import Badges from "~/components/Badges";
import { BsArrowRight, BsArrowUpRight, BsAward } from "react-icons/bs";
import useEmblaCarousel from "embla-carousel-react";
import { getProjects } from "~/models/project.server";

export const meta: V2_MetaFunction = () => [{ title: "Randall's for the Fixing" }];


export const loader = async ({ request, params }: LoaderArgs) => {
  const services = await getAllServices();
  const projects = await getProjects();
  return { services, projects }
};
export default function Index() {
  const [emblaRef] = useEmblaCarousel();
  const [projectEmblaRef] = useEmblaCarousel();
  const { services, projects } = useLoaderData<typeof loader>()
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
      <section className="py-24 px-8">
        <div className="flex flex-col justify-center gap-8">
          <div className="flex">
            <div className="bg-gradient-to-r from-yellow-400 to-transparent text-sm py-2 pl-6 pr-6 blue-block relative">
              <p className="font-bold tracking-wide text-sm">Featured Services</p>
            </div>
          </div>
          <h3 className="font-bold text-5xl">What we offer</h3>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {services.map(service => {
                const { image } = service
                return (
                  <div className="grow-0 shrink-0 basis-full">
                    <div className="bg-gray-100 text-black">
                      <div className="px-4 pb-8 py-4 flex flex-col gap-8">
                        <div className="relative">
                          <div className="h-[220px] w-full relative">
                            <img src={image} alt="" className="h-full w-full object-fill" />
                            <div className="relative bottom-12 w-full flex justify-center">
                              <div className="w-24 h-24 rounded-full bg-white shadow hover:shadow-lg transform hover:translate-y-1 transition duration-300 flex items-center justify-center text-black">
                                <BsAward className="w-10 h-10 rounded" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <h4 className="mt-12 font-bold text-xl">{service.title}</h4>
                        <p>{service.serviceDescription}</p>
                        <div className="flex">
                          <button className="py-3 px-4 bg-slate-200 flex items-center text-black">Details<BsArrowRight className="ml-2" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-8">
        <div className="flex flex-col gap-8">
          <div className="flex">
            <div className="bg-gradient-to-r from-yellow-400 to-transparent text-sm py-2 pl-6 pr-6 blue-block relative">
              <p className="font-bold tracking-wide text-sm">Our Portfolio</p>
            </div>
          </div>
          <h3 className="text-3xl font-bold uppercase">Recent Work Showcase</h3>
          <section className="overflow-hidden h-[360px]" ref={projectEmblaRef}>
            <div className="flex">
              {projects.map(project => (
                <div className="grow-0 shrink-0 basis-full mr-8">
                  <div className="relative w-full h-full">
                    <img className="w-full h-full object-fill" src={project.image} alt="" />
                    <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-t from-blue-500 to-transparent flex items-end px-6 py-4">
                      <div className="w-full">
                        <div className="flex justify-between">
                          <div className="flex flex-col">
                            <p className="text-white text-xl font-bold uppercase">
                              {project.title}
                            </p>
                            <p className="text-yellow-500">
                              {project.serviceId}
                            </p>
                          </div>
                          <div className="flex">
                            <div className="bg-yellow-300 w-16 flex justify-center items-center"><BsArrowUpRight className="text-4xl" /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </section>
        </div>
      </section>
    </>
  );
}
