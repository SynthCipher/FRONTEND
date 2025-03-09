import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {

    const navigate = useNavigate();
    const {doctors}=useContext(AppContext);

  return (
    <div className="my-16 flex flex-col items-center gap-4 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="text-center text-sm sm:w-1/3">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="grid-cols-auto grid w-full gap-4 gap-y-6 px-3 pt-5 sm:px-0">
        {doctors.slice(0, 10).map((doctor, index) => (
          <div
          // onClick={()=>{navigate(`/appointment/${doctor._id}`); }}
          onClick={()=>{navigate(`/appointment/${doctor._id}`); scrollTo(0,0)}}
            key={index}
            className="cursor-pointer overflow-hidden rounded-xl border border-blue-200 transition-all duration-500 hover:translate-y-[-10px]"
          >
            {/* <Link key={index} to={`/appointment/${doctor._id}`}> */}
            <img className="bg-blue-50" src={doctor.image} alt="doctorImage" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-center text-sm text-green-500">
                <p>
                  <GoDotFill />
                </p>
                <p>Available</p>
              </div>
              <p className="text-lg font-medium text-gray-900">{doctor.name}</p>
              <p className="text-sm text-gray-600">{doctor.speciality}</p>
            </div>

            {/* </Link> */}
          </div>
        ))}
      </div>
      <button onClick={()=>{navigate("/Doctors"); scrollTo(0,0)}} className="mt-10 rounded-full bg-blue-50 px-12 py-3 cursor-pointer text-gray-500">
        more
      </button>
    </div>
  );
};

export default TopDoctors;
