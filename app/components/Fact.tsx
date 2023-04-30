import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import useIntersectionObserver from "@react-hook/intersection-observer";
import { BsArrowRight, BsAward, BsFillAwardFill, BsPerson, BsPersonVcard } from "react-icons/bs";

export default function Fact() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const { isIntersecting } = useIntersectionObserver(ref, { threshold: 0.5 })
  useEffect(() => {
    console.log(`isIntersecting: ${isIntersecting}`)
    if (isIntersecting) {
      setShouldAnimate(true);
    }
  }, [isIntersecting])
  return (
    <section className="bg-blue-800 px-8 py-12" ref={setRef}>
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <BsPersonVcard className="text-5xl text-white" />
          <CountUp start={0} end={shouldAnimate ? 103 : 0} duration={1.3}>
            {({ countUpRef, start }) => (
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-yellow-300" ref={countUpRef} />
                <p className="text-white text-2xl font-bold">Customers</p>
              </div>
            )}
          </CountUp>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BsAward className="text-5xl text-white" />
          <CountUp start={0} end={shouldAnimate ? 5 : 0} duration={1.3}>
            {({ countUpRef, start }) => (
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-yellow-300" ref={countUpRef} />
                <p className="text-white text-2xl font-bold">Awards</p>
              </div>
            )}
          </CountUp>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BsPersonVcard className="text-5xl text-white" />
          <CountUp start={0} end={shouldAnimate ? 211 : 0} duration={1.3}>
            {({ countUpRef, start }) => (
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-yellow-300" ref={countUpRef} />
                <p className="text-white text-2xl font-bold">Projects</p>
              </div>
            )}
          </CountUp>
        </div>

      </div>
    </section>
  );
};