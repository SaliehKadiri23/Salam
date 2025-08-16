import { createSlice } from '@reduxjs/toolkit';

const resourcesData = [
    {
      id: 1,
      title: "The Essence of Faith",
      description:
        "Explore the core principles of Islam and strengthen your spiritual foundation",
      category: "aqidah",
      type: "article",
      duration: "15 min read",
      author: "Dr. Ahmed Hassan",
      rating: 4.9,
      views: 2340,
      image:
        "https://images.unsplash.com/photo-1584502062692-99d0115f3f79?w=400&h=300&fit=crop",
      tags: ["faith", "basics", "spirituality"],
      publishedDate: "2024-01-15",
      estimatedTime: 15,
      chapters: [
        { id: 1, title: "Introduction to Faith", duration: 5 },
        { id: 2, title: "The Six Pillars of Iman", duration: 7 },
        { id: 3, title: "Strengthening Your Faith", duration: 3 },
      ],
      downloads: [
        { name: "Faith Guide PDF", size: "2.3 MB", type: "pdf" },
        { name: "Audio Recitation", size: "15.7 MB", type: "audio" },
      ],
    },
    {
      id: 2,
      title: "Understanding Islamic Art",
      description:
        "Discover the rich history, symbolism, and spiritual significance of Islamic artistic traditions",
      category: "culture",
      type: "video",
      duration: "32 min",
      author: "Fatima Al-Zahra",
      rating: 4.7,
      views: 1890,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["art", "history", "culture"],
      publishedDate: "2024-01-12",
      estimatedTime: 32,
      chapters: [
        { id: 1, title: "Origins of Islamic Art", duration: 8 },
        { id: 2, title: "Geometric Patterns", duration: 12 },
        { id: 3, title: "Calligraphy and Design", duration: 12 },
      ],
      downloads: [
        { name: "Art Pattern Templates", size: "5.2 MB", type: "zip" },
      ],
    },
    {
      id: 3,
      title: "Family Values in Islam",
      description:
        "Learn about the importance of family relationships and responsibilities in Islamic teachings",
      category: "family",
      type: "podcast",
      duration: "28 min",
      author: "Imam Mohammad Ali",
      rating: 4.8,
      views: 3120,
      image:
        "",
      tags: ["family", "relationships", "values"],
      publishedDate: "2024-01-10",
      estimatedTime: 28,
      chapters: [
        { id: 1, title: "The Sacred Bond of Marriage", duration: 9 },
        { id: 2, title: "Raising Righteous Children", duration: 10 },
        { id: 3, title: "Honoring Parents and Elders", duration: 9 },
      ],
      downloads: [
        { name: "Family Values Handbook", size: "1.8 MB", type: "pdf" },
      ],
    },
    {
      id: 4,
      title: "Quranic Studies Advanced",
      description:
        "Deep dive into Quranic interpretation, linguistic analysis, and theological insights",
      category: "quran",
      type: "course",
      duration: "2h 15min",
      author: "Dr. Amina Yusuf",
      rating: 4.9,
      views: 890,
      image:
        "https://images.unsplash.com/photo-1544816565-c9b20136fef0?w=400&h=300&fit=crop",
      tags: ["quran", "advanced", "linguistics"],
      publishedDate: "2024-01-08",
      estimatedTime: 135,
      chapters: [
        { id: 1, title: "Principles of Tafsir", duration: 45 },
        { id: 2, title: "Arabic Language Structure", duration: 50 },
        { id: 3, title: "Historical Context", duration: 40 },
      ],
      downloads: [
        { name: "Tafsir Reference Guide", size: "12.4 MB", type: "pdf" },
        { name: "Arabic Grammar Charts", size: "3.1 MB", type: "pdf" },
      ],
    },
    {
      id: 5,
      title: "Quranic Studies Intermediate",
      description:
        "Deep dive into Quranic interpretation, linguistic analysis, and theological insights",
      category: "quran",
      type: "course",
      duration: "1h 9min",
      author: "Dr. Muhammad Ali",
      rating: 5.0,
      views: 18900,
      image:
        "https://images.unsplash.com/photo-1544816565-c9b20136fef0?w=400&h=300&fit=crop",
      tags: ["quran", "advanced", "linguistics"],
      publishedDate: "2025-01-08",
      estimatedTime: 135,
      chapters: [
        { id: 1, title: "Principles of Tafsir", duration: 45 },
        { id: 2, title: "Arabic Language Structure", duration: 50 },
        { id: 3, title: "Historical Context", duration: 40 },
      ],
      downloads: [
        { name: "Tafsir Reference Guide", size: "12.4 MB", type: "pdf" },
        { name: "Arabic Grammar Charts", size: "3.1 MB", type: "pdf" },
      ],
    },
  ];

const initialState = {
  all: resourcesData,
  searchQuery: '',
  selectedCategory: 'all',
  selectedType: 'all',
};

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedType,
} = resourcesSlice.actions;

export default resourcesSlice.reducer;