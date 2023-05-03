import { json } from "@remix-run/node";
import { getAllServices } from "~/models/service.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const services = await getAllServices()
  return json({ services })
};
export default function ServiceRoute() {
  return (
    <>
      <section className="mt-[100px] pt-28 pb-20 w-full relative" style={{ background: "url('/assets/svg/surf-background.svg') no-repeat center center / cover" }}>
        <div className="flex justify-center items-center">
          <h1 className="text-white font-bold text-4xl">Services</h1>
        </div>
      </section>
    </>
  );
};