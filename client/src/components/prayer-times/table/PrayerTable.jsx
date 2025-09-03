import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BookOpen, Moon, Sunrise, Sun, Sunset } from "lucide-react";
import { calculateTimeLeft } from "../utils/timeHelpers";
import { convertTo12HourFormat } from "../utils/timeFormat";
import DuaModal from "../modal/DuaModal";

// Map icon strings to actual icon components
const iconMap = {
  Moon,
  Sunrise,
  Sun,
  Sunset,
};

// Dua translations and transliterations
const duaDetails = {
  fajr: {
    transliteration: "Allahumma barik lana fi ma razaqtana",
    translation: "O Allah, bless us in what You have provided us"
  },
  sunrise: {
    transliteration: "Subhanaka Allahumma wa bihamdika, ashhadu an la ilaha illa anta, astaghfiruka wa atubu ilayk",
    translation: "Glory is to You, O Allah, and praise is Yours. I bear witness that there is none worthy of worship except You. I seek Your forgiveness and turn to You in repentance"
  },
  dhuhr: {
    transliteration: "Rabbana atina fi'd-dunya hasanatan wa fi'l-akhirati hasanatan wa qina 'adhab an-nar",
    translation: "Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire"
  },
  asr: {
    transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
    translation: "O Allah, help me remember You, to thank You, and to worship You in the best manner"
  },
  maghrib: {
    transliteration: "Allahumma a'idhni min an-nar",
    translation: "O Allah, save me from the Fire"
  },
  isha: {
    transliteration: "Allahumma aslamtu nafsi ilayk, fa amitni musliman wa ahyini musliman wa najini min adhab an-nar",
    translation: "O Allah, I surrender my soul to You. Make my death in Islam, revive me in Islam, and save me from the punishment of the Fire"
  }
};

const PrayerTable = ({ currentTime }) => {
  // Getting prayerTimes from Redux store
  const prayerTimes = useSelector((state) => state.prayerTimes.prayerTimes);
  
  // Get duas from Redux store
  const duas = useSelector((state) => state.islamicUtilities.duas);
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDua, setSelectedDua] = useState({
    prayerName: "",
    dua: "",
    transliteration: "",
    translation: ""
  });

  // Handle opening the modal with dua details
  const handleOpenDuaModal = (prayerName) => {
    const prayerKey = prayerName.toLowerCase();
    const dua = duas[prayerKey] || "No dua available";
    const details = duaDetails[prayerKey] || {};
    
    setSelectedDua({
      prayerName,
      dua,
      transliteration: details.transliteration || "",
      translation: details.translation || ""
    });
    
    setIsModalOpen(true);
  };

  return (
    <>
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
                  Time Left
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                  Dua
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-emerald-600">
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
                      {prayer.name === "Sunrise" 
                        ? convertTo12HourFormat(prayer.begins) 
                        : (prayer.iqama !== "-" 
                            ? convertTo12HourFormat(prayer.iqama) 
                            : convertTo12HourFormat(prayer.begins))}
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
                        className="text-amber-600 hover:text-amber-700 transition-colors p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20"
                        onClick={() => handleOpenDuaModal(prayer.name)}
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
      
      {/* Dua Modal */}
      <DuaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prayerName={selectedDua.prayerName}
        dua={selectedDua.dua}
        transliteration={selectedDua.transliteration}
        translation={selectedDua.translation}
      />
    </>
  );
};

export default PrayerTable;