import React from "react";
import { useSelector } from "react-redux";
import { BookOpen, Moon, Sunrise, Sun, Sunset } from "lucide-react";
import { calculateTimeLeft } from "../utils/timeHelpers";

// Map icon strings to actual icon components
const iconMap = {
  Moon,
  Sunrise,
  Sun,
  Sunset,
};

const PrayerTable = ({ currentTime }) => {
  // Getting prayerTimes from Redux store
  const prayerTimes = useSelector((state) => state.prayerTimes.prayerTimes);
  
  // Get duas from Redux store
  const duas = useSelector((state) => state.islamicUtilities.duas);

  return (
    <div className="bg-white dark:bg-black/70 rounded-2xl shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-500 dark:to-amber-500">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                Prayer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                Begins (IQAMA)
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                Iqama
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                Time Left
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                Dua
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {prayerTimes.map((prayer, index) => {
              const IconComponent = iconMap[prayer.icon] || Sun;
              const timeLeft = calculateTimeLeft(prayer.begins, currentTime);

              return (
                <tr
                  key={prayer.name}
                  className={`transition-all duration-200 ${
                    prayer.next
                      ? "bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-200 dark:to-amber-200 border-l-4 border-emerald-500"
                      : "hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          prayer.next
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-100"
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span
                        className={`font-semibold ${
                          prayer.next
                            ? "text-emerald-700"
                            : "text-gray-700 dark:text-gray-100"
                        }`}
                      >
                        {prayer.name}
                      </span>
                    </div>
                  </td>
                  <td
                    className={`px-6 py-4 text-lg font-bold ${
                      prayer.next
                        ? "text-emerald-600"
                        : "text-gray-700 dark:text-gray-100"
                    }`}
                  >
                    {prayer.begins}
                  </td>
                  <td
                    className={`px-6 py-4 text-lg font-bold ${
                      prayer.next
                        ? "text-emerald-600"
                        : "text-gray-700 dark:text-gray-100"
                    }`}
                  >
                    {prayer.iqama}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-mono ${
                      prayer.next
                        ? "text-emerald-600 font-bold"
                        : "text-gray-500 dark:text-gray-100"
                    }`}
                  >
                    {timeLeft}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-amber-600 hover:text-amber-700 transition-colors p-2 rounded-lg hover:bg-amber-50"
                      onClick={() => {
                        alert(
                          `Dua for ${prayer.name}: ${
                            duas[prayer.name.toLowerCase()] ||
                            "No dua available"
                          }`
                        );
                      }}
                      title={`View dua for ${prayer.name}`}
                    >
                      <BookOpen className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrayerTable;