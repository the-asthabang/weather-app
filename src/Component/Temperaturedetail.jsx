import React from "react";
import { RxValue } from "react-icons/rx";
import {
  WiSunrise,
  WiSunset,
  WiStrongWind,
  WiThermometer,
} from "react-icons/wi";
import { WiDirectionDown } from "react-icons/wi";
import { WiDirectionUp } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";

const TemperatureDetail = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {
  const verticalDetail = [
    {
      id: 1,
      Icon: WiThermometer,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: WiHumidity,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: WiStrongWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`,
    },
  ];

  const horizontalDetail = [
    {
      id: 4,
      Icon: WiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 5,
      Icon: WiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 6,
      Icon: WiDirectionUp,
      title: "High Temp",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 7,
      Icon: WiDirectionDown,
      title: "Low Temp",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <div className="sm:flex sm:flex-col-reverse lg:flex-col">
      <div className="flex items-center justify-center py-1 lg:p-6 text-xl text-red-950">
        <p>{details}</p>
      </div>

      <div className="flex lg:flex-row p-3 flex-col-reverse items-center justify-between ">
        <img src={icon} alt="weather icon" className="lg:w-20 w-10 " />

        <p className="text-5xl">{`${temp.toFixed()}°`}</p>

        <div className="lg:flex hidden flex-col space-y-3 mb-9 items-start">
          {verticalDetail.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex font-light text-base items-center justify-center"
            >
              <Icon size={25} className="mr-1" />
              <span className="text-xl">{title}:</span>
              <span className="font-medium text-lg ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:flex flex-row items-center justify-center space-x-10 text-lg py-3 hidden">
        {horizontalDetail.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex flex-row items-center">
            <Icon size={35} />
            <p className="font-light ml-1">
              {title}:<span className="font-normal ml-1">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemperatureDetail;
