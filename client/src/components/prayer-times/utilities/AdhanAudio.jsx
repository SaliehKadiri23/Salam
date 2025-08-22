import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Volume2, Play, Pause } from 'lucide-react';
import { toggleAudio } from '../../../redux/prayerTimesSlice';

const AdhanAudio = () => {
  const dispatch = useDispatch();
  const audioPlaying = useSelector((state) => state.prayerTimes.audioPlaying);

  const handleToggleAudio = () => {
    dispatch(toggleAudio());
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
        <Volume2 className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="font-semibold text-gray-800 mb-2">Adhan Audio</h3>
      <button
        onClick={handleToggleAudio}
        className="flex items-center space-x-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
      >
        {audioPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
        <span className="text-sm">{audioPlaying ? "Pause" : "Play"}</span>
      </button>
    </div>
  );
};

export default AdhanAudio;