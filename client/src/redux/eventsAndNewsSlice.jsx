import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "events",
  selectedCategory: "all",
  registeredEvents: [],
  viewDate: new Date().toISOString(),
  selectedDate: null,
  hoveredDate: null,
  eventsData: [
    {
      id: 1,
      eventLink: "/eventslink",
      title: "Jummah Prayer & Khutbah",
      date: new Date(2020, 9, 25).toISOString(),
      time: "1:15 PM",
      location: "Main Prayer Hall",
      category: "prayer",
      attendees: 150,
      featured: true,
      registrationRequired: false,
      image: "/",
      description:
        "Weekly congregational Friday prayer with inspiring Khutbah on community unity.",
    },
    {
      id: 2,
      eventLink: "/eventslink",
      title: "Community Service Day",
      date: new Date(2024, 9, 26).toISOString(),
      time: "10:00 AM",
      location: "Local Food Bank",
      category: "community",
      attendees: 80,
      featured: false,
      registrationRequired: true,
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop&crop=center",
      description:
        "Join our community in serving those in need through volunteer work.",
    },
    {
      id: 3,
      eventLink: "/eventslink",
      title: "Islamic History Lecture",
      date: new Date(2024, 9, 30).toISOString(),
      time: "7:30 PM",
      location: "Main Hall",
      category: "education",
      attendees: 120,
      featured: false,
      registrationRequired: true,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop&crop=center",
      description:
        "Exploring the rich heritage of Islamic civilization with Dr. Amira Hassan.",
    },
    {
      id: 4,
      eventLink: "/eventslink",
      title: "Quran Study Circle",
      date: new Date(2027, 10, 5).toISOString(),
      time: "7:00 PM",
      location: "Learning Center",
      category: "education",
      attendees: 45,
      featured: false,
      registrationRequired: true,
      image:
        "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&h=250&fit=crop&crop=center",
      description: "Weekly Quran study and tafsir session. Open to all levels.",
    },
    {
      id: 5,
      eventLink: "/eventslink",
      title: "QUR'AN RECITATION",
      date: new Date(2024, 10, 15).toISOString(),
      time: "6:00 PM",
      location: "Conference Room",
      category: "community",
      attendees: 200,
      featured: true,
      registrationRequired: true,
      image: "/",
      description:
        "Building bridges between communities through meaningful dialogue.",
    },

    {
      id: 6,
      eventLink: "/eventslink",
      title: "Islamic Calligraphy Workshop",
      date: new Date(2024, 11, 5).toISOString(),
      time: "10:00 AM",
      location: "Arts Studio",
      category: "education",
      attendees: 25,
      featured: true,
      registrationRequired: true,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop&crop=center",
      description:
        "Learn the beautiful art of Arabic calligraphy with master calligrapher Ustadh Ahmad.",
    },
    {
      id: 7,
      eventLink: "/eventslink",
      title: "Charity Gala",
      date: new Date(2024, 11, 14).toISOString(),
      time: "7:30 PM",
      location: "Grand Ballroom",
      category: "community",
      attendees: 300,
      featured: true,
      registrationRequired: true,
      image:
        "duid",
      description:
        "Annual charity gala supporting local families and international relief efforts.",
    },
  ],
  newsData: [
    {
      id: 1,
      newsLink: "/eventslink",
      title: "New Islamic School Opens in Downtown",
      date: "October 20, 2024",
      category: "education",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop&crop=center",
      excerpt:
        "Al-Noor Islamic Academy welcomes its first students with state-of-the-art facilities.",
    },
    {
      id: 2,
      newsLink: "/eventslink",
      title: "Ramadan Food Drive Exceeds Goals",
      date: "October 18, 2024",
      category: "community",
      featured: true,
      image:
        "klj",
      excerpt:
        "Community raises over $50,000 and 10,000 meals for local families in need.",
    },
    {
      id: 3,
      newsLink: "/eventslink",
      title: "Interfaith Peace Conference Success",
      date: "October 15, 2024",
      category: "interfaith",
      featured: false,
      image:
        "hbjkl",
      excerpt:
        "Leaders from various faith communities gather to promote understanding and peace.",
    },
  ],
  categories: [
    { id: "all", label: "All Events", icon: "Calendar" },
    { id: "prayer", label: "Prayer", icon: "TbBuildingMosque" },
    { id: "education", label: "Education", icon: "BookOpen" },
    { id: "community", label: "Community", icon: "Heart" },
    { id: "youth", label: "Youth", icon: "Target" },
  ],
};

const eventsAndNewsSlice = createSlice({
  name: "eventsAndNews",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setViewDate: (state, action) => {
      state.viewDate = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setHoveredDate: (state, action) => {
      state.hoveredDate = action.payload;
    },
    toggleEventRegistration: (state, action) => {
      const eventId = action.payload;
      const isRegistered = state.registeredEvents.includes(eventId);
      if (isRegistered) {
        state.registeredEvents = state.registeredEvents.filter(
          (id) => id !== eventId
        );
      } else {
        state.registeredEvents.push(eventId);
      }
    },
  },
});

export const {
  setActiveTab,
  setSelectedCategory,
  setViewDate,
  setSelectedDate,
  setHoveredDate,
  toggleEventRegistration,
} = eventsAndNewsSlice.actions;

export default eventsAndNewsSlice.reducer;
