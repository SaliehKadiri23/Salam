import React from "react";
import { useSelector } from "react-redux";
import {
  CategoryFilters,
  EventCard,
  EventListItem,
  NewsCard,
} from "./EventComponents";
import { motion } from "framer-motion";

// Events Content Component
export const EventsContent = ({ featuredEvents, filteredEvents }) => (
  <>
    <CategoryFilters />

    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {featuredEvents.map((event, index) => (
          <motion.div
            initial={{
              opacity: 0,
              y: 70 + index * 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.55 + 0.15 * index },
            }}
            exit={{
              opacity: 0,
              y: 70,
            }}
            viewport={{ once: true }}
          >
            <EventCard key={event.id} event={event} />
          </motion.div>
        ))}
      </div>
    </div>

    <div className="overflow-hidden">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">All Events</h2>
      <div className="space-y-4">
        {filteredEvents.map((event, index) => (
          <motion.div
            initial={{
              opacity: 0,
              x: 50 + index * 13,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.45 + 0.15 * index },
            }}
            exit={{
              opacity: 0,
              x: 50,
            }}
            viewport={{ once: true }}
          >
            <EventListItem key={event.id} event={event} />
          </motion.div>
        ))}
      </div>
    </div>
  </>
);

// News Content Component
export const NewsContent = () => {
  const newsData = useSelector((state) => state.eventsAndNews.newsData);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {newsData.map((news, index) => (
          <motion.div
            initial={{
              opacity: 0,
              y: 70 + index * 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.55 + 0.15 * index },
            }}
            exit={{
              opacity: 0,
              y: 70,
            }}
            viewport={{ once: true }}
          >
            <NewsCard key={news.id} news={news} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
