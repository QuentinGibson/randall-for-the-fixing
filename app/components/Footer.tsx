import { Form } from "@remix-run/react";
import { BsEnvelope, BsPhone, BsSendFill } from "react-icons/bs";


export default function Footer({ business }) {
  const { phone, email } = business;
  const areaCode = phone.substring(0, 3)
  const number = phone.substring(4, 7)
  const lastFour = phone.substring(6, 9)
  const formattedPhone = `(${areaCode}) ${number}-${lastFour}`

  const footerLinks = [
    {
      title: 'Home',
      link: '/'

    }, {
      title: 'About',
      link: '/about'
    }, {
      title: 'Services',
      link: '/services'
    }, {
      title: "Terms of Service",
      link: '/terms-of-service'
    }, {
      title: 'Contact',
      link: '/contact'
    }, {
      title: 'Blog Post',
      link: '/blog'
    }
  ]

  return (
    <footer className="py-24 px-8 bg-slate-900 relative">
      <div className="flex flex-col xl:flex-row w-full justify-evenly gap-8">
        <div className="flex flex-col text-white gap-6">
          <h3 className="text-xl uppercase font-bold">Contact Us</h3>
          <div className="relative yellow-block bg-blue-800 h-1 w-10"></div>
          <div className="flex">
            <div className="flex">
              <div className="bg-blue-800 rounded-full flex justify-center items-center p-6 basis-full shrink"><BsEnvelope className="text-3xl" /></div>
            </div>
            <div className="flex ml-5 text-lg break-all">
              <div className="flex flex-col justify-center">
                <p className="uppercase font-bold">Email:</p>
                <p>{email}</p>
              </div>
            </div>
          </div>
          <div className="flex ">
            <div className="flex">
              <div className="bg-blue-800 rounded-full flex justify-center items-center p-6 basis-full shrink"><BsPhone className="text-3xl" /></div>
            </div>
            <div className="flex ml-5 text-lg">
              <div className="flex flex-col justify-center">
                <p className="uppercase font-bold">Phone:</p>
                <p>{formattedPhone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-white gap-6">
          <h3 className="text-xl uppercase font-bold">Quick Links</h3>
          <div className="relative yellow-block bg-blue-800 h-1 w-10"></div>
          <div className="flex">
            <div className="flex text-lg">
              <ul className="grid grid-cols-3 gap-8 list-disc">
                {footerLinks.map((link, index) => (
                  <li key={index} className="hover:text-yellow-500">
                    <a href={link.link}>{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 xl:w-[320px]">
          <div className="bg-blue-800 h-full xl:w-[320px] xl:absolute xl:top-0 flex flex-col justify-center gap-4 px-8 py-4" style={{ background: "rgba(30,64,175,0.7) url(/assets/svg/waves-background.svg) no-repeat center center / 3000px" }}>
            <h6 className="uppercase text-white font-bold text-2xl">Subscribe to our newletter</h6>
            <p className="text-sm font-thin text-white">Get weekly discounts from us and our partners</p>
            <Form className="flex flex-col gap-2">
              <label htmlFor="name" className="text-white uppercase font-bold">Name</label>
              <input type="text" name="name" id="name" className="px-8 xl:h-14 " placeholder="Enter Your Name" />
              <label htmlFor="name" className="text-white uppercase font-bold">Email</label>
              <input type="text" name="email" id="email" className="px-8 xl:h-14" placeholder="Email Address:" />
              <div className="flex">
                <button type="submit" className="mt-4 flex items-center bg-yellow-400 py-3 px-4 gap-4"><span>Join Now</span><BsSendFill /></button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </footer>
  );
};