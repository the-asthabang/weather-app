import React from "react";

const Timelocation = ({ weather: { formattedLocalTime, name, country }, }) => {
  return (
    <div>
      <div className="flex items-center justify-center my-2 lg:my-4">
        <p className="lg:text-2xl text-base font-extralight">
          
          {formattedLocalTime}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="lg:text-4xl text-xl font-medium ">{`${name} , ${country}`}</p>
      </div>
    </div>
  );
};

export default Timelocation;
