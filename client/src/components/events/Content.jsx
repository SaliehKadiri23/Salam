import React from 'react';
import { useSelector } from 'react-redux';
import { CategoryFilters, EventCard, EventListItem, NewsCard } from './EventComponents';

// Events Content Component
export const EventsContent = ({ featuredEvents, filteredEvents }) => (
  <>
    <CategoryFilters />

    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {featuredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">All Events</h2>
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <EventListItem
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </div>
  </>
);

// News Content Component
export const NewsContent = () => {
    const newsData = useSelector(state => state.eventsAndNews.newsData);

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {newsData.map((news) => (
                    <NewsCard key={news.id} news={news} />
                ))}
            </div>
        </div>
    )
};