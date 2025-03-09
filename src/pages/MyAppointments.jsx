import React, { useContext } from "react";
import Doctors from "./Doctors";
import { AppContext } from "../context/AppContext";

function MyAppointment() {
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <p className="mt-12 border-b  pb-3 font-medium text-zinc-700">
        {" "}
        My Appointments
      </p>
      {doctors.slice(0, 5).map((doc, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_2fr] gap-4 border-b py-2 sm:flex sm:gap-6 "
        >
          <div>
            <img className="w-36 bg-indigo-50" src={doc.image} alt="" />
          </div>
          <div className="flex-1 text-sm text-zinc-600">
            <p className="font-semibold text-neutral-800">{doc.name}</p>
            <p>{doc.speciality}</p>
            <p className="mt-1 font-medium text-zinc-700">Address : </p>
            <p className="text-sm"> {doc.address.line1}</p>
            <p className="text-sm">{doc.address.line2}</p>
            <p className="mt-1 text-sm">
              <span className="text-sm font-medium text-neutral-700">
                Date & Time :{" "}
              </span>
              12 Apr 2025 | 10:30 AM
            </p>
          </div>
          <div></div>
          <div className="flex flex-col gap-2 justify-end">
            <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6fff] hover:text-white transition-all duration-300">Pay Online</button>
            <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white animation-all duration-300">Cancel Appointment</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyAppointment;
