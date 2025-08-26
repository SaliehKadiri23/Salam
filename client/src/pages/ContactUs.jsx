import React, { useState, useMemo } from "react";
import {
  Menu,
  Search,
  Phone,
  Mail,
  Send,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle,
  Users,
  Heart,
  Calendar,
  BookOpen,
  DollarSign,
  HelpCircle,
  Star,
  Stars,
} from "lucide-react";
import { TbBrandTelegram } from "react-icons/tb";
import { useNavigate } from "react-router";
import {motion} from "framer-motion";



// Contact Form 
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    
    alert("Form submitted:", formData);
  };

  // Social media icons with hover effects
  const socialIcons = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600" },
    {
      icon: TbBrandTelegram,
      href: "#",
      label: "Telegram",
      color: "hover:text-blue-500",
    },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-700",
    },
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 70,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.55 },
      }}
      exit={{
        opacity: 0,
        y: 70,
      }}
      viewport={{ once: true }}
      className="bg-white/70 dark:bg-black/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-emerald-600 p-8 hover:shadow-2xl transition-all duration-500"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold dark:text-slate-100 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-slate-200 text-lg leading-relaxed">
          We're here to help and answer any questions you may have. We look
          forward to hearing from you.
        </p>
      </div>

      <div className="space-y-6">
        {/* Name Field */}
        <div className="relative group">
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField("")}
            className="w-full px-4 py-4 bg-white/50 dark:bg-black/50 dark:text-slate-100 dark:placeholder:text-slate-100 dark:border-emerald-600 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm placeholder-transparent peer"
            placeholder="Your Name"
            required
          />
          <label
            htmlFor="name"
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              focusedField === "name" || formData.name
                ? "-top-2 flex text-sm bg-white dark:bg-black/95 dark:text-emerald-500 px-2 text-emerald-600 "
                : "top-4 dark:opacity-0 text-gray-500 dark:text-slate-300"
            }`}
          >
            Your Name
          </label>
        </div>

        {/* Email Field */}
        <div className="relative group">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField("")}
            className="w-full px-4 py-4 bg-white/50 dark:bg-black/50 dark:text-slate-100 dark:placeholder:text-slate-100 dark:border-emerald-600 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm placeholder-transparent peer"
            placeholder="Your Email"
            required
          />
          <label
            htmlFor="email"
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              focusedField === "email" || formData.email
                ? "-top-2 text-sm bg-white dark:bg-black/95 dark:text-emerald-500 px-2 text-emerald-600"
                : "top-4 dark:opacity-0 text-gray-500 dark:text-slate-300"
            }`}
          >
            Your Email
          </label>
        </div>

        {/* Subject Field */}
        <div className="relative group">
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleInputChange}
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField("")}
            className="w-full px-4 py-4 bg-white/50 dark:bg-black/50 dark:text-slate-100 dark:placeholder:text-slate-100 dark:border-emerald-600 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm placeholder-transparent peer"
            placeholder="Subject"
            required
          />
          <label
            htmlFor="subject"
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              focusedField === "subject" || formData.subject
                ? "-top-2 text-sm bg-white dark:bg-black/95 dark:text-emerald-500 px-2 text-emerald-600"
                : "top-4 dark:opacity-0 text-gray-500 dark:text-slate-300"
            }`}
          >
            Subject
          </label>
        </div>

        {/* Message Field */}
        <div className="relative group">
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleInputChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField("")}
            rows={5}
            className="w-full px-4 py-4 bg-white/50 dark:bg-black/50 dark:text-slate-100 dark:placeholder:text-slate-100 dark:border-emerald-600 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm placeholder-transparent peer resize-none"
            placeholder="Your Message"
            required
          />
          <label
            htmlFor="message"
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              focusedField === "message" || formData.message
                ? "-top-2 text-sm bg-white dark:bg-black/95 dark:text-emerald-500 px-2 text-emerald-600"
                : "top-4 dark:opacity-0 text-gray-500 dark:text-slate-300"
            }`}
          >
            Your Message
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 ${
            isSubmitting
              ? "opacity-70 cursor-not-allowed"
              : "hover:from-emerald-600 hover:to-green-700"
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sending Message...
            </>
          ) : (
            <>
              <Send size={20} />
              Send Message
            </>
          )}
        </button>

        {/* Social Media Row */}
        <div className="pt-6 border-t border-gray-200/50 dark:border-emerald-600 ">
          <p className="text-sm text-gray-600 dark:text-slate-200 mb-4 text-center">
            Follow us on social media
          </p>
          <div className="flex justify-center space-x-6 ">
            {socialIcons.map(({ icon: Icon, href, label, color }, index) => (
              <motion.a
                key={label}
                href={href}
                initial={{
                  opacity: 0,
                  y: 20 + 10 * index,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.37 + 0.2 * index },
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                }}
                viewport={{ once: true }}
                className={`p-3 bg-gray-50 hover:bg-white rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 text-gray-600 ${color} group`}
                aria-label={label}
              >
                <Icon
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Contact Information Component
const ContactInfo = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      info: "+234 90 3778 6418",
      subtitle: "Mon-Fri 9am-6pm",
    },
    {
      icon: Mail,
      title: "Email",
      info: "info@salam.org",
      subtitle: "IN SHA ALLAH We will reply within 24 hours",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{
          opacity: 0,
          x: 70,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.55 },
        }}
        exit={{
          opacity: 0,
          x: 70,
        }}
        viewport={{ once: true }}
        className="bg-white/70 dark:bg-black/70  backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-emerald-600 p-8 hover:shadow-xl transition-all duration-500"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-6">
          Get In Touch
        </h2>
        <div className="space-y-6">
          {contactMethods.map(({ icon: Icon, title, info, subtitle }) => (
            <div key={title} className="flex items-start gap-4 group">
              <div className="flex-shrink-0 p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors duration-300">
                <Icon className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-1">
                  {title}
                </h3>
                <p className="text-gray-700 dark:text-slate-200 font-medium">
                  {info}
                </p>
                <p className="text-sm text-gray-500 dark:text-slate-200">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Community Actions Component 
const CommunityActions = () => {
  const actions = useMemo(
    () => [
      {
        icon: Calendar,
        title: "Upcoming Events",
        description: "Join our community gatherings",
        gradient: "from-blue-500 to-indigo-600",
        href: "/events_and_news",
      },
      {
        icon: Stars,
        title: "Community Hub",
        description: "Connect with fellow members",
        gradient: "from-purple-500 to-pink-600",
        href: "/community",
      },
      {
        icon: Heart,
        title: "Volunteer Opportunities",
        description: "Make a difference together",
        gradient: "from-red-500 to-rose-600",
        href: "/volunteer_board",
      },
      {
        icon: DollarSign,
        title: "Quick Donation",
        description: "Support our mission",
        gradient: "from-green-500 to-emerald-600",
        href: "/donate",
      },
      {
        icon: HelpCircle,
        title: "Q&A's",
        description: "Ask scholars questions",
        gradient: "from-yellow-500 to-orange-600",
        href: "/questions_and_answers",
      },
      {
        icon: BookOpen,
        title: "Resources",
        description: "Learn more about Islam",
        gradient: "from-teal-500 to-cyan-600",
        href: "/resources",
      },
    ],
    []
  );

  const navigate = useNavigate()
  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 dark:text-slate-100 to-gray-600 bg-clip-text text-transparent mb-4">
          Community Hub
        </h2>
        <p className="text-gray-600 dark:text-slate-200 text-lg max-w-2xl mx-auto">
          Explore more ways to connect, contribute, and grow with our community
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map(
          ({ icon: Icon, title, description, gradient, href }, index) => (
            <motion.button
              initial={{
                opacity: 0,
                y: 30 + index * 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.55 + 0.2 * index },
              }}
              exit={{
                opacity: 0,
                y: 30,
              }}
              viewport={{ once: true }}
              key={title}
              onClick={() => navigate(href)}
              className="group flex flex-col justify-center items-center bg-white/70 dark:bg-black/70  backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-emerald-600 p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2 group-hover:text-gray-900 dark:group-hover:text-gray-300">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-slate-300 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-400">
                {description}
              </p>
              <div className="mt-4 flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                Learn more →
              </div>
            </motion.button>
          )
        )}
      </div>
    </div>
  );
};

// Main Contact Page Component
const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/20 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section with Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>

        {/* Community Actions Section */}
        <CommunityActions />

        {/* Testimonial or Feature Section */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 70,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.55 },
            }}
            exit={{
              opacity: 0,
              y: 70,
            }}
            viewport={{ once: true }}
            className="bg-white/70 dark:bg-black/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-emerald-600 p-8 hover:shadow-xl transition-all duration-500"
          >
            <div className="flex justify-center mb-4">
              <Star className="h-8 w-8 text-yellow-500 fill-current" />
            </div>
            <blockquote className="text-xl text-gray-700 dark:text-slate-100 italic mb-4">
              "A place where everyone feels welcomed and valued. The community
              here truly embodies the spirit of unity and compassion."
            </blockquote>
            <p className="text-gray-600 dark:text-slate-300">- Community Member</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ContactUsPage;
