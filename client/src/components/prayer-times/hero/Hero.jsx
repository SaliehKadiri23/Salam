import React from "react";
import { useSelector } from "react-redux";
import { MapPin, MessageCircle } from "lucide-react";
import {motion} from "framer-motion"

const Hero = ({ currentTime, location, currentQuote }) => {
  const { islamicQuotes } = useSelector((state) => state.islamicUtilities);

  return (
    <section className="relative overflow-hidden ">
      <div className="relative mx-auto max-w-6xl px-4 py-12">
        {/* Location & Time */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-black/80 dark:border dark:border-emerald-600 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg mb-4">
            <MapPin className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {location}
            </span>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="text-lg text-gray-600 dark:text-gray-100">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Islamic Quote */}
        <div className="bg-gradient-to-r from-emerald-600 to-amber-600 rounded-2xl p-6 text-white text-center shadow-xl">
          <MessageCircle className="h-8 w-8 mx-auto mb-4 opacity-80" />
          <p className="text-lg md:text-xl font-medium mb-2 leading-relaxed">
            "{islamicQuotes[currentQuote].text}"
          </p>
          <p className="text-emerald-100 text-sm">
            - {islamicQuotes[currentQuote].reference}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;