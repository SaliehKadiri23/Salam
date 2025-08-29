import { createSlice } from '@reduxjs/toolkit';
import {
  MessageSquare,
  HelpCircle,
  Users,
  Heart,
  HandHeart,
  BookOpen,
  Calendar,
  Star,
  ArrowRight,
  Globe,
  Clock,
  MapPin,
  Stars
} from "lucide-react";


const initialState = {
  forumCategories: [
    {
      title: "New Muslims & Converts",
      description: "A welcoming space for those new to Islam",
      icon: 'Heart',
      posts: 234,
      color: "from-emerald-50 to-green-50 border-emerald-200",
    },
    {
      title: "Parenting & Family",
      description: "Share advice on raising a Muslim family",
      icon: 'Stars',
      posts: 567,
      color: "from-blue-50 to-indigo-50 border-blue-200",
    },
    {
      title: "Youth Corner",
      description: "Discussions for the younger generation",
      icon: 'Star',
      posts: 432,
      color: "from-purple-50 to-violet-50 border-purple-200",
    },
  ],
  scholarQA: [
    {
      question: "What is the ruling on fasting while traveling?",
      askedBy: "Omar H.",
      status: "answered",
    },
    {
      question: "How can I improve my focus during Salah?",
      askedBy: "Fatima A.",
      status: "pending",
    },
    {
      question: "Is it permissible to use a prayer app for Qibla direction?",
      askedBy: "Ahmed M.",
      status: "answered",
    },
  ],
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