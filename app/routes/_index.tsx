import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];


import FunFact from "~/components/FunFact";
import { getProjects } from "~/models/project.server";
import { getTestimonies } from "~/models/testimony.server";
import { getBlogs } from "~/models/blog.server";
import { getAllServices } from "~/models/service.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const projects = await getProjects();
  const testimonies = (await getTestimonies()).testimonies;
  const blog = (await getBlogs()).blogs;
  const services = await getAllServices();

  return { projects, testimonies, blog, services }
};

const ProjectSlide = ({ project }) => {
  const { slug, title, service, image } = project
  return (
    <div className="splide__slide">
      <div className="tp-portfolio-thumb w-img p-relative">
        <a href="project-details.html">
          <img src={image.url} alt={image.altText} />
        </a>
        <div className="tp-portfolio-info p-relative">
          <div className="tp-portfolio-content">
            <div className="tp-portfolio-title">
              <h4 className="tp-portfolio-content-title">{title}</h4>
              <p>{title}</p>
            </div>
            <div className="tp-portfolio-content-btn">
              <Link to={`/projects/${slug}`}>
                <i className="fa-regular fa-arrow-up-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const ServiceSlide = ({ service }) => {
  const { slug, title, image, excerpt } = service
  return (
    <div className="splide__slide">
      <div className="tp-service-2-item p-relative">
        <div className="item-2-shape">
          <span>
            <svg
              width={69}
              height={93}
              viewBox="0 0 69 93"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.6411 78.6265C15.2915 78.9789 15.7905 79.365 15.7261 79.8688L14.8346 81.5476C14.9095 81.7891 14.9793 82.0145 15.0642 82.2882C14.8176 83.0585 14.5382 83.8651 13.6872 84.4221C13.7105 83.3584 13.727 82.3583 13.7491 81.3478C12.9765 81.5024 13.0881 82.2611 12.6645 82.5742C12.7737 82.955 12.8574 83.2819 12.9411 83.6088L12.317 84.784L12.7113 86.0559C13.2191 86.0431 13.7269 86.0303 14.1813 86.0161C14.5951 87.1236 13.9287 87.3077 13.2138 87.5065C13.2875 87.8012 13.3556 88.1064 13.4237 88.4116C13.2407 88.4758 13.0359 88.5554 12.7989 88.6447C12.1116 89.0465 12.0235 89.9009 11.5774 90.5114C10.5565 90.2921 9.39518 90.8725 8.54954 89.9661C8.15733 90.0672 7.82966 90.1487 7.49643 90.2408L5.1094 88.9732C4.68435 89.1106 4.24873 89.2425 3.77528 89.3946L3.17353 90.5277C2.83971 90.6464 2.53258 90.7658 2.16649 90.8942C1.72797 91.159 2.02007 92.2153 0.911725 92.0841C1.30224 90.8387 2.04513 89.8478 2.56239 88.6698C2.30682 88.3861 2.01956 88.0856 1.73787 87.7746C1.79098 86.3232 3.20611 86.1062 3.98717 85.3238L8.18031 87.5506C8.97877 87.1945 9.92926 87.215 10.7502 86.5614C10.6795 86.1338 10.6031 85.7166 10.5168 85.2672L11.4361 83.536L10.8872 81.7649C11.7656 80.9266 10.9844 79.5164 11.9115 78.4081C11.6234 77.9053 11.273 77.3157 11.0931 76.9915L12.213 74.8826C11.9576 73.8592 11.6687 72.8987 11.4978 71.9202C11.4126 71.4176 11.306 70.675 11.5738 70.4002C12.4646 69.4878 11.16 68.0687 12.4398 67.4436C12.3162 66.9878 12.227 66.6714 12.1383 66.3284L12.7679 65.1428C12.5384 64.4022 12.2287 63.6593 12.0854 62.8838C11.9759 62.2741 12.0755 61.6276 12.0847 60.7178L12.8202 59.3328C12.7933 58.3635 12.7529 57.5216 12.7266 56.5257L13.2782 55.487L12.7443 53.7642L13.6302 52.0959C13.5632 51.7375 13.5168 51.417 13.4355 50.9837L14.2768 49.3994C14.0924 48.5482 14.1565 47.8155 14.6633 47.1162C14.9326 47.0171 15.2397 46.8977 15.5897 46.7742L17.1387 43.8573C17.3701 43.7785 17.5749 43.6989 17.8386 43.6103C18.5258 43.2085 18.614 42.3541 19.0712 41.7226C19.6336 41.6581 19.9937 41.3113 20.3824 40.8855C20.629 40.5995 21.3072 40.3678 21.6247 40.5095C22.2012 40.7753 22.6834 40.7086 23.1314 40.5026L25.36 41.686C25.8626 42.3969 26.2253 42.9123 26.5824 43.4382C26.9912 44.0454 27.2897 44.8092 27.8416 45.2233C28.404 45.6431 28.2291 46.559 29.0438 46.6822C29.1777 47.399 29.5894 47.8732 30.2788 48.1048C29.7864 48.879 30.7686 48.9164 30.9083 49.3672C31.1833 50.2262 31.4156 51.0893 31.6645 51.921C31.918 52.0556 32.2844 52.156 32.2821 52.2624C32.3031 53.0133 33.2111 53.2668 33.2833 53.8702C33.4212 55.1405 34.7743 55.8053 34.8103 57.0888C35.545 57.6942 35.6312 58.8833 36.7094 59.1734C36.451 59.5069 36.5725 59.8136 36.8515 60.0021C37.2306 60.2572 37.6548 60.4018 37.9029 59.8072L38.7795 60.2727C38.8955 60.5898 38.9958 60.8853 39.1174 61.1919C39.3071 61.064 39.4858 60.9571 39.6594 60.8341C40.5394 60.1715 39.6116 59.1139 40.1885 58.3845C39.7853 57.7669 40.1785 57.1283 40.1335 56.4991C40.0968 55.9819 40.1295 55.4612 40.1411 54.9294C40.1481 54.6103 40.1495 54.3016 40.2043 53.9945C40.6032 52.1214 40.6075 51.6798 40.1851 50.2314C40.0609 49.8023 39.8884 49.3878 40.0093 49.7211C39.9315 47.9042 40.2323 46.8534 39.8222 45.8151C39.4527 44.8791 39.388 43.93 39.4412 42.9629C39.4842 42.219 39.5638 41.5081 39.3082 40.7401C39.0769 40.0792 39.021 39.2156 39.2435 38.5671C39.4951 37.8129 39.1491 37.266 38.9861 36.6548C38.7944 35.8939 38.4954 35.1567 38.2591 34.4798C38.8767 33.5972 38.2239 32.9142 38.0829 32.0323C38.2172 31.7539 38.3966 31.3649 38.6212 30.8655C38.6237 30.0194 38.1295 29.1651 38.2646 28.1203C38.3806 27.2135 37.7241 26.2058 37.4626 25.2195C37.3833 24.9352 37.5188 24.6037 37.5096 24.2894C37.5042 23.5602 37.6495 22.7765 37.4344 22.1108C37.1893 21.3484 37.4743 20.5313 37.2368 19.9075C36.7464 18.6382 37.3055 17.2538 36.5786 16.0472C37.3465 15.1368 36.8587 13.99 37.1639 12.9818C36.5714 11.9812 36.8205 10.8491 36.8165 9.81124C36.804 8.91684 36.7249 7.8929 37.3153 7.03618C37.4033 6.92149 37.2122 6.61827 37.1168 6.33895C37.3917 6.22934 37.656 6.11412 37.947 5.99963C37.9234 5.6105 37.7576 5.13235 37.9192 4.82808C38.0863 4.51332 38.5759 4.35633 38.9332 4.14252C38.8645 3.86392 38.7808 3.53702 38.6822 3.16181C39.1714 2.77598 39.7551 2.46722 40.1077 1.98187C40.449 1.51751 40.9454 1.29685 41.2894 0.954962C42.076 0.162111 42.7944 -0.196208 43.8752 0.216345C44.0448 0.279495 44.2947 0.089382 44.52 0.0476106C44.579 0.03857 44.6573 0.120527 44.7257 0.170282L44.9253 0.814323C45.3269 0.772023 45.7285 0.729724 46.2586 0.674952C46.4473 1.08454 46.626 1.46192 46.8247 1.90371L48.5463 2.81797C48.6567 3.1456 48.7726 3.46274 48.8836 3.76378C50.1914 4.05478 50.3267 5.68693 51.5583 6.04504C51.6167 6.06259 51.6015 6.26973 51.6637 6.35657C52.3785 7.38182 53.1039 8.41268 53.8348 9.43305C53.8971 9.51989 54.1051 9.53619 54.1145 9.59499C54.4179 11.5989 56.4663 12.7136 56.7536 14.7224C57.5129 15.1795 57.788 16.0384 58.3191 16.6702C58.7719 17.22 58.7327 18.0332 59.3979 18.642C59.953 19.152 59.8925 20.2094 60.6204 20.8785C61.1339 21.3394 61.0613 22.2156 61.667 22.86C62.2881 23.5262 62.3749 24.6887 62.6705 25.5854L63.8217 26.1968C64.1361 27.2112 64.5811 28.3621 64.8436 29.5507C65.1111 30.7554 66.3184 31.4907 66.3172 32.7679C66.7963 33.0896 67.2437 33.3945 67.67 33.6881C67.6279 34.1499 67.5975 34.5642 67.5459 34.9673C67.4416 35.8266 68.7917 36.14 68.4768 36.8605C68.0827 37.7811 68.9415 38.3313 68.6776 39.1597C67.8339 39.1421 66.8356 39.1096 65.4847 39.0782C65.7142 39.8189 65.8933 40.4251 66.0835 41.0103C65.617 40.8433 65.0232 40.6356 64.2493 40.3591C64.5719 41.4855 64.8346 42.4186 65.1229 43.4056C64.9314 43.6133 64.7126 43.8468 64.2583 44.3454C64.193 43.4229 64.1324 42.772 64.1089 42.3829L63.1688 41.8837C62.8994 41.0142 62.6299 40.1448 62.3454 39.227L61.1836 38.61C60.9537 37.6405 60.7238 36.6711 60.5128 35.8191C59.7582 35.6337 59.6173 35.236 59.4397 34.8054C59.2821 34.4393 58.9031 34.1842 58.6369 33.8949C58.7495 33.6318 58.8448 33.4269 58.9574 33.1639C58.6719 32.7836 58.3659 32.3655 58.0648 31.9635L58.4047 31.3235C58.0986 30.9054 57.7547 30.5075 57.5138 30.0433C57.3034 29.6491 57.3657 28.9962 57.0656 28.7964C56.5498 28.4418 56.3617 28.0056 56.1864 27.4687C55.786 26.2338 55.6071 24.8878 54.5919 23.9183C54.6401 22.9351 53.7535 22.4373 53.3749 21.6713C53.104 21.1105 52.4163 20.7991 52.3792 20.053C52.3603 19.4512 51.6559 19.1713 51.5262 18.7526C50.7532 16.2304 48.5929 14.6123 47.4783 12.3256C46.1935 11.7106 45.8036 9.99702 43.9935 9.70833C43.8216 9.75156 43.3972 9.86242 42.946 9.97255C42.9264 10.137 42.8584 10.3161 42.8977 10.4715C43.1502 11.6279 42.5001 12.7757 42.9612 13.9217C42.3344 14.4901 43.1418 15.1879 42.7975 15.7852C42.4482 16.3665 42.8805 16.8785 43.0569 17.3622C43.2937 18.0126 42.7142 18.6195 43.0845 19.2735C43.2905 19.625 43.4335 20.1717 43.303 20.5194C43.0142 21.2673 43.4508 21.822 43.6138 22.4331C43.7567 22.9798 43.2986 23.409 43.5311 24.0167C43.733 24.5544 43.274 25.2657 43.6667 25.8777C43.9971 26.4029 43.6545 26.9205 43.6752 27.4426C43.7159 28.5134 44.7906 29.4473 44.1399 30.6217C44.4343 31.5716 44.7287 32.5216 44.9882 33.3588L44.3085 34.6389C44.7502 35.694 45.2574 36.9318 45.643 37.8629C45.3732 38.4729 45.1483 38.7435 45.2155 38.8465C45.6075 39.4851 44.9778 40.1864 45.2971 40.7326C45.8591 41.6632 45.2112 42.7047 45.6726 43.5953C46.1439 44.5182 45.406 45.5252 46.0102 46.4783C46.2479 46.8466 46.0521 47.4959 46.0299 48.0221C45.9258 49.85 45.8378 51.673 46.705 53.3037C46.5992 53.5031 46.5062 53.6017 46.5039 53.708C46.4235 58.1176 46.3437 62.5006 46.2524 67.16L45.4557 68.6604C45.5443 69.0034 45.6175 69.3247 45.7005 69.6782L43.8228 73.2141C42.827 73.5595 41.8331 74.054 40.6755 73.7352C40.532 73.6994 40.2602 74.1603 40.0358 74.4043C39.1786 74.5141 38.6437 73.813 37.9281 73.5541C37.8122 73.2369 37.7068 72.9254 37.5964 72.5978L36.4346 71.9808C36.3137 71.6475 36.1977 71.3304 36.0918 71.0455C35.7644 70.8716 35.3495 70.7858 35.184 70.5365C34.7348 69.8271 33.9555 69.3057 33.8201 68.4133C33.7073 67.7077 33.0742 67.3446 32.8567 66.7852C32.5787 66.0592 31.8276 65.7142 31.6644 64.8742C31.5299 64.1841 30.9659 63.5886 30.6117 62.9298C30.1548 62.0818 29.7196 61.2185 29.311 60.3559C28.8975 59.4772 28.1429 58.8074 27.9675 57.7862C27.8874 57.2997 27.0732 57.1499 27.0983 56.4907C26.2279 55.988 26.1843 55.0502 25.8825 54.1905L24.7207 53.5735C24.5049 52.9344 24.2892 52.2952 24.2038 52.0481C23.7205 51.4283 23.4661 51.0914 23.6216 51.3085C23.2363 50.6062 23.2181 50.462 23.1336 50.4171C22.347 49.986 21.5548 49.5653 20.8261 49.1783C20.3098 49.3345 19.8797 49.4559 19.4547 49.5933C19.5384 49.9203 19.6276 50.2367 19.7168 50.5531C19.2001 51.2202 19.4018 52.0133 19.2426 52.6955C19.0717 53.4253 19.5688 54.1466 19.0124 54.9138C18.6382 55.4145 18.6173 56.3718 18.8113 57.0264C19.0242 57.7985 18.3933 58.553 18.9444 59.2492L17.8356 61.3371C17.6756 61.0773 17.5157 60.8175 17.3396 60.5626C17.2258 60.3945 17.0846 60.2523 16.9101 60.1731L17.7347 58.6203C17.3152 57.0389 17.2829 57.0487 15.9831 57.1251C17.3066 57.9221 16.1885 59.2115 16.9157 60.1626C16.8544 60.278 16.7696 60.4886 16.6482 60.6662C16.4004 61.0054 16.5008 61.3008 16.7848 61.5055C17.1639 61.7606 17.5881 61.9051 17.8467 61.3161C18.4353 61.7632 18.4964 62.3875 18.4608 63.0411C18.4184 63.7584 18.1612 64.5231 18.3447 65.172C18.5631 65.9337 17.9167 66.6664 18.4678 67.3626C17.7013 67.9644 18.8729 68.8691 18.1481 69.5199C18.0663 69.5975 18.3706 70.0954 18.4516 70.2998L17.2927 72.4822C17.1627 72.319 16.8792 72.0878 16.9182 72.0143C17.2822 71.2526 17.0136 70.5854 16.6033 69.8025C15.8607 70.538 15.5617 71.5091 15.1461 72.1897C15.1384 73.2751 15.1236 74.1954 15.1138 75.1317L14.2372 74.6662C14.3247 73.8384 14.3589 73.0091 13.9592 72.2319C13.2944 72.3362 12.9701 72.998 13.0098 73.3822C13.1144 74.4601 12.4731 75.6932 13.559 76.6062C12.8346 77.4859 13.442 78.5348 13.2237 79.4815C13.2231 79.5081 13.4032 79.5768 13.5006 79.5209C13.3951 79.9491 13.1077 80.3884 13.8531 80.2596C13.7671 80.0391 13.6705 79.8129 13.5006 79.5209C13.7329 79.1601 13.978 78.6984 14.2288 78.2263C14.1025 77.6481 14.1326 77.0049 13.5484 76.6006L13.9496 75.8451C14.3937 75.5698 14.751 75.356 15.0977 75.1366L16.5552 75.9107C16.6156 76.817 17.7627 77.1302 17.7634 78.0722C17.7539 78.7532 17.7338 79.4285 17.7298 80.0989C16.704 80.3478 16.7821 79.4611 16.5156 78.943C16.2293 78.8448 15.9441 78.6933 15.6411 78.6265C15.7466 78.1983 16.034 77.7591 15.2886 77.8879C15.3852 78.114 15.4712 78.3345 15.6411 78.6265ZM38.7568 62.5339C38.7314 61.7402 38.7314 61.7402 37.7894 61.5762C37.6713 62.334 38.4217 62.2214 38.772 62.3267C38.6641 62.8613 38.3662 63.2949 39.106 63.1766C39.02 62.9561 38.934 62.7356 38.7568 62.5339ZM17.2449 68.3139C16.9355 67.3156 16.6062 66.253 16.2662 65.1847C16.2563 65.1525 16.1011 65.1642 15.9303 65.1543L15.2506 66.4343C15.4573 67.2435 15.6651 67.9996 15.8618 68.7766C16.2071 68.8658 16.5102 68.9326 16.776 68.993C16.947 68.7475 17.0684 68.5699 17.2449 68.3139ZM16.0904 62.966C15.7183 62.3918 15.1902 62.1114 14.3565 62.126C14.2533 62.4478 14.1333 62.8011 13.9844 63.26C14.4734 63.1296 14.78 63.0369 15.0971 62.9497C15.6475 63.1882 15.6475 63.1882 16.0904 62.966ZM17.8653 54.1162C17.5145 53.2978 16.9125 52.9781 16.0486 53.1515C16.3832 53.9748 16.9852 54.2945 17.8653 54.1162ZM13.7485 58.6556C14.0127 59.2801 13.9632 59.8322 14.3989 60.1847C14.8624 60.0003 15.0513 59.6702 14.8889 59.0325C14.592 58.9286 14.2262 58.8016 13.7485 58.6556ZM63.9097 37.8114C63.7439 37.8175 63.5837 37.8132 63.4074 37.8137C63.4374 37.9103 63.4494 38.0916 63.5078 38.1091C63.6618 38.1506 63.8332 38.1339 64.0095 38.1334L63.9097 37.8114ZM55.287 22.9154C55.3269 23.0442 55.3568 23.1408 55.3868 23.2374C55.5226 23.1347 55.6845 23.0593 55.7886 22.9397C55.827 22.8928 55.7393 22.7521 55.7044 22.6394C55.5686 22.7421 55.4278 22.8288 55.287 22.9154ZM14.2891 65.6951C14.16 65.7341 14.0632 65.7634 13.9664 65.7927C14.0703 65.9286 14.1469 66.0903 14.2675 66.1947C14.3147 66.2333 14.4555 66.1466 14.5685 66.1124C14.4646 65.9766 14.3663 65.8302 14.2891 65.6951Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
        <div className="tp-service-2-thumb text-center">
          <img src={image.url} alt={image.altText} />
        </div>
        <div className="tp-service-2-icon text-center">
          <i className="flaticon-house-cleaning" />
        </div>
        <div className="tp-service-2-inner">
          <h4 className="tp-service-title">
            <Link to={`/service/${slug}`}>{title}</Link>
          </h4>
          <p>{excerpt}</p>
          <div className="tp-service-2-btn">
            <Link to={`/service/${slug}`}>
              Details{" "}
              <i className="fa-regular fa-arrow-right-long" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const TestimonySlide = ({ testimony }) => {
  const { name, type, text } = testimony
  return (
    <div className="splide__slide">
      <div className="tp-testimonial-2-wrapper">
        <div className="tp-testimonial-2-shape">
          <img
            src="assets/img/testimonial/home-2/shape.png"
            alt=""
          />
        </div>
        <p>{text}</p>
        <h3 className="tp-testimonial-title">{name}</h3>
        <span>{type}</span>
      </div>
    </div>
  )
}

const BlogSlide = ({ blog }) => {
  const { image, title, day, month, slug } = blog
  const blogLink = `/blogs/${slug}`
  return (
    <div className="splide__slide">
      <div className="tp-blog-2-wrapper mb-30">
        <div className="tp-blog-2-thumb p-relative">
          <Link to={blogLink}>
            <img src={image.url} alt={image.altText} />
          </Link>
        </div>
        <div className="tp-blog-2-content p-relative">
          <span className="date">
            {day} <br /> <i>{month}</i>
          </span>
          <h3 className="tp-blog-title">
            <Link to={blogLink}>
              {title}
            </Link>
          </h3>
          <div className="tp-blog-btn">
            <Link className="tp-btn" to={blogLink}>
              Read More{" "}
              <i className="fa-regular fa-arrow-right-long" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const { services, testimonies, blog, projects } = useLoaderData<typeof loader>()
  const serviceSlides = services.map((service) => <ServiceSlide key={service.id} service={service} />)
  const testimonySlides = testimonies.map((testimony) => <TestimonySlide key={testimony.id} testimony={testimony} />)
  const blogSlides = blog.map((blog) => <BlogSlide blog={blog} />)
  const projectSlides = projects.map((project) => <ProjectSlide key={project.id} project={project} />)
  return (
    <main>
      {/* hero area start */}
      <section className="tp-hero-2-area p-relative">
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
      </section>
      {/* hero area end */}
      {/* brands area start */}
      <section className="tp-brands-2-area pt-75 pb-90 p-relative">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <Form>
                <div
                  className="tp-brands-from p-relative mb-30 wow fadeInLeft"
                  data-wow-duration="1s"
                  data-wow-delay=".3s"
                  data-background="assets/img/brand/home-2/form-img.webp"
                >
                  <div className="tp-brands-from-overlay" />
                  <span className="tp-section__title-pre">GET A FREE QUOTE</span>
                  <h3 className="tp-brands-title">GET A FREE QUOTE</h3>
                  <div className="tp-brands-from-input">
                    <input type="text" placeholder="Full Name:" />
                  </div>
                  <div className="tp-brands-from-input">
                    <input type="email" placeholder="Email Address:" />
                  </div>
                  <div className="tp-brands-from-input">
                    <select className="wide">
                      <option>Choose Service:</option>
                      {services.map(service => (<option key={service.id} value={service.title}>{service.title}</option>))}
                    </select>
                  </div>
                  <div className="tp-brands-from-input">
                    <textarea
                      name="message"
                      placeholder="Write Message..."
                      defaultValue={""}
                    />
                  </div>
                  <button className="tp-btn">
                    Submit Now <i className="fa-regular fa-arrow-right-long" />
                  </button>
                </div>
              </Form>
            </div>
            <div className="col-lg-7 mb-30">
              <div className="tp-brands-2-wrapper text-center mb-80">
                <span className="tp-section__title-pre-2">trusted service’s</span>
                <h3 className="tp-section__title">Award Winning Service</h3>
              </div>
              <div className="tp-brands-2-top d-flex">
                <div className="tp-brands-2-top-img">
                  <a href="#">
                    <img src="assets/img/brand/home-2/img-1.webp" alt="" />
                  </a>
                </div>
                <div className="tp-brands-2-top-img">
                  <a href="#">
                    <img src="assets/img/brand/home-2/img-2.webp" alt="" />
                  </a>
                </div>
                <div className="tp-brands-2-top-img">
                  <a href="#">
                    <img src="assets/img/brand/home-2/img-3.webp" alt="" />
                  </a>
                </div>
                <div className="tp-brands-2-top-img">
                  <a href="#">
                    <img src="assets/img/brand/home-2/img-4.webp" alt="" />
                  </a>
                </div>
              </div>
              <div className="tp-brands-2-bottom d-flex">
                <div className="tp-brands-2-bottom-img">
                  <a href="#">
                    <img src="assets/img/brand/home-2/img-5.webp" alt="" />
                  </a>
                </div>
                <div className="tp-brands-2-bottom-img">
                  <a href="#">
                    <img src="assets/img/brand/home-2/img-6.webp" alt="" />
                  </a>
                </div>
                <div className="tp-brands-2-bottom-img">
                  <a href="#">
                    <img src="assets/img/brand/home-2/img-7.webp" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* brands area end */}
      {/* about area start */}
      <section
        id="mousemove"
        className="tp-about-2-area tp-about-2-bg p-relative pt-120 pb-85 fix"
      >
        <div className="tp-about-2-shape">
          <div className="shape-1 d-none d-lg-block">
            <img src="assets/img/about/home-2/effect-1.png" alt="" />
          </div>
          <div className="shape-2">
            <img src="assets/img/about/home-2/effect-2.png" alt="" />
          </div>
          <div className="shape-3 d-none d-md-block">
            <img
              className="mousemove__image"
              src="assets/img/about/home-2/bubbles-1.png"
              alt=""
            />
          </div>
          <div className="shape-4 d-none d-md-block">
            <img
              className="mousemove__image"
              src="assets/img/about/home-2/bubbles-2.png"
              alt=""
            />
          </div>
          <div className="shape-5 d-none d-md-block">
            <img
              className="mousemove__image"
              src="assets/img/about/home-2/bubbles-3.png"
              alt=""
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div
                className="tp-about-2-wrapper p-relative mb-30  wow fadeInLeft"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <span className="tp-section__title-pre-2">about our company</span>
                <h3 className="tp-section__title">
                  Great Service <br /> at unbelievable prices
                </h3>
                <p>Check out all that we offer!</p>
                <div className="tp-about-2-inner d-flex">
                  <div className="tp-about-inner-thumb">
                    <i className="flaticon-medal" />
                  </div>
                  <div className="tp-about-inner-text">
                    <h4 className="tp-about-title">Award Winning</h4>
                    <p>We get the job done correctly everytime!</p>
                  </div>
                </div>
                <div className="tp-about-2-btn">
                  <Link className="tp-btn" to="/services">
                    Our Services <i className="fa-regular fa-arrow-right-long" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div
                className="tp-about-2-thumb p-relative mb-30 wow fadeInRight"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <div className="tp-about-2-thumb-shape">
                  <div className="shape-1 d-none d-sm-block">
                    <img src="assets/img/about/home-2/img-4.png" alt="" />
                  </div>
                  <div className="shape-3">
                    <img src="assets/img/about/home-2/effect-3.png" alt="" />
                  </div>
                </div>
                <div className="row tp-gx-30">
                  <div className="col-6">
                    <div className="tp-about-2-thumb-1">
                      <img src="assets/img/about/home-2/img-1.webp" alt="" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="tp-about-2-thumb-2">
                      <img src="assets/img/about/home-2/img-2.webp" alt="" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="tp-about-2-thumb-3">
                      <img src="assets/img/about/home-2/img-3.webp" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* about area end */}
      {/* our service area start */}
      <section
        id="serviceBubble"
        className="tp-service-2-area fix pt-120 pb-240 p-relative"
      >
        <div className="tp-service-2-shape">
          <div className="shape-1 d-none d-lg-block">
            <img
              className="mousemove__image"
              src="assets/img/services/home-2/bubble-1.png"
              alt=""
            />
          </div>
          <div className="shape-2 d-none d-lg-block">
            <img src="assets/img/services/home-2/bubble-2.png" alt="" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-service-2-wrapper text-center mb-70">
                <span className="tp-section__title-pre-2">Our all services</span>
                <h3 className="tp-section__title">What We are Offering</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div
                className="service-active-2 splide wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <div className="splide__arrows splide__arrows--ltr">
                  <button className="splide__arrow splide__arrow--prev tp-service-btn-border">
                    <i className="fa-regular fa-arrow-left" />
                  </button>
                  <button className="splide__arrow splide__arrow--next">
                    <i className="fa-regular fa-arrow-right" />
                  </button>
                </div>
                <div className="splide__track">
                  <div className="splide__list">
                    {serviceSlides}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* our service area end */}
      {/* portfolio area start */}
      <section className="tp-portfolio-2-area pt-120 pb-200 fix">
        <div className="container">
          <div className="row align-items-center justify-content-center mb-25">
            <div className="col-lg-12">
              <div className="tp-portfolio-2-section-title-wrapper text-center">
                <span className="tp-section__title-pre-2">Our portfolio</span>
                <h3 className="tp-section__title">Recent Work Showcase</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div
                className="portfolio-active-2 splide wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <div className="splide__arrows splide__arrows--ltr tp-btn-effect-blue">
                  <button className="splide__arrow splide__arrow--prev">
                    <i className="fa-regular fa-arrow-left" />
                  </button>
                  <button className="splide__arrow splide__arrow--next">
                    <i className="fa-regular fa-arrow-right" />
                  </button>
                </div>
                <div className="splide__track pt-35">
                  <div className="splide__list">{projectSlides}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* portfolio area end */}
      <FunFact />
      {/* testimonial area start */}
      <section
        id="testimonialBubble"
        className="tp-testimonial-2-area p-relative pt-120 pb-245 fix"
        data-background="assets/img/testimonial/home-2/img.webp"
      >
        <div className="tp-testimonial-2-overlay" />
        <div className="tp-testimonial-2-shapeimg d-none d-lg-block">
          <span>
            <svg
              width={224}
              height={173}
              viewBox="0 0 224 173"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.8293 134.635C31.992 135.524 31.0012 134.335 29.7678 134.539L25.7144 136.879C25.1144 136.717 24.5543 136.566 23.8743 136.383C22.0009 137.058 20.0408 137.817 18.7422 139.956C21.3557 139.802 23.8132 139.671 26.296 139.525C25.9801 141.435 24.1053 141.23 23.3706 142.298C22.4252 142.064 21.6145 141.889 20.8038 141.713L17.9664 143.351L14.8062 142.499C14.7954 141.252 14.7847 140.005 14.782 138.889C12.0244 137.974 11.6272 139.626 11.1979 141.398C10.4672 141.244 9.71114 141.105 8.9551 140.965C8.81246 141.42 8.63381 141.93 8.43384 142.52C7.50324 144.243 5.4098 144.537 3.9458 145.687C4.57 148.172 3.23947 151.075 5.5384 153.067C5.32244 154.039 5.14916 154.85 4.95053 155.676L8.26576 161.419C7.96315 162.474 7.67519 163.555 7.34059 164.731L4.60456 166.31C4.34059 167.14 4.07262 167.905 3.78733 168.815C3.17271 169.915 0.551192 169.294 0.96606 172.002C3.99549 170.93 6.37017 169.017 9.22356 167.641C9.94232 168.242 10.7051 168.92 11.4931 169.583C15.0573 169.321 15.4731 165.828 17.3317 163.84L11.5081 153.754C12.3173 151.762 12.1878 149.431 13.7265 147.357C14.7838 147.492 15.8159 147.642 16.928 147.813L21.1081 145.399L25.5084 146.585C27.4963 144.353 31.0287 146.142 33.6766 143.766C34.9368 144.428 36.4156 145.234 37.2276 145.646L42.3197 142.706C44.8572 143.24 47.2427 143.861 49.6629 144.192C50.9056 144.355 52.7404 144.549 53.3937 143.867C55.563 141.598 59.1608 144.67 60.5913 141.473C61.722 141.735 62.5074 141.925 63.3582 142.112L66.2209 140.459C68.061 140.955 69.9132 141.647 71.8319 141.928C73.34 142.141 74.9214 141.838 77.1576 141.733L80.5016 139.802C82.8871 139.78 84.9605 139.802 87.4113 139.776L89.9194 138.328L94.1997 139.482L98.2277 137.156C99.1145 137.288 99.9065 137.373 100.979 137.533L104.804 135.325C106.912 135.7 108.708 135.476 110.386 134.169C110.607 133.499 110.875 132.734 111.149 131.864L118.192 127.798C118.367 127.223 118.545 126.713 118.741 126.058C119.672 124.335 121.765 124.041 123.28 122.862C123.392 121.476 124.215 120.561 125.229 119.568C125.912 118.937 126.425 117.252 126.051 116.486C125.349 115.095 125.473 113.906 125.942 112.788L122.847 107.427C121.058 106.258 119.76 105.415 118.437 104.586C116.911 103.639 115.008 102.975 113.944 101.659C112.865 100.317 110.627 100.829 110.257 98.8416C108.483 98.5781 107.283 97.6111 106.656 95.9403C104.793 97.219 104.62 94.8123 103.5 94.5104C101.365 93.9136 99.2235 93.4223 97.1581 92.8871C96.806 92.2773 96.5286 91.3872 96.2672 91.4026C94.4191 91.4194 93.7203 89.2144 92.2309 89.0919C89.096 88.8692 87.349 85.6093 84.1902 85.6376C82.6407 83.8898 79.7098 83.7864 78.907 81.1672C78.1083 81.8315 77.3442 81.5612 76.8575 80.8937C76.1987 79.9867 75.808 78.9589 77.2493 78.2961L76.0318 76.1872C75.2424 75.9316 74.5077 75.7121 73.7436 75.4418C74.0423 74.9645 74.2902 74.5165 74.5782 74.0792C76.1342 71.8596 78.8118 74.0402 80.5571 72.5582C82.1093 73.4915 83.6466 72.4684 85.1974 72.5216C86.4721 72.5648 87.7495 72.4371 89.0562 72.3602C89.8403 72.314 90.599 72.2825 91.3497 72.1201C95.9219 70.9709 97.0072 70.9202 100.604 71.8251C101.669 72.0908 102.702 72.4766 101.873 72.2101C106.347 72.2358 108.905 71.4022 111.492 72.3139C113.824 73.1356 116.163 73.2081 118.537 72.9896C120.362 72.8165 122.103 72.5564 124.013 73.1139C125.657 73.6214 127.785 73.68 129.361 73.075C131.195 72.3891 132.568 73.1884 134.084 73.5326C135.971 73.9339 137.808 74.6007 139.493 75.119C141.611 73.5231 143.345 75.063 145.525 75.3288C146.198 74.9739 147.14 74.4982 148.349 73.9016C150.429 73.8186 152.571 74.9536 155.128 74.5272C157.348 74.1601 159.88 75.6793 162.327 76.2315C163.033 76.4001 163.837 76.0376 164.61 76.0315C166.403 75.9785 168.318 75.5505 169.973 76.018C171.868 76.5501 173.853 75.7765 175.407 76.3024C178.568 77.3905 181.926 75.8925 184.953 77.5665C187.127 75.5995 189.987 76.6922 192.441 75.8516C194.95 77.2145 197.713 76.5002 200.265 76.4157C202.465 76.365 204.99 76.4661 207.047 74.9395C207.322 74.7132 208.083 75.1544 208.778 75.3631C209.024 74.6786 209.286 74.0196 209.543 73.2951C210.502 73.3175 211.691 73.681 212.426 73.2568C213.186 72.8181 213.531 71.6024 214.027 70.7063C214.718 70.8495 215.528 71.0251 216.459 71.233C217.367 69.9974 218.078 68.537 219.242 67.6278C220.355 66.7479 220.856 65.5099 221.668 64.6346C223.552 62.6322 224.374 60.8368 223.269 58.2222C223.1 57.8118 223.547 57.1813 223.631 56.6246C223.648 56.4791 223.44 56.2943 223.312 56.1311L221.712 55.6999C221.782 54.7105 221.853 53.7212 221.944 52.4155C220.921 51.9896 219.978 51.5854 218.875 51.138L216.484 46.9965C215.669 46.7555 214.88 46.4998 214.131 46.255C213.306 43.0721 209.282 42.8886 208.299 39.899C208.251 39.7574 207.743 39.8135 207.525 39.6688C204.944 38.0079 202.349 36.3217 199.78 34.6208C199.561 34.476 199.504 33.9671 199.358 33.9494C194.406 33.3871 191.495 28.4618 186.532 27.9395C185.345 26.1178 183.21 25.521 181.613 24.2752C180.223 23.2142 178.227 23.3842 176.675 21.8073C175.375 20.4915 172.78 20.7361 171.075 19.0107C169.898 17.7926 167.75 18.0504 166.115 16.6229C164.426 15.1592 161.56 15.052 159.331 14.4082L157.732 11.6387C155.212 10.9595 152.345 9.97232 149.401 9.43627C146.416 8.88944 144.508 5.99371 141.368 6.11284C140.537 4.9664 139.75 3.89618 138.993 2.87678C137.861 3.02222 136.845 3.13456 135.858 3.29771C133.754 3.63171 132.871 0.347247 131.126 1.18555C128.895 2.23632 127.471 0.179052 125.456 0.901855C125.57 2.97059 125.732 5.41734 125.922 8.72947C124.082 8.23354 122.576 7.84926 121.122 7.43572C121.571 8.5652 122.131 10.0034 122.875 11.8774C120.079 11.1882 117.763 10.6283 115.312 10.0107C114.818 10.4995 114.262 11.0577 113.074 12.2178C115.347 12.2942 116.952 12.3836 117.911 12.406L119.217 14.6673C121.377 15.2495 123.537 15.8317 125.817 16.4462L127.431 19.241C129.834 19.717 132.236 20.193 134.349 20.6335C134.867 22.4682 135.857 22.7778 136.93 23.1743C137.844 23.5278 138.502 24.4348 139.236 25.0615C139.873 24.7613 140.369 24.5088 141.007 24.2086C141.965 24.8746 143.019 25.5876 144.032 26.2898L145.578 25.3976C146.631 26.1106 147.638 26.9183 148.799 27.4673C149.786 27.9478 151.386 27.7354 151.902 28.4538C152.817 29.6872 153.905 30.1092 155.24 30.4904C158.309 31.3606 161.634 31.6772 164.102 34.0803C166.515 33.8725 167.813 36.003 169.728 36.8623C171.129 37.476 171.952 39.1352 173.789 39.1584C175.271 39.15 176.018 40.8531 177.058 41.1334C183.323 42.8007 187.481 47.9547 193.196 50.4819C194.815 53.5785 199.061 54.3795 199.921 58.7949C199.829 59.2207 199.592 60.2724 199.359 61.3895C198.956 61.4526 198.522 61.6358 198.136 61.5534C195.272 61.0389 192.504 62.7387 189.648 61.7114C188.302 63.3012 186.52 61.3832 185.079 62.2824C183.679 63.1923 182.385 62.1783 181.181 61.7894C179.562 61.2673 178.118 62.7446 176.479 61.8953C175.598 61.4218 174.241 61.1206 173.397 61.4724C171.583 62.2491 170.183 61.2282 168.667 60.8839C167.31 60.5828 166.293 61.7461 164.78 61.2309C163.441 60.7843 161.73 61.9752 160.193 61.0674C158.874 60.3043 157.63 61.1919 156.345 61.1887C153.708 61.1863 151.323 58.6339 148.489 60.3375C146.129 59.7014 143.769 59.0653 141.689 58.5047L138.598 60.2891C135.967 59.3011 132.882 58.1692 130.56 57.3075C129.083 58.0249 128.436 58.6016 128.177 58.446C126.575 57.5421 124.903 59.151 123.533 58.4172C121.198 57.1229 118.692 58.8072 116.463 57.7562C114.155 56.6836 111.741 58.5858 109.347 57.1898C108.422 56.6401 106.842 57.1797 105.549 57.282C101.064 57.7036 96.589 58.0852 92.5074 56.1055C92.026 56.3834 91.7913 56.6205 91.53 56.6359C80.6948 57.2341 69.9249 57.8285 58.4763 58.476L54.8536 60.5676C54.0029 60.3812 53.2068 60.2311 52.3307 60.0593L43.7933 64.9884C43.0267 67.4636 41.8935 69.9472 42.7737 72.759C42.8738 73.1077 41.7631 73.8167 41.1818 74.3895C40.9832 76.5029 42.7514 77.7518 43.4476 79.4841C44.237 79.7398 45.0117 79.97 45.8264 80.211L47.44 83.0059C48.2694 83.2723 49.0588 83.528 49.7682 83.7621C50.2229 84.5497 50.4684 85.5599 51.0951 85.9433C52.8766 86.9813 54.2234 88.8461 56.4289 89.0972C58.173 89.3098 59.1185 90.8304 60.5119 91.3132C62.3201 91.9293 63.2309 93.7409 65.3097 94.0652C67.0178 94.3325 68.5287 95.6622 70.1782 96.4715C72.301 97.5156 74.4599 98.5051 76.6147 99.4291C78.8095 100.364 80.5191 102.155 83.0446 102.492C84.2473 102.645 84.6835 104.629 86.3022 104.507C87.6104 106.598 89.9199 106.619 92.0587 107.282L93.6723 110.076C95.2618 110.548 96.8512 111.019 97.466 111.206C99.0301 112.336 99.8795 112.929 99.3328 112.567C101.092 113.449 101.448 113.481 101.565 113.684C102.691 115.575 103.791 117.48 104.803 119.234C104.462 120.515 104.199 121.581 103.896 122.636C103.086 122.461 102.3 122.271 101.515 122.08C99.9176 123.409 97.9508 122.986 96.2867 123.439C94.5066 123.925 92.6918 122.77 90.8518 124.205C89.6518 125.169 87.2997 125.308 85.6742 124.891C83.7581 124.439 81.9554 126.056 80.1979 124.767L75.1565 127.677C75.8086 128.046 76.4606 128.415 77.102 128.824C77.5247 129.088 77.8861 129.421 78.0955 129.843L81.8449 127.678C85.7678 128.564 85.7465 128.644 85.6667 131.84C83.597 128.665 80.5197 131.526 78.1208 129.828C77.8421 129.989 77.3315 130.216 76.9048 130.53C76.0914 131.169 75.3567 130.95 74.83 130.271C74.1712 129.364 73.7805 128.336 75.2072 127.648C74.059 126.245 72.5189 126.151 70.9148 126.298C69.1548 126.468 67.296 127.168 65.6853 126.777C63.7945 126.31 62.0465 127.963 60.289 126.674C58.873 128.609 56.5514 125.817 55.0114 127.655C54.8274 127.862 53.578 127.161 53.0686 126.981L47.7992 130.023C48.2112 130.327 48.8033 131.002 48.9806 130.899C50.8233 129.937 52.4861 130.535 54.445 131.471C52.6983 133.36 50.3356 134.182 48.6969 135.264C46.0288 135.381 43.7673 135.501 41.4659 135.611L42.6834 137.719C44.7115 137.429 46.7476 137.27 48.6918 138.18C48.4905 139.821 46.8905 140.677 45.9424 140.614C43.2836 140.456 40.3049 142.142 37.9699 139.56C35.8673 141.418 33.2377 140.022 30.9283 140.644C30.863 140.648 30.6789 140.212 30.8082 139.968C29.7642 140.266 28.7082 141.011 28.9627 139.171C29.5121 139.362 30.0762 139.578 30.8082 139.968C31.6762 139.366 32.7909 138.722 33.9309 138.064C35.363 138.321 36.9418 138.189 37.9846 139.585L39.8086 138.532C40.4486 137.417 40.9445 136.521 41.4552 135.651L39.4308 132.144C37.1974 132.079 36.3318 129.292 34.0157 129.376C32.3423 129.462 30.6835 129.572 29.0354 129.643C28.5089 132.183 30.6824 131.91 31.9785 132.517C32.2439 133.211 32.6399 133.897 32.8293 134.635C33.8734 134.337 34.9294 133.591 34.6748 135.432C34.1108 135.216 33.5614 135.025 32.8293 134.635ZM70.4742 76.4486C72.4276 76.4388 72.4276 76.4388 72.9091 78.7354C71.0557 79.0941 71.2703 77.2425 70.9822 76.3925C69.6768 76.7057 68.6355 77.4763 68.8647 75.6502C69.4141 75.8411 69.9635 76.0321 70.4742 76.4486ZM58.0517 129.761C60.5319 130.43 63.1721 131.141 65.8269 131.878C65.907 131.9 65.891 132.282 65.9297 132.7L62.8389 134.484C60.8321 134.051 58.956 133.609 57.0292 133.197C56.7811 132.358 56.5918 131.62 56.421 130.974C57.0104 130.532 57.437 130.218 58.0517 129.761ZM71.2966 132.108C72.7394 132.969 73.4728 134.239 73.5063 136.286C72.7236 136.569 71.8649 136.895 70.7489 137.302C71.0288 136.091 71.2315 135.33 71.4194 134.544C70.7873 133.215 70.7873 133.215 71.2966 132.108ZM92.9081 126.948C94.9496 127.734 95.7857 129.182 95.4312 131.318C93.379 130.572 92.5429 129.124 92.9081 126.948ZM82.0895 137.463C80.5321 136.871 79.1787 137.043 78.2759 136.006C78.6905 134.852 79.4865 134.358 81.068 134.699C81.348 135.418 81.6908 136.304 82.0895 137.463ZM129.168 12.4791C129.166 12.8864 129.191 13.279 129.204 13.7117C128.964 13.647 128.517 13.6339 128.469 13.4923C128.354 13.1181 128.381 12.6962 128.368 12.2635L129.168 12.4791ZM166.51 32.2835C166.19 32.1972 165.95 32.1325 165.71 32.0678C165.951 31.7253 166.123 31.3211 166.408 31.0547C166.52 30.9562 166.874 31.1587 167.154 31.2341C166.912 31.5767 166.711 31.9301 166.51 32.2835ZM64.7365 136.776C64.6512 137.096 64.5872 137.337 64.5232 137.577C64.1806 137.334 63.7765 137.161 63.5098 136.875C63.4111 136.762 63.6125 136.409 63.6871 136.129C64.0298 136.371 64.3978 136.599 64.7365 136.776Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
        <div className="tp-testimonial-2-bubble d-none d-xl-block">
          <div className="shape-1">
            <img
              className="mousemove__image"
              src="assets/img/testimonial/home-2/bubble-1.png"
              alt=""
            />
          </div>
          <div className="shape-2">
            <img
              className="mousemove__image"
              src="assets/img/testimonial/home-2/bubble-2.png"
              alt=""
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tp-testimonial-2-section-title-wrapper text-center">
                <span className="tp-section__title-pre-2">HAPPY CUSTOMERS</span>
                <h3 className="tp-section__title mb-70">OUR LOVELY CUSTOMER</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div
                className="testimonial-active-2 splide wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
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
                    {testimonySlides}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* testimonial area end */}
      {/* blog area start */}
      <section id="blogBubble" className="tp-blog-2-area p-relative pt-120 pb-90">
        <div className="tp-blog-2-shape d-none d-md-block">
          <div className="shape-1">
            <img
              className="mousemove__image"
              src="assets/img/blog/home-2/bubble-1.png"
              alt=""
            />
          </div>
          <div className="shape-2">
            <img
              className="mousemove__image"
              src="assets/img/blog/home-2/bubble-2.png"
              alt=""
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tp-blog-2-section-title-wrapper text-center mb-80">
                <span className="tp-section__title-pre-2">latest news</span>
                <h3 className="tp-section__title">latest blog and article</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-4">
              <div
                className="tp-blog-start home-2 mb-30 wow fadeInLeft"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <div
                  className="tp-blog-inner home-2"
                  data-background="assets/img/blog/blog-3.webp"
                >
                  <h3 className="tp-blog-title">
                    Get Started <br /> With Your Free <br /> Estimate.
                  </h3>
                  <div className="tp-blog-start-btn">
                    <a className="tp-btn" href="contact.html">
                      Started Now <i className="fa-regular fa-arrow-right-long" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div
                className="blog-active-2 splide  wow fadeInRight"
                data-wow-duration="1s"
                data-wow-delay=".4s"
              >
                <div className="splide__track">
                  <div className="splide__list">{blogSlides}</div>
                </div>
                <div className="blog-slider-progress">
                  <div className="blog-slider-progress-bar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* blog area end */}
    </main>

  );
};