import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdPersonPinCircle, MdLocationPin } from "react-icons/md";
import { PiArrowFatRightFill, PiArrowFatDownFill } from "react-icons/pi";

const Ticket = ({passenger, period, route, index}) => {

const handleOnClick = async (route, period, index) => {
    // Handle the onClick logic here
  };

  return (
    <div
      className="flex sm:flex-col bg-slate-100 p-4 transition-all duration-150 shadow-md rounded peer-checked/ticket:hidden"
      key={index}
    >
      <div className="detail w-3/4 sm:w-full flex justify-between">
        <div className="from w-3/4 sm:w-full flex flex-col items-center justify-center">
          <span className="flex items-center gap-2">
            <span className="flex flex-col items-center justify-center">
              <MdPersonPinCircle size={30} />
              <span className="uppercase text-xs font-light">from</span>
            </span>
            <h3 className="text-3xl font-bold">{period.start_time}</h3>
          </span>
          <p className="text-xl font-medium">{route.start_location}</p>
          <p className="text-md">
            {new Date(route.date).toISOString().slice(0, 10)}
          </p>
        </div>
        <div className="icon flex flex-col items-center justify-center">
          <PiArrowFatRightFill size={30} className="sm:hidden" />
          <PiArrowFatDownFill size={30} className="hidden sm:block" />
        </div>
        <div className="to w-3/4 sm:w-full flex flex-col items-center justify-center">
          <span className="flex items-center gap-2">
            <span className="flex flex-col items-center justify-center">
              <MdLocationPin size={30} />
              <span className="uppercase text-xs font-light">to</span>
            </span>
            <h3 className="text-3xl font-bold">{period.end_time}</h3>
          </span>
          <p className="text-xl font-medium">{route.end_location}</p>
          <p className="text-md">
            {new Date(route.date).toISOString().slice(0, 10)}
          </p>
        </div>
      </div>
      <div className="button w-1/4 sm:w-full flex flex-col items-center justify-center gap-1">
        <p>{passenger} Passenger</p>
        <button
          onClick={() => handleOnClick(route, period, index)}
          className="px-4 py-1 rounded-full bg-sky-300 text-white"
        >
          {route.fare * passenger}฿
        </button>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            {passenger} <BsFillPersonFill size={18} />,
          </span>
          <span className="flex items-center">
            {route.fare}฿/
            <BsFillPersonFill size={18} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
