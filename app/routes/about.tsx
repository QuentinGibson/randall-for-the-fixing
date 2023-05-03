import useEmblaCarousel from "embla-carousel-react/"
const badges = [
  {
    url: 'assets/img/brand/home-2/img-1.webp',
  },
  {
    url: 'assets/img/brand/home-2/img-2.webp',
  },
  {
    url: 'assets/img/brand/home-2/img-3.webp',
  }, {
    url: 'assets/img/brand/home-2/img-4.webp',
  }, {
    url: 'assets/img/brand/home-2/img-5.webp',
  },

]
export default function AboutRoute() {
  const [brandRef, brandApi] = useEmblaCarousel({ loop: true })
  return (
    <>
      <section className="mt-[100px] pt-28 pb-20 w-full relative" style={{ background: "url('/assets/svg/surf-background.svg') no-repeat center center / cover" }}>
        <div className="flex justify-center items-center">
          <h1 className="text-white font-bold text-4xl">About</h1>

        </div>
      </section>
      <section className="px-8">
        <div className="grid lg:grid-cols-[300px_300px_1fr] gap-10 my-20">
          <img src="/assets/img/about/img-1.webp" alt="" />
          <img src="/assets/img/about/img-3.webp" alt="" />
          <div className="flex flex-col gap-10">
            <div className="flex">
              <div className="bg-gradient-to-r from-yellow-400 to-transparent text-sm py-2 pl-6 pr-6 blue-block relative">
                <p className=" font-bold uppercase">About our Company</p>
              </div>
            </div>
            <h2 className="font-bold text-4xl">Transform Your Property With Professional Pressure Washing Services By Experienced Team Members.</h2>
            <p className="text-gray-700 text-xl">Revitalize Your Property with Top-Quality Pressure Washing Services - Trusted by Industry Professionals Since Day One! We use state-of-the-art equipment and eco-friendly cleaning products to ensure that your property is not only clean, but also safe for your family, pets, and the environment.  </p>
          </div>
        </div>
      </section>
    </>
  );
};