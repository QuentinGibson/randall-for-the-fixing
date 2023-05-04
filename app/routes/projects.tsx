import { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { BsArrowRight } from "react-icons/bs";
import { getProjects } from "~/models/project.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const projects = await getProjects()
  return { projects }
};
export default function Projects() {
  const { projects } = useLoaderData<typeof loader>();
  return (
    <>
      <section className="mt-[100px] pt-28 pb-20 w-full relative" style={{ background: "url('/assets/svg/surf-background.svg') no-repeat center center / cover" }}>
        <div className="flex justify-center items-center">
          <h1 className="text-white font-bold text-4xl">Projects</h1>
        </div>
      </section>
      <section className="my-24">
        <div className="grid grid-cols-4 gap-10">
          {projects.map((project) => (
            <div className="flex flex-col border-gray-300 border rounded-lg">
              <Link to={`/projects/${project.slug}`}>
                <img className="h-48 object-cover" src={project.image} alt="" />
              </Link>
              <div className="flex flex-col gap-4 px-4 p-3 break-all">
                <h2 className="text-gray-700 uppercase text-xl font-bold">{project.title}</h2>
                <div className="flex flex-col">
                  <p className="text-gray-500">{project.service.title}</p>
                  <p className="text-gray-500">{project.service.type.name}</p>
                </div>
                <div className="flex">
                  <Link to={`/projects/${project.slug}`} className="flex gap-2 items-center">See more<BsArrowRight /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};