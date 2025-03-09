import React, { useState } from "react";
import { assets } from "../assets/assets";
import { IoMdArrowDropdown } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  // const navigate = useNavigate();
  return (
    <div className="mb-5 flex items-center justify-between border-b border-b-gray-400 py-4 text-sm">
      <img
        onClick={() => {
          navigate("/");
          scrollTo(0, 0);
        }}
        src={assets.logo}
        alt="logo"
        className="w-44 cursor-pointer"
      />
      <ul className="hidden items-start gap-5 font-medium md:flex">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="bg-primary m-auto hidden h-0.5 w-3/5 border-none outline-none" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="bg-primary m-auto hidden h-0.5 w-3/5 border-none outline-none" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="bg-primary m-auto hidden h-0.5 w-3/5 border-none outline-none" />
        </NavLink>
        <NavLink to="contact">
          <li className="py-1">CONTACT</li>
          <hr className="bg-primary m-auto hidden h-0.5 w-3/5 border-none outline-none" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="group relative flex cursor-pointer items-center gap-1">
            <img src={assets.profile_pic} className="w-8 rounded-full" alt="" />
            <IoMdArrowDropdown className="text-[15px]" />
            {/* <img src={assets.dropdown_icon} alt="" /> */}
            <div className="absolute top-0 right-0 z-20 hidden pt-14 text-base font-medium text-gray-600 group-hover:block">
              <div className="flex min-w-48 flex-col gap-4 rounded bg-stone-100 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="cursor-pointer hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="cursor-pointer hover:text-black"
                >
                  My Appointment
                </p>
                <p
                  onClick={() => setToken(!token)}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden rounded-full bg-[#5f6fff] px-8 py-3 font-light text-white md:block"
          >
            Create Account
          </button>
        )}
        {/* <img className="w-6 md:hidden" src={assets.menu_icon} alt="" />
        <IoMenu className="text-[32px] md:hidden text-gray-500" /> */}
        <TbMenuDeep
          onClick={() => setShowMenu(true)}
          className="text-blue-950 text-[28px] md:hidden"
        />
        {/* --Mobile MEnu----- */}
        {/* {showMenu && ( */}
        <div
          className={` ${showMenu ? "fixed w-full" : "h-0 w-0"} top-0 right-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300 md:hidden`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img
              onClick={() => {
                navigate("/");
                scrollTo(0, 0);
                setShowMenu(false);
              }}
              className="w-36 cursor-pointer"
              src={assets.logo}
              alt=""
            />
            {/* <img
              className="w-7"
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                alt=""
              /> */}
            <IoClose
              className="text-3xl text-blue-950"
              onClick={() => setShowMenu(false)}
            />
          </div>
          <ul className="flex flex-col items-center gap-2 px-5 text-lg font-medium">
            <NavLink onClick={()=>setShowMenu(false)} to="/"><p  className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(false)} to="/doctors"><p className="px-4 py-2 rounded inline-block">ALL DOCTOR</p></NavLink>
            <NavLink c onClick={()=>setShowMenu(false)} to="/about"><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(false)} to="/contact"><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
          </ul>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default Navbar;
