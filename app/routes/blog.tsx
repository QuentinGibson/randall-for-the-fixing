import { Link, useLoaderData } from "@remix-run/react";
import { getBlogs } from "../models/blog.server";
import { LoaderArgs } from "@remix-run/node";
import { getAllServices } from "~/models/service.server";
import { BsArrowRight } from "react-icons/bs";

export const loader = async ({ request, params }: LoaderArgs) => {
  const blog = await getBlogs().then(res => res.blogs)
  const services = await getAllServices()
  return { blog, services }
};

function trim(str: string) {
  return str.length > 300 ? str.substring(0, 300) + "..." : str
}

export default function BlogRoute() {
  const { blog, services } = useLoaderData<typeof loader>()

  return (
    <section className="my-[100px]">
      <section className="pt-28 pb-20 w-full relative" style={{ background: "url('/assets/svg/surf-background.svg') no-repeat center center / cover" }}>
        <div className="flex justify-center items-center">
          <h1 className="text-white font-bold text-4xl">Blog</h1>
        </div>
      </section>
      <div className="grid grid-cols-[2fr_1fr] px-8 gap-10 py-12">
        <div className="flex flex-col gap-24">
          {blog.map((blog, index) => (
            <div key={index} className="flex flex-col w-full border">
              <Link prefetch="intent" to={`/blog/${blog.slug}`} className="flex">
                <img className="object-full w-full aspect-[3/2] h-[300px]" src={blog.image} alt="" />
              </Link>
              <div className="px-4 py-6">
                <Link to={`/blog/${blog.slug}`}>
                  <h2 className="font-bold text-xl hover:text-blue-500">{blog.title}</h2>
                  <p className="text-sm mt-2">{trim(blog.blogBody)}</p>
                </Link>
              </div>
            </div>
          ))}
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
    </section>

  );
};