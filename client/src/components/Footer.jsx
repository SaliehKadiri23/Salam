import React, { useState } from "react";
import {
  Facebook,
  Youtube,
  Linkedin,
  Send,
  Clock,
  Heart,
  Mail,
  Phone,
  MapPin,
  Globe,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Prayer Times", href: "prayer_times" },
    { name: "Resources & Learning", href: "resources" },
    { name: "About Us", href: "about_us" },
    { name: "Events & News", href: "events" },
    { name: "Donate Charity", href: "donate" },
    { name: "Blog & Articles", href: "blog" },
    { name: "Contact Us", href: "contact_us" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Youtube, href: "#", name: "YouTube" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
    { icon: Send, href: "#", name: "TikTok" },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
    { code: "ur", name: "اردو" },
    { code: "fr", name: "Français" },
  ];

  const handleNewsletterSubmit = () => {
    if (email) {
      console.log("Newsletter signup:", email);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-emerald-300 via-emerald-800 to-emerald-900 text-white overflow-hidden">
      {/* Top Border */}
      <div className="relative h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300 to-transparent animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Brand Section */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-2">
                  سلام
                </h2>
                <div className="text-3xl font-bold text-white">SALAM</div>
                <p className="text-emerald-200 mt-2 text-sm">
                  Peace • Unity • Faith
                </p>
              </div>
              <p className="text-emerald-100 leading-relaxed max-w-md mx-auto lg:mx-0">
                Connecting the Islamic community through faith, knowledge, and
                compassion. Join us in building bridges of understanding and
                peace.
              </p>
            </div>

            {/* Prayer Times Widget */}
            <div className="bg-emerald-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 border border-yellow-400/20 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-400 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-emerald-900" />
                  </div>
                  <h3 className="font-semibold text-lg">Prayer Times</h3>
                </div>
                <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-200">Fajr</span>
                  <span className="text-white font-medium">5:32 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-200">Dhuhr</span>
                  <span className="text-white font-medium">12:45 PM</span>
                </div>
                <div className="flex justify-between border-l-2 border-yellow-400 pl-2">
                  <span className="text-yellow-400 font-medium">Asr</span>
                  <span className="text-yellow-400 font-medium">4:18 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-200">Maghrib</span>
                  <span className="text-white font-medium">7:23 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-200">Isha</span>
                  <span className="text-white font-medium">8:45 PM</span>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br transition-all duration-300 hover:scale-105 from-yellow-500/10 to-yellow-400/5 border border-yellow-400/30 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Stay Connected
              </h3>
              <p className="text-emerald-200 text-sm mb-6 text-center">
                Receive Islamic wisdom, event updates, and community news
              </p>
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-emerald-800/50 border border-emerald-600 rounded-xl text-white placeholder-emerald-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  />
                </div>
                <button
                  onClick={handleNewsletterSubmit}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-emerald-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Subscribe
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6 text-yellow-400">
              Quick Navigation
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-emerald-200 hover:text-yellow-400 transition-colors duration-300 text-sm py-1 hover:translate-x-1 transform inline-block"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-yellow-400">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div className="text-sm text-emerald-200">
                  <p>Hotoro Depot, Tarauni</p>
                  <p>Kano State, Nigeria</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <p className="text-sm text-emerald-200">+234 90 3778 6418</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <p className="text-sm text-emerald-200">info@salam.org</p>
              </div>
            </div>
          </div>

          {/* Actions & Language */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-yellow-400">
              Take Action
            </h3>
            <div className="space-y-4">
              {/* Donation Button */}
              <a href="/donate" className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 border border-yellow-400/50 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Donate Now</span>
              </a>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="w-full bg-emerald-800/50 border border-emerald-600 text-white py-3 px-4 rounded-xl transition-all hover:border-yellow-400 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>
                      {
                        languages.find((lang) => lang.code === selectedLanguage)
                          ?.name
                      }
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transform transition-transform ${
                      showLanguageDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showLanguageDropdown && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-emerald-800 border border-emerald-600 rounded-xl shadow-xl overflow-hidden z-10">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          setSelectedLanguage(language.code);
                          setShowLanguageDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-white hover:bg-emerald-700 transition-colors"
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-emerald-700/50 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Media Links */}
            <div className="flex items-center space-x-6">
              <span className="text-emerald-200 text-sm">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-emerald-800/50 hover:bg-yellow-400 text-emerald-200 hover:text-emerald-900 p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center lg:text-right">
              <p className="text-emerald-200 text-sm">
                © 2025 Salam Islamic Center. All rights reserved.
              </p>
              <p className="text-emerald-300 text-xs mt-1">
                Built with love for the Ummah
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="h-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
    </footer>
  );
};

export default Footer;
