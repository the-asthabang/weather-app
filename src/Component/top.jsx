import React, { useEffect, useState } from "react";

const Top = ({ setQuery, currentQuery }) => {
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem("city_history");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const queryCity = currentQuery?.q?.toLowerCase();
    if (queryCity) {
      setHistory((prev) => {
        const filtered = prev.filter((city) => city !== queryCity);
        const updated = [queryCity, ...filtered].slice(0, 5);
        localStorage.setItem("city_history", JSON.stringify(updated));
        return updated;
      });
    }
  }, [currentQuery?.q]);

  const formatCityName = (city) =>
    city.charAt(0).toUpperCase() + city.slice(1);

  const activeCity = currentQuery?.q?.toLowerCase();

  return (
    <div className="flex flex-col items-center mt-4 space-y-1">
      {/* City List Scroll */}
      {history.length > 0 && (
        <div className="flex overflow-x-auto no-scrollbar space-x-6 px-4">
          {history.map((city, index) => (
            <button
              key={`history-${index}`}
              className={`text-sm sm:text-base font-medium px-3 py-1 rounded-md transition ${
                city === activeCity
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-400"
              }`}
              onClick={() => setQuery({ q: city })}
            >
              {formatCityName(city)}
            </button>
          ))}
        </div>
      )}

      {/* Dot Indicator */}
      <div className="flex justify-center space-x-2">
        {history.map((city, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full ${
              city === activeCity ? "bg-orange-500" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Top;
