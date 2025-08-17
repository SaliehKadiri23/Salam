import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  campaignData: {
    goal: 100000,
    current: 67500,
    donorCount: 2847,
  },
  donationTypes: [
    {
      id: 'zakat',
      title: 'Zakat',
      description:
        'Fulfill your obligatory Zakat with us. Your contribution will be distributed to eligible recipients according to Islamic guidelines, supporting those most in need.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ4ki6C0S8y-Ft15bGsAjAkVc7nUyjMyBHrjokm7ydVTNl60U40e2frN_jrPRSQ_bSJhdAi1LdUC7QLrClzevpkqLJQCQFRKfb59vhgNLZKrMxxqgFGq3RteSeYz8LLc81WrpQkIaqnkS8ONjrZjhXywlUwtp88zSNrQ-OFteXiYbit8yf-_bDuNWyEay8diEz-rEN5zU5tAk3L2x7bo3h1SBLafdiB2Tgotdz2cLCuhPnwFzp4KozDJE4did_dxRbhWLpgtCpWWY',
      icon: 'TbBuildingMosque',
      impact: '2.5% of wealth annually',
    },
    {
      id: 'sadaqah',
      title: 'Sadaqah',
      description:
        'Give Sadaqah to support various charitable causes, from education to healthcare, and make a difference in the lives of those less fortunate.',
      image:
        '/',
      icon: 'Heart',
      impact: 'Voluntary charity',
    },
    {
      id: 'general',
      title: 'General Donation',
      description:
        'Make a general donation to support our ongoing programs and initiatives that benefit Muslim communities globally.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBPrv8Pr3pD88N54bBFZ6Ofad-kNTZBdXEK3HLdDb9Dmt8W-MlRok_Sji52ZGT_MDmk0-Y1633t5q7RfvEtiZcSMCbOFalaknGxp0rieyUrTtQUdcFbmDBzzs8HWRFLq7iOHajsgnkO81wqAl582wXVk48BVnsb46BnX9-TrVbUcqW0qizTQCBIothlxGUQlK6LKghoKThh02tmCTqhaoywY4Hujwfe79qBGjaAUTHysAsO8AdR8M6TBELWAmWDmOGIPa4VkDnkV1o',
      icon: 'Users',
      impact: 'Community programs',
    },
  ],
  impactStories: [
    {
      title: 'Clean Water Access',
      description:
        'Provided clean water to 12 villages across rural communities',
      number: '5,000+',
      label: 'Lives Improved',
      icon: 'Globe',
    },
    {
      title: 'Education Support',
      description: 'Funded education for orphaned children worldwide',
      number: '850',
      label: 'Students Supported',
      icon: 'Star',
    },
    {
      title: 'Emergency Relief',
      description: 'Provided emergency aid to displaced families',
      number: '2,300',
      label: 'Families Helped',
      icon: 'Heart',
    },
  ],
};

const donateSlice = createSlice({
  name: 'donate',
  initialState,
  reducers: {},
});

export default donateSlice.reducer;