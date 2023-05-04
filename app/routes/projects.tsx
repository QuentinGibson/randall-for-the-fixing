import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
            <div className="flex flex-col">
              <img className="h-[330px] object-cover" src={project.image} alt="" />
              <div className="flex flex-col my-4">
                <h2 className="text-gray-700 text-4xl my-4 font-bold">{project.title}</h2>
                <p className="text-gray-500 ">{project.service.type.name}</p>
                <p className="text-gray-500 ">{project.service.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};