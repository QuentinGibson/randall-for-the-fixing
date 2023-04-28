import { Link } from '@remix-run/react';
import { Splide, SplideSlide } from '@splidejs/react-splide'
export default function Hero() {
  const options = {
    arrows: true
  }
  return (
    <div className="hero-2-active splide">
      <div className="splide__arrows splide__arrows--ltr">
        <button className="splide__arrow splide__arrow--prev">
          <i className="fa-regular fa-arrow-left" />
        </button>
        <button className="splide__arrow splide__arrow--next">
          <i className="fa-regular fa-arrow-right" />
        </button>
      </div>
      <div className="splide__track">
        <div className="splide__list">
          <div className="splide__slide slider-item">
            <div className="tp-hero-2-bg tp-hero-2-overlay">
              <div className="bubbles" />
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div className="tp-hero-wrapper d-flex align-items-center">
                      <div className="tp-hero-2-content">
                        <div className="tp-hero-title-wrapper">
                          <span className="tp-hero-pre">
                            Award Winning Cleaning
                          </span>
                          <h3 className="tp-hero-2-title">
                            Best Clean <br /> for the house &amp;{" "}
                            <span>or office.</span>
                          </h3>
                        </div>
                        <p>
                          We understand that every property is unique, and
                          that's why we offer customized residential and
                          commercial cleaning solutions to meet your specific
                          needs. Whether you need a one-time deep clean or
                          ongoing maintenance. Click take service to start today!</p>
                        <div className="tp-hero-2-btn d-flex flex-wrap align-items-center">
                          <Link className="tp-btn" to="/contact">
                            Take Services{" "}
                            <i className="fa-regular fa-arrow-right-long" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="tp-hero-2-thumb">
                      <img src="assets/img/hero/home-2/img-1.webp" alt="The roof of a model home" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="splide__slide slider-item">
            <div className="tp-hero-2-bg tp-hero-2-overlay">
              <div className="bubbles" />
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div className="tp-hero-wrapper d-flex align-items-center">
                      <div className="tp-hero-2-content">
                        <div className="tp-hero-title-wrapper">
                          <span className="tp-hero-pre">
                            Commercial Cleaning Solucations
                          </span>
                          <h3 className="tp-hero-2-title">
                            Say Goodbye to Dirt and Grime
                          </h3>
                        </div>
                        <p>
                          In addition to keeping your property looking great, we
                          also prioritize safety and sanitation. Our expert
                          grease trap and sidewalk pressure washing services can
                          help prevent slips, falls, and accidents on your
                          property. We use safe and effective techniques to
                          ensure your property remains clean and hygienic for
                          your employees and customers.{" "}
                        </p>
                        <div className="tp-hero-2-btn d-flex flex-wrap align-items-center">
                          <Link className="tp-btn" to="/contact">
                            Take Services{" "}
                            <i className="fa-regular fa-arrow-right-long" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="tp-hero-2-thumb">
                      <img src="assets/img/hero/home-2/img-2.webp" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="splide__slide slider-item">
            <div className="tp-hero-2-bg tp-hero-2-overlay">
              <div className="bubbles" />
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div className="tp-hero-wrapper d-flex align-items-center">
                      <div className="tp-hero-2-content">
                        <div className="tp-hero-title-wrapper">
                          <span className="tp-hero-pre">Grease Trap/Dining Area Cleaning</span>
                          <h3 className="tp-hero-2-title">
                            Keep Your Business Safe and Sanitary
                          </h3>
                        </div>
                        <p>
                          In addition to keeping your property looking great, we
                          also prioritize safety and sanitation. Our expert
                          grease trap and sidewalk pressure washing services can
                          help prevent slips, falls, and accidents on your
                          property. We use safe and effective techniques to
                          ensure your property remains{" "}
                          <span>clean and hygienic</span> for your employees and
                          customers.{" "}
                        </p>
                        <div className="tp-hero-2-btn d-flex flex-wrap align-items-center">
                          <Link className="tp-btn" to="/contact">
                            Take Services{" "}
                            <i className="fa-regular fa-arrow-right-long" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="tp-hero-2-thumb">
                      <img src="assets/img/hero/home-2/img-3.webp" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};