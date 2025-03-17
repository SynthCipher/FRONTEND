import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function MyProfile() {
  const { userData, setUserData, backendUrl, token, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {

    try {
      const formData = new FormData();

      formData.append('name',userData.name);
      formData.append('phone',userData.phone);
      formData.append('address',JSON.stringify(userData.address));
      formData.append('gender',userData.gender);
      formData.append('dob',userData.dob);

      image && formData.append('image',image)

      const {data}=await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}}  )
      
      if(data.success){
        toast.success(data.message)
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      }else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }

  };

  return (
    userData && (
      <div className="flex max-w-lg flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image):userData.image} alt="" />
              <img className="w-10 absolute bottom-12 right-12 " src={image ?'': assets.upload_icon} alt="" />
              {/* <img src="" alt="" /> */}
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image"  hidden/>
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="" />
        )}
        {isEdit ? (
          <input
            className="mt-4 max-w-80 rounded border-1 border-gray-300 bg-gray-100 pl-2 text-3xl font-medium"
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={userData.name}
          />
        ) : (
          <p className="mt-4 text-3xl font-medium text-neutral-800">
            {userData.name}
          </p>
        )}
        <hr className="h-[1px] border-none bg-zinc-400" />

        <div>
          <p className="mt-3 text-neutral-500 underline">CONTACT INFORMATION</p>
          <div className="mt-3 grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
            <p className="font-medium">Email id : </p>
            <p className="text-primary">{userData.email}</p>

            <p className="font-medium">Phone: </p>
            {isEdit ? (
              <input
                className="max-w-52 bg-gray-100 pl-2"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                value={userData.phone}
              />
            ) : (
              <p className="text-primary">{userData.phone}</p>
            )}

            <p className="font-medium">Address: </p>
            {isEdit ? (
              <p>
                <input
                  className="max-w-52 bg-gray-100 pl-2"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                />
                <br />
                <input
                  className="mt-2 max-w-52 bg-gray-100 pl-2"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                />
              </p>
            ) : (
              <p className="text-gray-400">
                {userData.address.line1} <br /> {userData.address.line2}{" "}
              </p>
            )}
          </div>

          <p className="mt-3 text-neutral-500 underline">BASIC INFORMATION</p>
          <div className="mt-3 grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
            <p className="font-medium">Gender : </p>
            {isEdit ? (
              <p>
                <select
                  className="max-w-20 bg-gray-100"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userData.gender}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </p>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}

            <p className="font-medium">Birthday: </p>
            {isEdit ? (
              <input
                className="max-w-28 bg-gray-100"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-10">
          {isEdit ? (
            <button
              className="border-primary rounded-full border px-8 py-2 transition-all hover:bg-[#5f6fff] hover:text-white"
              onClick={updateUserProfileData}
            >
              {" "}
              Save Information
            </button>
          ) : (
            <button
              className="border-primary rounded-full border px-8 py-2 transition-all hover:bg-[#5f6fff] hover:text-white"
              onClick={() => setIsEdit(true)}
            >
              {" "}
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
}

export default MyProfile;
