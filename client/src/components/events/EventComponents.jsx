import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  ArrowRight,
  MessageCircle,
  CheckCircle,
  Award,
  BookOpen,
  Heart,
  Target,
} from "lucide-react";
import { TbBuildingMosque } from "react-icons/tb";
import { setActiveTab, setSelectedCategory, toggleEventRegistration } from '../../redux/eventsAndNewsSlice.jsx';
import { motion } from "framer-motion";

// Icon mapping for categories
const iconMap = {
  Calendar,
  TbBuildingMosque,
  BookOpen,
  Heart,
  Target,
};


// Tab Navigation Component
export const TabNavigation = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(state => state.eventsAndNews.activeTab);

  const tabs = [
    { id: "events", label: "Events", icon: Calendar },
    { id: "news", label: "News", icon: MessageCircle },
  ];

  return (
    <div className="flex bg-white/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => dispatch(setActiveTab(tab.id))}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeTab === tab.id
              ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md"
              : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50"
          }`}
        >
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// Category Filters Component
export const CategoryFilters = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector(state => state.eventsAndNews);

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category, index) => {
        const IconComponent = iconMap[category.icon];
        return (
          <motion.button
            initial={{
              opacity: 0,
              x: 50 + index * 10,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.45 + (0.15 * index) },
            }}
            exit={{
              opacity: 0,
              x: 50,
            }}
            viewport={{ once: true }}
            key={category.id}
            onClick={() => dispatch(setSelectedCategory(category.id))}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                : "bg-white/70 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 border border-white/20 backdrop-blur-xl"
            }`}
          >
            {IconComponent && <IconComponent className="w-4 h-4" />}
            <span>{category.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

// Event Card Component
export const EventCard = ({ event }) => {
  const dispatch = useDispatch();
  const registeredEvents = useSelector(state => state.eventsAndNews.registeredEvents);

  return (
    <div className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <div className="aspect-video overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1564769625905-50c888ceb1e8?w=400&h=250&fit=crop&crop=center";
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
          {event.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4">{event.description}</p>
        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="w-4 h-4" />
            <span>{event.attendees}</span>
          </div>
        </div>
        {event.registrationRequired && (
          <button
            onClick={() => dispatch(toggleEventRegistration(event.id))}
            className={`w-full py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              registeredEvents.includes(event.id)
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg"
            }`}
          >
            {registeredEvents.includes(event.id) ? (
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Registered</span>
              </div>
            ) : (
              "Register Now"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// Event List Item Component
export const EventListItem = ({ event }) => {
  const dispatch = useDispatch();
  const registeredEvents = useSelector(state => state.eventsAndNews.registeredEvents);

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-800 mb-1 text-sm">
              {event.title}
            </h3>
            <div className="flex items-center space-x-1 text-xs text-slate-600 mb-1">
              <Clock className="w-3 h-3" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                • {event.time}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-slate-600">
              <Award className="w-3 h-3" />
              <span>{event.attendees} attending</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-slate-600">
            <MapPin className="w-3 h-3" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
              <Share2 className="w-4 h-4 text-slate-600" />
            </button>
            {event.registrationRequired && (
              <button
                onClick={() => dispatch(toggleEventRegistration(event.id))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  registeredEvents.includes(event.id)
                    ? "bg-green-100 text-green-700"
                    : "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                }`}
              >
                {registeredEvents.includes(event.id) ? "Registered" : "Register"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-800 mb-2">{event.title}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>
                  {new Date(event.date).toLocaleDateString()} • {event.time}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 flex-shrink-0" />
                <span>{event.attendees} attending</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-slate-600" />
            </button>
            {event.registrationRequired && (
              <button
                onClick={() => dispatch(toggleEventRegistration(event.id))}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  registeredEvents.includes(event.id)
                    ? "bg-green-100 text-green-700"
                    : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg"
                }`}
              >
                {registeredEvents.includes(event.id) ? "Registered" : "Register"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// News Card Component
export const NewsCard = ({ news }) => (
  <article className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
    <div className="aspect-video overflow-hidden">
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
          {news.category}
        </span>
        <span className="text-sm text-slate-500">{news.date}</span>
      </div>
      <h3 className="font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
        {news.title}
      </h3>
      <p className="text-slate-600 text-sm mb-4">{news.excerpt}</p>
      <button className="flex items-center space-x-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
        <span>Read More</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </article>
);