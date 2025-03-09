import React from "react";
import { assets } from "../assets/assets";

function Contact() {
  return (
    <div>
      <div className="pt-10 text-center text-2xl text-gray-500">
        <p>
          CONTACT <span className="font-semibold text-gray-700">US</span>
        </p>
      </div>

      <div>
        <div className="my-10 mb-28 flex flex-col justify-center gap-10 text-sm md:flex-row">
          <img
            src={assets.contact_image}
            className="w-full md:max-w-[360px]"
            alt=""
          />
          <div className="flex flex-col items-start justify-center gap-6">
            <p className="text-lg font-semibold text-gray-600">OUR OFFICE</p>
            <p className="text-gray-500">
              00000 Willms Station <br />
              Suite 000, Washington, USA
            </p>
            <p className="text-gray-500">
              Tel: (000) 000-0000 <br />
              Email: greatstackdev@gmail.com
            </p>
            <p className="text-lg font-semibold text-gray-600">
              CAREERS AT PRESCRIPTO
            </p>
            <p className="text-gray-500">
              Learn more about our teams and job openings.
            </p>
            <button className="border border-black px-8 py-4 text-sm transition-all duration-500 hover:bg-black hover:text-white">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
