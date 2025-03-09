import React from "react";
import Doctors from "./Doctors";
import { assets } from "../assets/assets";

function About() {
  return (
    <div>
      <div className="pt-10 text-center text-2xl text-gray-500">
        <p>
          ABOUT <span className="font-medium text-gray-700">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col gap-12 md:flex-row">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 text-sm text-gray-600 md:w-2/4">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      <div className="pt-10 text-xl text-gray-500">
        <p>
          WHY <span className="font-semibold text-gray-700">CHOOSE US</span>
        </p>
      </div>

      <div className="mb-20 flex flex-col gap-2 md:flex-row md:gap-2 mt-4">
        {/* <div className="bg-primary flex cursor-pointer flex-col gap-5 border px-10 py-8 text-[15px] text-gray-600 transition-all duration-300 hover:text-white sm:py-16 md:px-16"> */}
       <div className="hover:bg-[#5f6fff] flex cursor-pointer flex-col gap-5 border px-10 py-8 text-[15px] text-gray-600 transition-all duration-300 hover:text-white sm:py-16 md:px-16">
          <b>EFFICIENCY:</b>
          <p>appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="hover:bg-[#5f6fff] flex cursor-pointer flex-col gap-5 border px-10 py-8 text-[15px] text-gray-600 transition-all duration-300 hover:text-white sm:py-16 md:px-16">

          <b>CONVENIENCE:</b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="hover:bg-[#5f6fff] flex cursor-pointer flex-col gap-5 border px-10 py-8 text-[15px] text-gray-600 transition-all duration-300 hover:text-white sm:py-16 md:px-16">

          <b>PERSONALIZATION:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
