import React, { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Globe,
  Shield,
  Award,
    Star,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react";
import { TbBuildingMosque } from "react-icons/tb";
import { useNavigate } from "react-router";

// ==================== UTILITY COMPONENTS ====================

const AnimatedCounter = ({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.floor(increment * currentStep));

      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(target);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const IslamicPattern = ({ className = "" }) => (
  <div className={`opacity-5 pointer-events-none ${className}`}>
    <svg width="60" height="60" viewBox="0 0 60 60" className="w-full h-full">
      <g fill="currentColor" fillRule="evenodd">
        <circle cx="30" cy="30" r="4" />
        <circle cx="15" cy="15" r="2" />
        <circle cx="45" cy="15" r="2" />
        <circle cx="15" cy="45" r="2" />
        <circle cx="45" cy="45" r="2" />
      </g>
    </svg>
  </div>
);

const FloatingShape = ({ top, left, size = 20, delay = 0, children }) => (
  <div
    className={`absolute w-${size} h-${size} opacity-20 text-emerald-500`}
    style={{
      top: `${top}%`,
      left: `${left}%`,
      animation: `float 6s ease-in-out ${delay}s infinite`,
    }}
  >
    {children}
  </div>
);

const ProgressBar = ({ percentage, animated = true }) => (
  <div className="w-full bg-emerald-100 rounded-full h-4 overflow-hidden">
    <div
      className={`bg-gradient-to-r from-emerald-500 to-green-600 h-4 rounded-full shadow-lg ${
        animated ? "transition-all duration-2000 ease-out" : ""
      }`}
      style={{ width: `${percentage}%` }}
    >
      <div className="h-full w-full bg-white/20 animate-pulse rounded-full"></div>
    </div>
  </div>
);

// ==================== SECTION COMPONENTS ====================

const HeroSection = ({ campaignData, onQuickDonate }) => (
  <section className="relative px-6 py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-hidden">
    {/* Background Pattern */}
    <div className="fixed inset-0">
      <IslamicPattern className="absolute inset-0 text-emerald-500" />
    </div>

    {/* Floating Decorations */}
    <FloatingShape top={20} left={10} size={20}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L13.09 7.26L18 4.27L15.18 9.32L21 9L16.77 12L21 15L15.18 14.68L18 19.73L13.09 16.74L12 22L10.91 16.74L6 19.73L8.82 14.68L3 15L7.23 12L3 9L8.82 9.32L6 4.27L10.91 7.26L12 2Z" />
      </svg>
    </FloatingShape>

    <FloatingShape top={60} right={10} size={16} delay={2}>
      <TbBuildingMosque className="w-full h-full" />
    </FloatingShape>

    <div className="max-w-6xl mx-auto text-center relative z-10">
      {/* Main Heading */}
      <div className="mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Give to Those in
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">
            {" "}
            Need
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Your generous donation will help us provide essential resources and
          support to Muslim communities worldwide. We are committed to
          transparency and ensuring your contributions make a meaningful impact.
        </p>
      </div>

      {/* Campaign Progress Card */}
      <CampaignProgress campaignData={campaignData} />

      {/* Quick Donate Actions */}
      <QuickDonateActions onQuickDonate={onQuickDonate} />
    </div>
  </section>
);

const CampaignProgress = ({ campaignData }) => {
  const { goal, current, donorCount } = campaignData;
  const percentage = Math.round((current / goal) * 100);

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="backdrop-blur-lg bg-white/70 rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            Campaign Progress
          </h3>
          <span className="text-2xl font-bold text-emerald-600">
            {percentage}%
          </span>
        </div>

        <ProgressBar percentage={percentage} animated={true} />

        <div className="flex justify-between items-center mt-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800">
              $<AnimatedCounter target={current} />
            </p>
            <p className="text-gray-600">Raised</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800">
              $<AnimatedCounter target={goal} />
            </p>
            <p className="text-gray-600">Goal</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800">
              <AnimatedCounter target={donorCount} />
            </p>
            <p className="text-gray-600">Donors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickDonateActions = ({ onQuickDonate }) => {
  const quickAmounts = [25, 50, 100, 250];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {quickAmounts.map((amount) => (
        <button
          key={amount}
          onClick={() => onQuickDonate(amount)}
          className="px-6 py-3 bg-white/80 hover:bg-white text-emerald-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-200 hover:border-emerald-300"
        >
          Quick Donate ${amount}
        </button>
      ))}
    </div>
  );
};

const DonationTypesSection = ({ donationTypes, onDonate }) => (
  <section className="py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Donation Options
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose how you'd like to contribute to our mission of serving Muslim
          communities worldwide
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
        {donationTypes.map((donation, index) => (
          <DonationCard
            key={donation.id}
            donation={donation}
            onDonate={onDonate}
            index={index}
          />
        ))}
      </div>
    </div>
  </section>
);

const DonationCard = ({ donation, onDonate, index }) => (
  <div
    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-emerald-200"
    style={{ animationDelay: `${index * 200}ms` }}
  >
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/3 relative overflow-hidden">
        <img
          src={donation.image}
          alt={donation.title}
          className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent pointer-events-none"></div>
      </div>

      <div className="md:w-2/3 p-8 flex flex-col relative z-10 justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
              {donation.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {donation.title}
              </h3>
              <p className="text-emerald-600 font-medium">{donation.impact}</p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">
            {donation.description}
          </p>
        </div>

        <button
          onClick={() => onDonate(donation.id)}
          className="bg-gradient-to-r from-emerald-500  to-green-600 hover:scale-105  text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 "
        >
          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Donate Now
        </button>
      </div>
    </div>
  </div>
);

const ImpactStoriesSection = ({ impactStories }) => (
  <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-green-50">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Impact</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          See how your donations have made a real difference in communities
          around the world
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {impactStories.map((story, index) => (
          <ImpactCard key={index} story={story} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const ImpactCard = ({ story, index }) => (
  <div
    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 text-center group"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div className="mb-6">
      <div className="inline-flex p-4 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform duration-300">
        {story.icon}
      </div>
    </div>

    <h3 className="text-2xl font-bold text-gray-800 mb-3">{story.title}</h3>
    <p className="text-gray-600 mb-6">{story.description}</p>

    <div className="border-t border-gray-100 pt-6">
      <p className="text-3xl font-bold text-emerald-600 mb-1">{story.number}</p>
      <p className="text-gray-600 font-medium">{story.label}</p>
    </div>
  </div>
);

const TrustIndicators = () => (
  <section className="py-16 px-6 bg-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">
        Why Donate with Salam?
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <TrustBadge
          icon={<Shield className="w-8 h-8" />}
          title="Secure Donations"
          description="SSL encrypted payments"
        />
        <TrustBadge
          icon={<Award className="w-8 h-8" />}
          title="Scholar Endorsed"
          description="Approved by Islamic scholars"
        />
        <TrustBadge
          icon={<TrendingUp className="w-8 h-8" />}
          title="100% Transparent"
          description="Full accountability reports"
        />
        <TrustBadge
          icon={<Globe className="w-8 h-8" />}
          title="Global Reach"
          description="Supporting 40+ countries"
        />
      </div>
    </div>
  </section>
);

const TrustBadge = ({ icon, title, description }) => (
  <div className="text-center group">
    <div className="inline-flex p-4 bg-emerald-100 rounded-2xl text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// ==================== MAIN COMPONENT ====================

const Donate = () => {
  const navigate = useNavigate()
  // Campaign data (this could come from props/API)
  const campaignData = {
    goal: 100000,
    current: 67500,
    donorCount: 2847,
  };

  // Donation types configuration
  const donationTypes = [
    {
      id: "zakat",
      title: "Zakat",
      description:
        "Fulfill your obligatory Zakat with us. Your contribution will be distributed to eligible recipients according to Islamic guidelines, supporting those most in need.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ4ki6C0S8y-Ft15bGsAjAkVc7nUyjMyBHrjokm7ydVTNl60U40e2frN_jrPRSQ_bSJhdAi1LdUC7QLrClzevpkqLJQCQFRKfb59vhgNLZKrMxxqgFGq3RteSeYz8LLc81WrpQkIaqnkS8ONjrZjhXywlUwtp88zSNrQ-OFteXiYbit8yf-_bDuNWyEay8diEz-rEN5zU5tAk3L2x7bo3h1SBLafdiB2Tgotdz2cLCuhPnwFzp4KozDJE4did_dxRbhWLpgtCpWWY",
      icon: <TbBuildingMosque className="w-6 h-6" />,
      impact: "2.5% of wealth annually",
    },
    {
      id: "sadaqah",
      title: "Sadaqah",
      description:
        "Give Sadaqah to support various charitable causes, from education to healthcare, and make a difference in the lives of those less fortunate.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD6GwoNDQBlnML117ivXxiijmYpsaDQsutZXdANFtBYtEXAlgiVdFE6VsJ2nh_bwy7u8F-SyOlnr2vCfLaUI00DHPuTYVmDB1eHwyH993R9GjFELIJWrZ66bIa2BEVtn4u1VSJZQseHOHouI9MNBkYf5UKph5Z3sqmNYqeawr5n5frTkNppPHa_m-7xaHw4m1u7xoMd-syLA87gZq-BjYoMsQ1c92fzJ7kuE61CLQzALB8BA9HBNrvW7r2b3tLO3lC2T1p57ho61yQ",
      icon: <Heart className="w-6 h-6" />,
      impact: "Voluntary charity",
    },
    {
      id: "general",
      title: "General Donation",
      description:
        "Make a general donation to support our ongoing programs and initiatives that benefit Muslim communities globally.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPrv8Pr3pD88N54bBFZ6Ofad-kNTZBdXEK3HLdDb9Dmt8W-MlRok_Sji52ZGT_MDmk0-Y1633t5q7RfvEtiZcSMCbOFalaknGxp0rieyUrTtQUdcFbmDBzzs8HWRFLq7iOHajsgnkO81wqAl582wXVk48BVnsb46BnX9-TrVbUcqW0qizTQCBIothlxGUQlK6LKghoKThh02tmCTqhaoywY4Hujwfe79qBGjaAUTHysAsO8AdR8M6TBELWAmWDmOGIPa4VkDnkV1o",
      icon: <Users className="w-6 h-6" />,
      impact: "Community programs",
    },
  ];

  // Impact stories data
  const impactStories = [
    {
      title: "Clean Water Access",
      description:
        "Provided clean water to 12 villages across rural communities",
      number: "5,000+",
      label: "Lives Improved",
      icon: <Globe className="w-8 h-8" />,
    },
    {
      title: "Education Support",
      description: "Funded education for orphaned children worldwide",
      number: "850",
      label: "Students Supported",
      icon: <Star className="w-8 h-8" />,
    },
    {
      title: "Emergency Relief",
      description: "Provided emergency aid to displaced families",
      number: "2,300",
      label: "Families Helped",
      icon: <Heart className="w-8 h-8" />,
    },
  ];

  // Event handlers
  const handleDonateClick = (donationType) => {
    navigate(`/donate_form?type=${donationType}`);

  };

  const handleQuickDonate = (amount) => {
    navigate(`/donate_form?type=general&amount=${amount}`)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(5px) rotate(-3deg);
          }
        }
      `}</style>

      <HeroSection
        campaignData={campaignData}
        onQuickDonate={handleQuickDonate}
      />

      <DonationTypesSection
        donationTypes={donationTypes}
        onDonate={handleDonateClick}
      />

      <ImpactStoriesSection impactStories={impactStories} />

      <TrustIndicators />
    </div>
  );
};

export default Donate;
