import React, { useContext, useEffect, useState } from "react";
import Doctors from "./Doctors";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyAppointment() {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointment, setAppointment] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const navigate = useNavigate();

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    );
  };

  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointment", {
        headers: { token },
      });
      if (data.success) {
        setAppointment(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      console.log(appointmentId);
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } },
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointment();
        getDoctorsData();
        scrollTo(0, 0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        // console.log(response);

        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } },
          );
          if (data.success) {
            getUserAppointment();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        initPay(data.order);
        console.log(data.order);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token]);

  return (
    <div>
      <p className="mt-12 border-b pb-3 font-medium text-zinc-700">
        {" "}
        My Appointments
      </p>
      {appointment.map((doc, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_2fr] gap-4 border-b py-2 sm:flex sm:gap-6"
        >
          <div>
            <img className="w-36 bg-indigo-50" src={doc.docData.image} alt="" />
          </div>
          <div className="flex-1 text-sm text-zinc-600">
            <p className="font-semibold text-neutral-800">{doc.docData.name}</p>
            <p>{doc.speciality}</p>
            <p className="mt-1 font-medium text-zinc-700">Address : </p>
            <p className="text-sm"> {doc.docData.address.line1}</p>
            <p className="text-sm">{doc.docData.address.line2}</p>
    
            
            <p className="mt-1 text-sm">
              <span className="text-sm font-medium text-neutral-700">
                Date & Time :{" "}
              </span>
              {slotDateFormat(doc.slotDate)} | {doc.slotTime}
            </p>
          </div>
          <div></div>
          <div className="flex flex-col justify-end gap-2">
            {!doc.appointment && doc.payment && !doc.isCompleted && 
            <button className="sm:min-w-48 py-2 border border-black rounded text-white bg-indigo-400"> Paid</button>

            }
            {!doc.cancelled && !doc.payment && !doc.isCompleted &&(
              <button
                onClick={() => appointmentRazorpay(doc._id)}
                className="cursor-pointer rounded border py-2 text-center text-sm text-stone-500 transition-all duration-300 hover:bg-[#5f6fff] hover:text-white sm:min-w-48"
              >
                Pay Online
              </button>
            )}
            {!doc.cancelled &&  !doc.isCompleted &&  (
              <button
                onClick={() => {
                  cancelAppointment(doc._id);
                }}
                className="animation-all rounded border py-2 text-center text-sm text-stone-500 duration-300 hover:bg-red-600 hover:text-white sm:min-w-48"
              >
                Cancel Appointment
              </button>
            )}
            {doc.cancelled &&   !doc.isCompleted &&  (
              <button className="rounded border border-red-500 py-2 text-center text-sm text-red-500 duration-300 sm:min-w-48">
                Appointment Cancelled
              </button>
            )}
            {doc.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyAppointment;
