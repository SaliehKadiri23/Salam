import { createSlice } from '@reduxjs/toolkit';

const volunteerOpportunities = [
  {
    id: 1,
    category: "Mosque Events",
    title: "Event Coordinator",
    organization: "Islamic Center of Al-Madinah",
    description:
      "Assist in planning and executing mosque events, including religious holidays and community gatherings.",
    location: "Al-Madinah",
    timeCommitment: "10-15 hours/week",
    skillLevel: "Intermediate",
    skills: ["Event Planning", "Communication", "Organization"],
    urgency: "high",
    spotsAvailable: 3,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEOEpGTApQ3l8OXbTJTEIwnYnBsZNqJ083QnGK1cYgXtpwASt9jDN_1RWFnI57db_-uXFvtb9ryzhLZUBVkXzerstBAlWyAMaOjOA8z8J46RvUS4Dwx6EPAxtdAgePiXkwjI-7THOg4Hw67paQf24LbMc6SfmLVlZrtVHeAh782FDH_Ku9JR_v2ICQg5ET8XBIi9_iNJ0MoGTb5yCnbf9hQyiiMrLtlGN95_rnqb9amOrLDHe0MdITPLQulmh8guRYTVXsJ73txFo",
    remote: false,
  },
  {
    id: 2,
    category: "Mosque Events",
    title: "Volunteer Assistant",
    organization: "Al-Noor Mosque",
    description:
      "Provide support during events, including setup, registration, and assisting attendees.",
    location: "Al-Noor",
    timeCommitment: "5-8 hours/week",
    skillLevel: "Beginner",
    skills: ["Customer Service", "Organization"],
    urgency: "medium",
    spotsAvailable: 8,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfgrObmktq0xWQUsNeRB17twYoQsOvEFaiQxuMrRV2SqKQ8o5o8FUgtFs6vUkrUgLdALNU37Bj3yj0ZostDnN6pLqK4mQ2Ag7xnZXu-gBMyLCXhUl_i9wcv5Knmmg9DrLzNPTkl54za5wrqp0HBhXSr_emD6Z2FoMK8Q9v1hWBhVmZc6v3nNHwVcBdovauNVQJb0J-PAiAsv8IKUBcXL9pJwx6qxT4Zib_1HtjGUD4pFEhX-XQ4fmhZyj5PCtkLdCds4-jKiGlxzA",
    remote: false,
  },
  {
    id: 3,
    category: "Educational Programs",
    title: "Teaching Assistant",
    organization: "Al-Falah Academy",
    description:
      "Support teachers in delivering educational programs for children and adults, including Islamic studies and language classes.",
    location: "Al-Falah",
    timeCommitment: "8-12 hours/week",
    skillLevel: "Intermediate",
    skills: ["Teaching", "Arabic", "Islamic Studies"],
    urgency: "high",
    spotsAvailable: 5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-hghCECcS9zMNJKHU8vsximzBF6tzrnkfn8imXS0uVRo2bGfo9T0knEenSh6Wpl3vAJ1QChitC4W9ib74mE_JVX8Pw0NC0NU6RMf_Zo9KIjULCr-LIH5pBZ595sAmme3MiqHGzZSm9fOan_y3zBkiVJU4QtUTuriWlScF6FuvH9eYA3w8EvlXrEnH6WK_DXmx_ftFTpGROdIh9Ig42QeIkbnn8OYXXr9Ja4DJL320URsgV7MXa3hup7BzN27EEhL4LoG8w8qfT1I",
    remote: true,
  },
  {
    id: 4,
    category: "Educational Programs",
    title: "Tutor",
    organization: "Darul Uloom Institute",
    description:
      "Provide one-on-one or small group tutoring to students in various subjects, including Quranic studies and academic subjects.",
    location: "Remote",
    timeCommitment: "6-10 hours/week",
    skillLevel: "Advanced",
    skills: ["Tutoring", "Quranic Studies", "Mathematics"],
    urgency: "medium",
    spotsAvailable: 12,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFA3La12Ox36ChuanS7t6aPHUxkyqRf5qRvte1OvAKzU1tX6QzLYqKFimvS-gkNYqreQUYlTFieaRhQDYcUnHQqyg1v_vfgOGtgMoKoPMOOrpOgd3EI9ceq1Uimqs8ZYOnqnwRjiqDlcA5zHxQQuFprRqaI_gg5aSgGPgI4ZlGCWoYK2LQNzGr3GEbBNkcrJlUbvfCsTAQgcRVaDNZLV5iRbIV6mbOtjk5q-lJf_Q2O4hwtPhkiN-aRzfLnMH0pkRhT6qJQZSP1m0",
    remote: true,
  },
  {
    id: 5,
    category: "Community Outreach",
    title: "Outreach Coordinator",
    organization: "Muslim Community Services",
    description:
      "Help organize and participate in community outreach activities, such as food drives, charity events, and interfaith dialogues.",
    location: "Multiple Locations",
    timeCommitment: "12-20 hours/week",
    skillLevel: "Intermediate",
    skills: ["Community Outreach", "Event Planning", "Public Speaking"],
    urgency: "high",
    spotsAvailable: 2,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtmXoDR0hrFKpLpc3jGMMqGDnrqFk9d7AAAQica0RYcplLboHDH70_wTdI_6Y2TAYKnP4uVJaOx72O7RcRrXX8rmqYxKwgiFswvMe1TXzEQ-ZuGbER4Km_56_vglKyxNGpsbKxYPI1daIo3BjZpFfP90z_KZweiPMsLRSZUJZnHPwkX7KZ82tL8zxvg1eIf4qIhauvDXwhnOr6HR7Rlkkn0Ge9Ms1-y8VfhjbEPUsN4Xz14mHN-16lEukWfFN3FxSPQMSrF15PrOE",
    remote: false,
  },
  {
    id: 6,
    category: "Community Outreach",
    title: "Volunteer Driver",
    organization: "Islamic Relief Organization",
    description:
      "Assist in transporting goods, supplies, or individuals to and from community events and service locations.",
    location: "Various",
    timeCommitment: "4-8 hours/week",
    skillLevel: "Beginner",
    skills: ["Driving", "Customer Service", "Reliability"],
    urgency: "low",
    spotsAvailable: 15,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9_S6337RKl_zBI14Sb-l0WXgB8RSWtK_tQ7VUyRIhV1YYge3ZcYs5N-zRJnOq2a30OruCTRAthLE94Ykg-aO0zFbQZIfms-RNBSLujT7YQ9l8VNiZFqKAuMLh_0zuHaT1rzPLe3ll9WdOI17zem-XRtMGyqVWEMovO-LK8t50y8io6s6R6P4QsYTeCPvjGt8ZJAPwCv113SsweBm3j8jC4xhcLZGMnlKzVMspKKmaVQBQNgdjWidYtEuKbtLCwy8AiYUHQEHuVpY",
    remote: false,
  },
];

const initialState = {
  opportunities: volunteerOpportunities,
};

const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {
    setOpportunities: (state, action) => {
      state.opportunities = action.payload;
    },
  },
});

export const { setOpportunities } = opportunitiesSlice.actions;
export default opportunitiesSlice.reducer;