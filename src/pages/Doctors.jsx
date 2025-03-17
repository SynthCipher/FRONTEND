import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { GoDotFill } from "react-icons/go";

function Doctors() {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () => {
    if (speciality) {
      // const filtered = doctors.filter(doctor => doctor.speciality===speciality))
      setFilterDoc(
        doctors.filter((doctor) => doctor.speciality === speciality),
      );
    } else {
      setFilterDoc(doctors);
    }
  };
  console.log(speciality);

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row">
        <button
          className={`rounded border px-3 py-1 text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""} `}
          onClick={() => setShowFilter(!showFilter)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"} `}
        >
          <p
            className={`w-[94vw] cursor-pointer rounded border border-gray-300 py-1.5 pr-16 pl-3 transition-all sm:w-auto ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
          >
            General physician
          </p>
          <p
            className={`w-[94vw] cursor-pointer rounded border border-gray-300 py-1.5 pr-16 pl-3 transition-all sm:w-auto ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate(`/doctors/Gynecologist`)
            }
          >
            Gynecologist
          </p>
          <p
            className={`w-[94vw] cursor-pointer rounded border border-gray-300 py-1.5 pr-16 pl-3 transition-all sm:w-auto ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate(`/doctors/Dermatologist`)
            }
          >
            Dermatologist
          </p>
          <p
            className={`w-[94vw] cursor-pointer rounded border border-gray-300 py-1.5 pr-16 pl-3 transition-all sm:w-auto ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate(`/doctors/Pediatricians`)
            }
          >
            Pediatricians
          </p>
          <p
            className={`w-[94vw] cursor-pointer rounded border border-gray-300 py-1.5 pr-16 pl-3 transition-all sm:w-auto ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate(`/doctors/Neurologist`)
            }
          >
            Neurologist
          </p>
          <p
            className={`w-[94vw] cursor-pointer rounded border border-gray-300 py-1.5 pr-16 pl-3 transition-all sm:w-auto ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate(`/doctors/Gastroenterologist`)
            }
          >
            Gastroenterologist
          </p>
        </div>

        <div className="grid-cols-auto grid w-full gap-4 gap-y-6">
          {filterDoc.map((doctor, index) => (
            <div
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              key={index}
              className="cursor-pointer overflow-hidden rounded-xl border border-blue-200 transition-all duration-500 hover:translate-y-[-10px]"
            >
              {/* <Link key={index} to={`/appointment/${doctor._id}`}> */}
              <img
                className="bg-blue-50"
                src={doctor.image}
                alt="doctorImage"
              />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-center text-sm ${doctor.available ? "text-green-500" : "text-gray-500"}`}
                >
                  <p>
                    <GoDotFill />
                  </p>
                  <p>Available</p>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  {doctor.name}
                </p>
                <p className="text-sm text-gray-600">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
