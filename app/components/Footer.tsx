import { BsEnvelope, BsPhone } from "react-icons/bs";

export default function Footer({ business }) {
  const { phone, email } = business;
  const areaCode = phone.substring(0, 3)
  const number = phone.substring(4, 7)
  const lastFour = phone.substring(6, 9)
  const formattedPhone = `(${areaCode}) ${number}-${lastFour}`



  return (
    <footer className="py-24 px-8 bg-slate-900">
      <div className="flex flex-col text-white gap-6">
        <h3 className="text-xl uppercase font-bold">Contact Us</h3>
        <div className="relative yellow-block bg-blue-800 h-1 w-10"></div>
        <div className="flex ">
          <div className="flex">
            <div className="bg-blue-800 rounded-full flex justify-center items-center p-6 basis-full shrink"><BsEnvelope className="text-3xl" /></div>
          </div>
          <div className="flex ml-5 text-lg">
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
    </footer>
  );
};