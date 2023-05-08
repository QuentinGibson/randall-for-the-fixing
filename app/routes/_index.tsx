import { LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Hero from "~/components/Hero";
import QuoteForm from "../components/QuoteForm";
import { getAllServices } from "~/models/service.server";
import Badges from "~/components/Badges";
import { BsArrowRight, BsArrowUpRight, BsAward } from "react-icons/bs";
import useEmblaCarousel from "embla-carousel-react";
import { getProjects } from "~/models/project.server";
import { getTestimonies } from "~/models/testimony.server";
import { getBlogs } from "~/models/blog.server";

export const meta: V2_MetaFunction = () => [{ title: "Randall's for the Fixing" }];

function trim(string: string, amount: number) {
  if (string.length <= amount) return string
  return string.slice(0, amount) + '...'
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const services = await getAllServices();
  const projects = await getProjects();
  const testimonials = await getTestimonies().then(testimonies => testimonies.testimonies);
  const blog = await getBlogs().then(blogs => blogs.blogs);
  return json({ services, projects, testimonials, blog })
};
export default function Index() {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const [projectEmblaRef] = useEmblaCarousel({ loop: true });
  const [testimonyEmblaRef] = useEmblaCarousel({ loop: true });
  const [blogEmblaRef] = useEmblaCarousel({ loop: true });
  const { services, projects, testimonials, blog } = useLoaderData<typeof loader>()
  return (
    <>
      <Hero />
      <div className="px-8 py-24 md:flex md:justify-evenly">
        <QuoteForm services={services} />
        <Badges />
      </div>
      <section className="bg-blue-200 py-24 px-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col gap-3">
            <div className="flex">
              <div className="bg-gradient-to-r from-yellow-400 to-transparent text-sm py-2 pl-6 pr-6 blue-block relative">
                <p className="font-bold tracking-wide text-sm">About Our Company</p>
              </div>
            </div>
            <h3 className="font-bold text-xl md:text-4xl uppercase">Great Service at Unbelievable Prices</h3>
            <p className="text-base text-gray-600">We pressure wash and clean tough spots and grime until they vanish.</p>
            <div className="w-24 h-24 rounded-full bg-white shadow hover:shadow-lg transform hover:translate-y-1 transition duration-300 flex items-center justify-center">
              <BsAward className="w-10 h-10 rounded" />
            </div>
            <p className="font-bold text-2xl">Award Winning</p>
            <div className="flex">
              <Link className="flex items-center bg-yellow-400 px-10 py-4" to={`/services/`}>Our Services<BsArrowRight className="ml-1" /></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 relative">
            <div className="bg-gray-200 h-full"><img src="assets/img/about/home-2/img-1.webp" className="`h-full object-fill" alt="A dirty concert driveway" /></div>
            <div className="bg-gray-200 h-full"><img src="assets/img/about/home-2/img-2.webp" className="h-full object-fill" alt="A clean version of the dirty driveway" /></div>
            <div className="bg-gray-400 h-full col-span-2"><img src="assets/img/about/home-2/img-3.webp" className="h-full object-fill" alt="" /></div>
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
          <h3 className="font-bold text-3xl uppercase">What we offer</h3>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {services.map(service => {
                const { image, id } = service
                return (
                  <div className="grow-0 shrink-0 basis-full md:basis-[380px] md:grow md:mr-8" key={id}>
                    <div className="bg-gray-200 text-black">
                      <div className="pb-8 flex flex-col gap-4">
                        <div className="relative">
                          <div className="h-[220px] w-full relative flex flex-col gap-4">
                            <Link to={`/services/${service.slug}`}>
                              <img src={image} alt="" className="w-full object-fill h-[200px]" />
                            </Link>
                          </div>
                        </div>
                        <div className="flex px-4 flex-col gap-2">
                          <h4 className=" font-bold text-xl">{service.title}</h4>
                          <p className="basis-[80px]">{trim(service.subtext, 80)}</p>
                          <div className="flex">
                            <Link to={`/services/${service.slug}`} className="py-1 px-3 bg-blue-800 flex items-center text-white">See More<BsArrowRight className="ml-2" /></Link>
                          </div>
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
        <div className="flex flex-col gap-10">
          <div className="flex">
            <div className="bg-gradient-to-r from-yellow-400 to-transparent text-sm py-2 pl-6 pr-6 blue-block relative">
              <p className="font-bold tracking-wide text-sm">Our Portfolio</p>
            </div>
          </div>
          <h3 className="text-3xl font-bold uppercase">Recent Work Showcase</h3>
          <section className="overflow-hidden" ref={projectEmblaRef}>
            <div className="flex">
              {projects.map(project => (
                <div className="grow-0 shrink-0 basis-full mr-8 md:basis-[600px] h-[300px] relative" key={project.id}>
                  <div className=" w-full h-full">
                    <img className="w-full h-full object-fill" src={project.image} alt="" />
                    <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-t from-blue-500 to-transparent flex items-end px-6 py-4">
                      <div className="w-full">
                        <div className="flex justify-between gap-6">
                          <div className="flex flex-col break-all select-none">
                            <Link to={`/projects/${project.slug}`}>
                              <p className="text-white text-xl font-bold uppercase">
                                {project.title}
                              </p>
                              <p className="text-yellow-500">
                                {project.serviceId}
                              </p>
                            </Link>
                          </div>
                          <div className="flex items-center">
                            <Link to={`/projects/${project.slug}`} className="h-[70px] appearance-none bg-yellow-300 w-16 flex justify-center items-center"><BsArrowUpRight className="text-4xl" /></Link>
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
      <section className="px-8 py-24">
        {/* <Fact /> */}
      </section>
      <section>
        <div className="flex flex-col gap-8 px-8 py-24 bg-gradient-to-t from-yellow-400 to-transparent">
          <div className="flex">
            <div className="bg-gradient-to-r from-yellow-400 to-transparent text-sm py-2 pl-6 pr-6 blue-block relative">
              <p className="font-bold tracking-wide text-sm">Our Testimonials</p>
            </div>
          </div>
          <h3 className="font-bold text-3xl uppercase">Our Happy Customers</h3>
          <div className="overflow-hidden" ref={testimonyEmblaRef}>
            <div className="flex">
              {testimonials.map(testimonial => {
                const { name, testimonyBody, id } = testimonial
                return (
                  <div className="flex flex-col gap-8 grow-0 shrink-0 basis-full bg-white px-8 py-9 rounded-md mr-10 md:basis-[500px] relative" key={id}>
                    <img src="/assets/img/testimonial/home-2/shape.png" className="absolute top-0 right-2/4" alt="" />
                    <p className="text-blue-700 text-lg font-bold uppercase">{name}</p>
                    <p className="font-bold">"{testimonyBody}"</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="px-8 py-24">
        <div className="flex flex-col items-center gap-8">
          <div className="flex">
            <div className="bg-gradient-to-r from-yellow-400 to-transparent text-sm py-2 pl-6 pr-6 blue-block relative">
              <p className="font-bold tracking-wide text-sm uppercase">Latest News</p>
            </div>
          </div>
          <h3 className="font-bold text-3xl uppercase text-center mt-12">Latest Blog and Article</h3>
          <div className="grid md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr] gap-4">
            <div className="p-8 bg-gray-100">
              <div className="h-full flex flex-col justify-evenly py-8 px-8" style={{ background: "url('/assets/svg/blob-background.svg') repeat center center / 50px" }}>
                <p className="bg-black px-4 py-2 font-bold text-white text-2xl">Get Started With Your Free Estimate.</p>
                <div className="flex justify-center items-center">
                  <Link className="bg-yellow-400 py-2 px-4 flex gap-2" to={`/services`}>Get Started Now <BsArrowRight /></Link>
                </div>
              </div>
            </div>
            <div className="overflow-hidden w-full" ref={blogEmblaRef}>
              <div className="flex">
                {/* //TODO: Add blog posts here */}
                {blog.map(post => {
                  const { updatedAt, id } = post
                  const date = new Date(updatedAt)
                  const day = date.getDate()
                  // get the month as a string
                  const month = date.toLocaleString('default', { month: 'long' })
                  return (
                    <div className="flex flex-col grow-0 shrink-0 basis-full max-w-full md:basis-[600px] mr-6" key={id}>
                      <Link to={`/blog/${post.slug}`} className="basis-[400px]">
                        <img src={post.image} className="w-full h-full object-fill aspect-[3/2]" alt="" />
                      </Link>
                      <div className="bg-gray-100 flex flex-col gap-4 py-8 px-4 relative">
                        <div className="relative top-[-70px] flex justify-center">
                          <div className="bg-blue-800 w-[90px] flex flex-col text-white justify-center items-center ">
                            <p className="text-4xl font-bold">{day}</p>
                            <p className="text-lg uppercase ">{month}</p>
                          </div>
                        </div>
                        <p className="font-bold uppercase text-lg text-center">{trim(post.title, 40)}</p>
                        <Link to={`/blog/${post.slug}`} className="px-6 py-3 bg-yellow-400 flex items-center mx-auto">Read More <BsArrowRight className="ml-2" /></Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
