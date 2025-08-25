import React from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const FilterControls = ({
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="mb-12 space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search articles, authors, or topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 bg-white shadow-lg"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 overflow-hidden">
        {categories.map((category, index) => (
          <motion.div
            initial={{
              opacity: 0,
              x: 60 + index * 10,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.5 + 0.15 * index },
            }}
            exit={{
              opacity: 0,
              x: 60,
            }}
            viewport={{ once: true }}
            key={category}
          >
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-green-50 border-2 border-gray-200 hover:border-green-300"
              }`}
            >
              {category}
              {category === "Latest" && (
                <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                  NEW
                </span>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FilterControls;
