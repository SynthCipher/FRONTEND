import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { IoMdArrowDropdown } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { TbMenuDeep } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { AppContext } from "../context/AppContext";
function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken } = useContext(AppContext);
  const [menuVisible, setMenuVisible] = useState(false); // State to manage dropdown visibility

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev); // Toggle the menu visibility
  };
  // Close the menu if the user clicks outside
  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown")) {
      setMenuVisible(false);
    }
  };
  React.useEffect(() => {
    // Adding event listener on mount
    document.addEventListener("click", handleClickOutside);
    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };
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
          <div className="group dropdown relative flex cursor-pointer items-center gap-1">
            <img
              src={assets.profile_pic}
              className="w-8 rounded-full"
              alt="Profile"
              // onClick={()=>setMenuVisible(true)}
              onClick={             ()=> setMenuVisible((prev) => !prev)
              }
            />
            <IoMdArrowDropdown className="text-[15px]" onClick={toggleMenu} />

            {/* Dropdown menu */}
            {menuVisible && (
              <div className="absolute top-0 right-0 z-20 pt-14 text-base font-medium text-gray-600">
                <div className="flex min-w-48 flex-col gap-4 rounded bg-stone-100 p-4">
                  <p
                    onClick={() => {
                      navigate("/my-profile");
                      setMenuVisible(false);
                    }}
                    className="cursor-pointer hover:text-black"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/my-appointments");
                      setMenuVisible(false);
                    }}
                    className="cursor-pointer hover:text-black"
                  >
                    My Appointment
                  </p>
                  <p
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            // className=" cursor-pointer rounded-full bg-[#5f6fff] px-8 py-3 font-light text-white md:block"
            className="cursor-pointer rounded-full bg-[#5f6fff] px-4 py-2 font-light text-white sm:px-6 sm:py-3 md:px-8 md:py-3"
          >
            Login
          </button>
        )}

        {/* {!token &&  <button
            onClick={() => navigate("/login")}
            className="hidden cursor-pointer rounded-full bg-[#5f6fff] px-8 py-3 font-light text-white md:block"
          >
          </button> } */}

        <TbMenuDeep
          onClick={() => setShowMenu(true)}
          className="text-[28px] text-blue-950 md:hidden"
        />

        {/* --Mobile MEnu----- */}

        <div
          onClick={() => setShowMenu(false)}
          className={` ${showMenu ? "fixed w-full" : "h-0 w-0"} top-0 right-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300 md:hidden`}
        >
          <div className="mt- flex items-center justify-between px-5 py-6">
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
            <IoClose
              className="text-3xl text-blue-950"
              onClick={() => setShowMenu(false)}
            />
          </div>
          <ul className="mt-4 flex flex-col items-center gap-2 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="inline-block rounded px-4 py-2">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="inline-block rounded px-4 py-2">ALL DOCTOR</p>
            </NavLink>
            <NavLink c onClick={() => setShowMenu(false)} to="/about">
              <p className="inline-block rounded px-4 py-2">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="inline-block rounded px-4 py-2">CONTACT</p>
            </NavLink>
          </ul>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default Navbar;
