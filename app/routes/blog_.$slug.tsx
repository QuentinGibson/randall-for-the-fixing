import { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { BsArrowRight } from "react-icons/bs";
import invariant from "tiny-invariant";
import { getBlogBySlug } from "~/models/blog.server";
import { getAllServices } from "~/models/service.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const slug = params.slug
  invariant(slug, 'slug is required')
  const blog = await getBlogBySlug(slug).then((blog) => blog.blog)
  const services = await getAllServices()
  if (!blog) {
    throw new Error('Blog not found')
  }
  return { blog, services }
};
export default function ComponentName() {
  const { blog, services } = useLoaderData<typeof loader>()
  return (
    <>
      <section>
        <section className="pt-28 pb-20 w-full relative" style={{ background: "url('/assets/svg/surf-background.svg') no-repeat center center / cover" }}>
          <div className="flex justify-center items-center">
            <h1 className="text-white font-bold text-4xl">Blog</h1>
          </div>
        </section>
        <section className="">
          <div className="grid grid-cols-[2fr_1fr]">
            <div className="flex flex-col">
              <img className="h-[330px] object-fill w-full aspect-[3/2]" src={blog.image} alt="" />
              <div dangerouslySetInnerHTML={{ __html: blog.blogBody }}>
              </div>

            </div>
            <div className="flex flex-col">
              <div className="bg-gray-100 px-6 py-12 flex flex-col">
                <h3 className="mb-10 text-xl font-bold py-4 px-6">Our Services</h3>
                <ul className="flex flex-col gap-10">
                  {services.map((service) => (
                    <li className="w-full">
                      <Link prefetch="intent" className="text-small w-full py-5 inline-flex bg-white text-gray-700 items-center" to={`/services/${service.slug}`}><BsArrowRight className="mx-4" />{service.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};