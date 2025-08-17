import React, { useState, useEffect } from "react";
import {
  Star,
  Users,
  Heart,
  Mail,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ChevronRight,
  Home,
  MessageCircle,
  Medal,
  LucideMedal,
  MedalIcon,
} from "lucide-react";
import { TbBrandLinkedin, TbBrandTelegram, TbMedal, TbMedal2 } from "react-icons/tb";


// Glassmorphism Card
const GlassmorphismCard = ({ children, className = "" }) => (
  <div
    className={`bg-white/25 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/5 ${className}`}
  >
    {children}
  </div>
);

// Icon Wrapper with Gradient
const IconWrapper = ({
  icon: Icon,
  gradient = "from-emerald-500 to-blue-500",
}) => (
  <div
    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl mb-6 transform hover:scale-110 transition-transform duration-300`}
  >
    <Icon className="h-8 w-8 text-white" />
  </div>
);

// Stats Card
const StatCard = ({ icon: Icon, value, label, suffix = "" }) => (
  <GlassmorphismCard className="rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-500">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl mb-6 group-hover:rotate-12 transition-transform duration-300">
      <Icon className="h-8 w-8 text-white" />
    </div>
    <div className="text-4xl font-bold text-slate-800 mb-2">
      {value.toLocaleString()}
      {suffix}
    </div>
    <div className="text-slate-600 font-medium">{label}</div>
  </GlassmorphismCard>
);

// Social Media Icon
const SocialIcon = ({ icon: Icon, href, hoverColor }) => (
  <a
    href={href}
    className={`group bg-white/25 backdrop-blur-xl border border-white/20 shadow-lg w-14 h-14 rounded-2xl flex items-center justify-center text-slate-600 ${hoverColor} transform hover:scale-110 transition-all duration-300 hover:shadow-xl`}
  >
    <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
  </a>
);

const IslamicAboutPage = () => {
  const [counters, setCounters] = useState({
    users: 0,
    communities: 0,
    prayers: 0,
  });

  // Animated counters
  useEffect(() => {
    const targets = { users: 50000, communities: 500, prayers: 1000000 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters({
        users: Math.floor(targets.users * easeOut),
        communities: Math.floor(targets.communities * easeOut),
        prayers: Math.floor(targets.prayers * easeOut),
      });

      if (step >= steps) {
        clearInterval(interval);
        setCounters(targets);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

 

  const impactStats = [
    {
      icon: TbMedal,
      value: counters.users,
      label: "Active Members",
      suffix: "+",
    },
    {
      icon: Home,
      value: counters.communities,
      label: "Communities",
      suffix: "+",
    },
    {
      icon: Heart,
      value: counters.prayers,
      label: "Prayers Shared",
      suffix: "+",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", hoverColor: "hover:text-blue-600" },
    { icon: Youtube, href: "#", hoverColor: "hover:text-red-500" },
    { icon: TbBrandTelegram, href: "#", hoverColor: "hover:text-blue-500" },
    { icon: TbBrandLinkedin, href: "#", hoverColor: "hover:text-blue-800" },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-blue-50/30 relative overflow-hidden">
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <defs>
            <pattern
              id="islamic-pattern"
              x="0"
              y="0"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="25,5 35,20 50,20 40,30 45,45 25,35 5,45 10,30 0,20 15,20"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-amber-400/20 to-emerald-400/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-amber-600 bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              At Salam, we are dedicated to fostering a vibrant online community
              for Muslims worldwide. Our mission is to provide a platform that
              supports spiritual growth, facilitates meaningful connections, and
              promotes a deeper understanding of Islamic teachings and culture.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <GlassmorphismCard className="rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <IconWrapper icon={Home} />
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-slate-600 text-center max-w-4xl mx-auto leading-relaxed">
                Our mission is to create a safe and inclusive space where
                Muslims can connect, learn, and grow together. We aim to provide
                resources and tools that support spiritual development, foster
                community engagement, and promote a deeper understanding of
                Islamic teachings and culture.
              </p>
            </GlassmorphismCard>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <GlassmorphismCard className="rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <IconWrapper
                  icon={Heart}
                  gradient="from-blue-500 to-purple-500"
                />
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  Our Values
                </h2>
              </div>
              <p className="text-lg text-slate-600 text-center max-w-4xl mx-auto leading-relaxed">
                We are guided by core Islamic values, including compassion,
                respect, integrity, and community. These principles shape our
                content, interactions, and the overall experience we offer to
                our users.
              </p>
            </GlassmorphismCard>
          </div>
        </section>

        {/* Vision & Impact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Our Vision & Impact
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Building bridges across cultures and generations, creating
                lasting positive change in the Muslim community worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {impactStats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <GlassmorphismCard className="rounded-3xl p-8 md:p-12 text-center">
              <IconWrapper
                icon={Mail}
                gradient="from-amber-500 to-emerald-500"
              />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Stay Connected
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for daily inspiration, community
                updates, and spiritual guidance delivered to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full border border-black/20 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500"
                />
                <button
                  onClick={handleFormSubmit}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Subscribe
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </GlassmorphismCard>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <GlassmorphismCard className="rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <IconWrapper
                  icon={MessageCircle}
                  gradient="from-purple-500 to-pink-500"
                />
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  Contact Us
                </h2>
                <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
                  We value your feedback and are here to assist you. Please
                  reach out to us with any questions, suggestions, or concerns.
                </p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder="Your Your Name"
                  className="w-full px-6 py-4 rounded-2xl border border-black/20 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500 transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 rounded-2xl border border-black/20 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500 transition-all duration-300"
                />
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full px-6 py-4 rounded-2xl border border-black/20 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500 resize-none transition-all duration-300"
                />
                <div className="text-center">
                  <button
                    onClick={handleFormSubmit}
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Send Message
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </GlassmorphismCard>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Connect With Us
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Follow us on social media for daily inspiration, community
                stories, and updates.
              </p>

              <div className="flex justify-center gap-6">
                {socialLinks.map((social, index) => (
                  <SocialIcon
                    key={index}
                    icon={social.icon}
                    href={social.href}
                    hoverColor={social.hoverColor}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IslamicAboutPage;
