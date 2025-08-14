import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Compass,
  MapPin,
  Book,
  BookOpen,
  Bookmark,
  Users,
  Calendar,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

const SalamApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState("Fajr");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const prayerTools = [
    {
      icon: Sun,
      title: "Fajr",
      subtitle: "Next prayer in 2 hours",
      color: "from-orange-400 to-red-500",
    },
    {
      icon: Compass,
      title: "Qibla Finder",
      subtitle: "Qibla direction",
      color: "from-blue-400 to-purple-500",
    },
    {
      icon: MapPin,
      title: "Mosque Finder",
      subtitle: "Find nearby mosques",
      color: "from-green-400 to-emerald-500",
    },
  ];

  const resources = [
    {
      icon: Book,
      title: "Quran",
      subtitle: "Daily verses and reflections",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: BookOpen,
      title: "Hadith",
      subtitle: "Learn about Islamic teachings",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Bookmark,
      title: "Stories",
      subtitle: "Islamic stories and wisdom",
      color: "from-yellow-400 to-orange-500",
    },
  ];

  const events = [
    {
      icon: Users,
      title: "Community Events",
      subtitle: "Upcoming community gatherings",
      color: "from-indigo-400 to-blue-500",
    },
    {
      icon: Calendar,
      title: "Islamic Calendar",
      subtitle: "Important dates in the Islamic calendar",
      color: "from-pink-400 to-rose-500",
    },
  ];

  const FeatureCard = ({ icon: Icon, title, subtitle, color }) => (
    <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20">
      <div
        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
        }}
      />

      <div className="flex items-center gap-4 relative z-10">
        <div
          className={`bg-gradient-to-r ${color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 w-0 group-hover:w-full transition-all duration-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
     
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3WZLnbjXPytAaM7utEmsWN57PudqEiWT-dKi4HlB3bmGgpEFYxlc76GQYH3GLyhdL0_ruzvpinigz0GV4loDVITG7rzWhMqnGtBeAdwVEypGq_Leh1Ev98zdNjQZ9KdMpZSHJo0NA4DrLKikdKtKeOSB8ND7XZfc4QFam6CbGQMXVNbYfV2nMjjvQDM02zdn9sZGoYM0Zo9l3tTQc8tT7YelRrBcmUNShqRIWP1_dv1Jd3shA45dzDHyfiSFCU_0olSCFEiBJJdw"
                alt="Muslim community"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                <div className="max-w-3xl">
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Your daily guide to
                    <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      {" "}
                      faith
                    </span>{" "}
                    and
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {" "}
                      community
                    </span>
                  </h2>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Explore prayer times, resources, and events tailored for
                    Muslims around the world.
                  </p>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                    <span className="mr-2">Get Started</span>
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prayer Tools Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Prayer Tools
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Essential tools to help you maintain your daily prayers and
                spiritual connection
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {prayerTools.map((tool, index) => (
                <FeatureCard key={index} {...tool} />
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Islamic Resources
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Deepen your understanding with authentic Islamic texts and
                teachings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource, index) => (
                <FeatureCard key={index} {...resource} />
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Community & Events
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay connected with your local community and important Islamic
                dates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event, index) => (
                <FeatureCard key={index} {...event} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 48 48"
                  >
                    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Salam</h3>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-md">
                Empowering the Muslim community with digital tools for spiritual
                growth, prayer assistance, and community connection.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Prayer Times", "Qibla Finder", "Quran", "Community"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Connect</h4>
              <div className="flex gap-4">
                {[
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Facebook, href: "#" },
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Salam. All rights reserved. Built with ❤️ for the Muslim
              community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SalamApp;
