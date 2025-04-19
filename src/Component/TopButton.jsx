import React, { useEffect, useState } from "react";

const TopButton = ({ setQuery, currentQuery }) => {
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

  3
  

  return (
    <div className="lg:flex hidden  items-center justify-center  mt-2 max-h-9">
      {history.length > 0 && (
        <div className="flex overflow-x-auto no-scrollbar space-x-6 px-4 ">
          {history.map((city, index) => (
            <button
              key={`history-${index}`}
              className="lg:text-lg lg:font-medium sm:font-medium text-sm hover:bg-gray-700/20 lg:px-3 py-2 space-x-6 mx-4  rounded-md transition ease-in text-orange-600"
              onClick={() => setQuery({ q: city })}
            >
              {formatCityName(city)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopButton;
