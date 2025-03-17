import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { VscVerifiedFilled } from "react-icons/vsc";
import { IoMdInformationCircleOutline } from "react-icons/io";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

function Appointment() {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState();

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const doctorInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctorInfo);
  };

  const getAvailbleSlot = async () => {
    setDocSlots([]);

    // getting current date
    let today = new Date();
    // console.log(today);

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Setting and time of the date get with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // Setting Hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable=docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;
      
        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // increment current time by the 30 minute
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      navigate("/login");
      scrollTo(0, 0);
      return;
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      console.log(date);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      // console.log(date, day, month, year);
      const slotDate = day + "_" + month + "_" + year;
      // console.log(slotDate);

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } },
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
        scrollTo(0, 0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailbleSlot();
  }, [docInfo]);

  useEffect(() => {
    setSlotTime("");
  }, [slotIndex]);

  return (
    docInfo && (
      <div>
        {/* -------DOctor detail ------- */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div>
            <img
              className="bg-primary w-full rounded-lg sm:max-w-72"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="mx-2 mt-[-80px] flex-1 rounded-lg border border-gray-400 bg-white p-8 py-7 sm:mx-0 sm:mt-0">
            {/* ------ Doc Info : naem,degree expreriece--------- */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name} <VscVerifiedFilled className="text-blue-700" />
            </p>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}{" "}
              </p>
              <button className="rounded-full border px-2 py-0.5 text-xs">
                {docInfo.experience}
              </button>
            </div>

            {/* ------- Doctor About -----------*/}
            <div>
              <p className="mt-3 flex items-center gap-1 text-sm font-medium text-gray-900">
                About <IoMdInformationCircleOutline />
              </p>
              <p className="mt-1 max-w-[700px] text-sm text-gray-500">
                {docInfo.about}
              </p>
            </div>
            <p className="mt-4 font-medium text-gray-500">
              Appointment fee :
              <span className="text-gray-600">
                {" "}
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* --------------booking slot ---------- */}
        <div className="mt-4 font-medium text-gray-700 sm:ml-72 sm:pl-4">
          <p>Booking slots</p>
          <div className="mt-4 flex w-full items-center gap-3 overflow-x-scroll">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  key={index}
                  className={`min-w-16 cursor-pointer rounded-full py-6 text-center ${slotIndex === index ? "bg-primary text-white" : "border border-gray-200"}`}
                >
                  <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="mt-4 flex w-full items-center gap-3 overflow-x-scroll">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`flex-shrink-0 cursor-pointer rounded-full px-5 py-2 text-sm font-light ${item.time === slotTime ? "bg-primary text-white" : "border border-gray-300 text-gray-400"}`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            className="bg-primary my-6 cursor-pointer rounded-full px-14 py-3 text-sm font-light text-white"
          >
            Book an appointment
          </button>
        </div>
        {/* ------Listing Related Doctor--------------- */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
}

export default Appointment;
