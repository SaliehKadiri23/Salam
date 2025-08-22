import React from 'react';
import QiblaCompass from './QiblaCompass';
import DhikrCounter from './DhikrCounter';
import PrayerNotifications from './PrayerNotifications';
import AdhanAudio from './AdhanAudio';

const UtilityCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <QiblaCompass />
      <DhikrCounter />
      <PrayerNotifications />
      <AdhanAudio />
    </div>
  );
};

export default UtilityCards;