import React from 'react';
import { Star } from 'lucide-react';

const QuranicVerse = ({ verse }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 py-16">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-islamic-pattern-light"></div>

      <div className="relative container mx-auto px-6 text-center">
        <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 max-w-4xl mx-auto border border-white/20 shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <Star className="text-yellow-300 w-8 h-8 mr-2" />
            <h2 className="text-2xl font-bold text-white">
              Verse of the Day
            </h2>
            <Star className="text-yellow-300 w-8 h-8 ml-2" />
          </div>

          <div className="space-y-4">
            <p
              className="text-3xl text-white leading-relaxed font-semibold"
              dir="rtl"
              style={{ fontFamily: "Amiri, serif" }}
            >
              {verse.arabic}
            </p>
            <p className="text-lg text-green-100 italic">
              {verse.transliteration}
            </p>
            <p className="text-xl text-white font-medium">
              "{verse.translation}"
            </p>
            <p className="text-green-200 font-semibold">
              {verse.reference}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuranicVerse;