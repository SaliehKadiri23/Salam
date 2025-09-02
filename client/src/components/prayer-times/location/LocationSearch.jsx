import React from "react";
import { useSelector } from "react-redux";
import { MapPin } from "lucide-react";

const LocationSearch = ({ handleUseMyLocation }) => {
  const { location } = useSelector((state) => state.prayerTimes);

  return (
    <div className="mx-auto max-w-4xl px-4 mb-8">
      <div className="flex justify-center">
        <button
          onClick={handleUseMyLocation}
          disabled={location === "Detecting location..."}
          className="flex justify-center bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-3 rounded-xl font-medium items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none whitespace-nowrap"
        >
          <MapPin className="h-5 w-5" />
          <span className="">
            {location === "Detecting location..."
              ? "Detecting..."
              : "Use My IP Address"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default LocationSearch;
