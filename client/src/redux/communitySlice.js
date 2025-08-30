import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    
  duaRequests: [
    {
      text: "Please make dua for my mother's health and speedy recovery",
      author: "Abdullah",
      hearts: 47,
    },
    {
      text: "May Allah grant us success in our upcoming exams",
      author: "Maryam",
      hearts: 23,
    },
    {
      text: "Requesting duas for a new job opportunity that is halal",
      author: "Yusuf",
      hearts: 31,
    },
    {
      text: "Dua for family harmony and understanding",
      author: "Khadija",
      hearts: 15,
    },
  ],
  volunteerOpportunities: [
    {
      title: "Food Bank Volunteer",
      description: "Help sort and distribute food to those in need",
      location: "Downtown Mosque",
      icon: 'HandHeart',
      gradient: "from-emerald-500 to-green-600",
    },
    {
      title: "Quran Tutor for Children",
      description:
        "Assist young students with Quran recitation and Islamic studies",
      location: "Community Center",
      icon: 'BookOpen',
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Community Event Organizer",
      description: "Join the team to plan and execute community events",
      location: "Various Locations",
      icon: 'Calendar',
      gradient: "from-purple-500 to-violet-600",
    },
  ],
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    
  },
});

export const { } = communitySlice.actions;

export default communitySlice.reducer;