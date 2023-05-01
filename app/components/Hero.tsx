import { Link } from '@remix-run/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useRef } from 'react';
import Bubbles from './Bubbles';
import { BsArrowLeft, BsArrowRight, BsArrowRightCircle } from 'react-icons/bs';

interface Slide {
  pre: string,
  header: string,
  desc: string,
  cta: {
    content: string,
    url: string
  },
  image: {
    url: string,
    altText: string
  }
}

const slides: Slide[] = [
  {
    pre: "Highly Rated Cleaning",
    header: "Easy to Clean House and Office",
    desc: "We understand that every property is unique, and that's why we offer customized residential and commercial cleaning solutions to meet your specific needs. Whether you need a one-time deep clean or ongoing maintenance, we can create a cleaning plan that works for you.",
    cta: { content: "Take Services", url: "/services" },
    image: {
      url: "assets/img/hero/home-2/img-1.webp",
      altText: "A clean new home on display"
    }
  },
  {
    pre: "Greese Trap Cleaning",
    header: "Keep Your Business Safe and Sanitary",
    desc: "In addition to keeping your property looking great, we also prioritize safety and sanitation. Our expert grease trap and sidewalk pressure washing services can help prevent slips, falls, and accidents on your property. We use safe and effective techniques to ensure your property remains ",
    cta: { content: "See More", url: "/services" },
    image: {
      url: "assets/img/hero/home-2/img-3.webp",
      altText: "A clean side of a company building. This side has been pressure washed"
    }
  },
  {
    pre: "Commercial Cleaning Solution",
    header: "Say goodbye to all that dirt and grime",
    desc: "In addition to keeping your property looking great, we also prioritize safety and sanitation. Our expert grease trap and sidewalk pressure washing services can help prevent slips, falls, and accidents on your property. We use safe and effective techniques to ensure your property remains clean and hygienic for your employees and customers.",
    cta: { content: "Commercial Services", url: "/services/commercial" },
    image: {
      url: "assets/img/hero/home-2/img-2.webp",
      altText: "A grey clean home that has been cleaned"
    }
  },
]

const createSplideSlides = (slides: Slide[]) => {
  function create(slide: Slide, index: number) {
    const { pre, header, cta, desc, image } = slide
    return (
      <div className='md:pl-16 grow-0 shrink-0 basis-full' key={index}>
        <div className="md:grid md:grid-cols-2 py-8 px-4 md:gap-14">
          <div className="flex gap-4 flex-col justify-center text-white">
            <div className='flex items-center'>
              <div className="w-4 h-1 bg-yellow-300 mr-2 "></div>
              <p className="pre font-bold text-base">{pre}</p>
            </div>
            <p className="header font-bold  text-5xl leading-tight tracking-wide transition-opacity">{header}</p>
            <p className="desc ">{desc}</p>
            <div className='flex'>
              <Link to={cta.url} className="cta px-6 py-2 bg-slate-900">{cta.content}</Link>
            </div>
          </div>
          <div className='mt-10 h-[260px] relative md:max-w-sm'>
            <img className='object-fill w-full h-full' src={image.url} alt={image.altText} />
          </div>
        </div>
      </div>
    )
  }
  return slides.map((slide, index) => create(slide, index))
}

const SplideSlides = createSplideSlides(slides)

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])
  return (
    <div className='relative pt-[100px] overflow-hidden md:pb-[100px]'>
      <div className='overflow-hidden' ref={emblaRef} aria-label='Our Sales Pitches'>
        <div className="flex">
          {SplideSlides}
        </div>
      </div>
      <div className='hidden md:absolute top-1/3 md:flex flex-col gap-4'>
        <button className="z-10 bg-blue-400 p-6 hover: scale-105 cursor-pointer" onClick={scrollPrev}><BsArrowLeft /></button>
        <button className="z-10 bg-blue-400 p-6 hover: scale-105 cursor-pointer" onClick={scrollNext}><BsArrowRight /></button>
      </div>
      <Bubbles />
    </div>
  );
};