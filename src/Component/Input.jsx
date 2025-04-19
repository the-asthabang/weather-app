import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";

const Input = ({ setQuery, setunits, units }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city.trim() !== "") setQuery({ q: city });
  };

  const handlelocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  const getUnitClass = (unitType) =>
    `px-2 py-1 rounded-md text-2xl transition scale-125 ${
    unitType === units ? "text-orange-500 font-bold" : "text-gray-500"
  }`;

  return (
    <div className="flex flex-row justify-center w-full my-6 items-center">
      <div className="flex flex-row  w-full lg:w-3/4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          className="text-gray-500 px-4 lg:px-6 lg:text-xl text-base font-light p-2 w-full lg:h-14 h-9 shadow-xl outline-none m-1 active:outline-gray-700 rounded-lg"
          placeholder="Search your city..."
        />
        <IoSearchOutline
          size={30}
          onClick={handleSearchClick}
          className="cursor-pointer transition m-2  lg:m-3 ease-out hover:scale-125"
        />
        <SlLocationPin
          size={30}
          onClick={handlelocationClick}
          className="cursor-pointer transition m-2 lg:m-3 ease-out hover:scale-125"
        />
      </div>

      <div className="lg:flex hidden flex-row lg:w-1/4 items-center justify-center gap-4">
        <button className={getUnitClass("metric")} onClick={() => setunits("metric")}>
          °C
        </button>
        <button className={getUnitClass("imperial")} onClick={() => setunits("imperial")}>
          °F
        </button>
      </div>
    </div>
  );
};

export default Input;
