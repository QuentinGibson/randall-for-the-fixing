import { Link } from '@remix-run/react';
import { Splide, SplideSlide } from '@splidejs/react-splide';


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
      url: "assets/img/hero-2/img-1.webp",
      altText: "A clean new home on display"
    }
  },
  {
    pre: "Commercial Cleaning Solution",
    header: "Say goodbye to dirt and grime",
    desc: "In addition to keeping your property looking great, we also prioritize safety and sanitation. Our expert grease trap and sidewalk pressure washing services can help prevent slips, falls, and accidents on your property. We use safe and effective techniques to ensure your property remains clean and hygienic for your employees and customers.",
    cta: { content: "Commercial Services", url: "/services/commercial" },
    image: {
      url: "assets/img/hero-2/img-2.webp",
      altText: "A grey clean home that has been cleaned"
    }
  },
  {
    pre: "Greese Trap Cleaning",
    header: "Keep Your Business Safe and Sanitary",
    desc: "In addition to keeping your property looking great, we also prioritize safety and sanitation. Our expert grease trap and sidewalk pressure washing services can help prevent slips, falls, and accidents on your property. We use safe and effective techniques to ensure your property remains ",
    cta: { content: "See More", url: "/services" },
    image: {
      url: "assets/img/hero-2/img-3.webp",
      altText: "A clean side of a company building. This side has been pressure washed"
    }
  }
]

const createSplideSlides = (slides: Slide[]) => {
  function create(slide: Slide) {
    const { pre, header, cta, desc, image } = slide
    return (
      <SplideSlide>
        <div className="grid grid-cols-2 py-8 px-4">
          <div className="flex gap-4 flex-col justify-center">
            <p className="pre">{pre}</p>
            <p className="header">{header}</p>
            <p className="desc">{desc}</p>
            <div className='flex'>
              <Link to={cta.url} className="cta px-6 py-2 bg-blue-500">{cta.content}</Link>
            </div>
          </div>
          <div>
            <img src={image.url} alt={image.altText} />
          </div>
        </div>

      </SplideSlide>
    )
  }
  return slides.map(slide => create(slide))
}

const SplideSlides = createSplideSlides(slides)

export default function Hero() {
  return (
    <Splide tag="section">
      {SplideSlides}
    </Splide>
  );
};