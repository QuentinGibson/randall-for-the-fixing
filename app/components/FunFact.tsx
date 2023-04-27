export default function FunFact() {
  return (
    <section className="tp-counter-2-area p-relative">
      <div className="container">
        <div
          className="tp-counter-2-wrapper p-relative wow fadeInDown"
          data-wow-duration="1s"
          data-wow-delay=".3s"
        >
          <div className="tp-counter-2-shape">
            <div className="shape-1 d-none d-lg-block">
              <img src="assets/img/counter/bubble-1.png" alt="" />
            </div>
            <div className="shape-2 d-none d-lg-block">
              <img src="assets/img/counter/bubble-2.png" alt="" />
            </div>
            <div className="shape-3 d-none d-lg-block">
              <img src="assets/img/counter/bubble-3.png" alt="" />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="tp-counter-2-inner p-relative mb-30">
                <div className="tp-counter-thumb">
                  <i className="flaticon-clean" />
                </div>
                <div className="tp-counter-content">
                  <h4
                    data-purecounter-duration={1}
                    data-purecounter-end={876}
                    className="purecounter tp-counter-title"
                  >
                    0
                  </h4>
                  <p>Happy Customers</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="tp-counter-2-inner-1 p-relative mb-30">
                <div className="tp-counter-thumb">
                  <i className="flaticon-cleaning-lady" />
                </div>
                <div className="tp-counter-content">
                  <h4
                    data-purecounter-duration={1}
                    data-purecounter-end={223}
                    className="purecounter tp-counter-title"
                  >
                    0
                  </h4>
                  <p>Team Mamber</p>
                </div>
                <div className="tp-counter-2-shape-2">
                  <img src="assets/img/counter/shape-3.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="tp-counter-2-inner-2 p-relative mb-30">
                <div className="tp-counter-thumb">
                  <i className="flaticon-medal" />
                </div>
                <div className="tp-counter-content">
                  <h4
                    data-purecounter-duration={1}
                    data-purecounter-end={96}
                    className="purecounter tp-counter-title"
                  >
                    0
                  </h4>
                  <p>Award Winning</p>
                </div>
                <div className="tp-counter-2-shape-3 d-none d-lg-block">
                  <img src="assets/img/counter/shape-3.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="tp-counter-2-inner-3 p-relative mb-30">
                <div className="tp-counter-thumb">
                  <i className="flaticon-thumbs-up" />
                </div>
                <div className="tp-counter-content">
                  <h4
                    data-purecounter-duration="1.5"
                    data-purecounter-end={7862}
                    className="purecounter tp-counter-title"
                  >
                    0
                  </h4>
                  <p>Project Complete</p>
                </div>
                <div className="tp-counter-2-shape-4">
                  <img src="assets/img/counter/shape-3.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};