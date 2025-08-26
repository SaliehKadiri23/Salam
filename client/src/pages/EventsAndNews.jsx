import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/events/Sidebar";
import { TabNavigation } from "../components/events/EventComponents";
import { EventsContent, NewsContent } from "../components/events/Content";
import { motion } from "framer-motion";

const EventsAndNews = () => {
  const {
    activeTab,
    selectedCategory,
    eventsData,
    newsData,
  } = useSelector((state) => state.eventsAndNews);

  // Computed values
  const filteredEvents = useMemo(() => {
    return selectedCategory === "all"
      ? eventsData
      : eventsData.filter((event) => event.category === selectedCategory);
  }, [eventsData, selectedCategory]);

  const featuredEvents = useMemo(() => {
    return activeTab === "events"
      ? eventsData.filter((event) => event.featured).slice(0, 3)
      : newsData.filter((news) => news.featured).slice(0, 3);
  }, [eventsData, newsData, activeTab]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return eventsData
      .filter((event) => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 4);
  }, [eventsData]);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-600 dark:to-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar upcomingEvents={upcomingEvents} />

          <div className="lg:col-span-3 space-y-8">
            {/* Page Header */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:text-gray-100 mb-4">
                Events & News
              </h1>
              <p className="text-lg text-slate-600 dark:text-gray-300 max-w-2xl">
                Stay connected with our vibrant Islamic community through
                upcoming events and latest news.
              </p>
            </div>

            <TabNavigation />

            {activeTab === "events" && (
              <EventsContent
                featuredEvents={featuredEvents}
                filteredEvents={filteredEvents}
              />
            )}

            {activeTab === "news" && <NewsContent />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventsAndNews;
