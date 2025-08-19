import React from "react";
import { useSelector } from "react-redux";
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
} from "lucide-react";
import { useNavigate } from "react-router";

const iconComponents = {
  Heart,
  Users,
  Star,
  HandHeart,
  BookOpen,
  Calendar,
};

const Community = () => {
  const navigate = useNavigate()
  const {
    forumCategories,
    scholarQA,
    duaRequests,
    volunteerOpportunities,
  } = useSelector((state) => state.community);

  // Navigation Component - Removed (user has existing navbar)

  // Mobile Menu Component - Removed (user has existing navbar)

  // Hero Section Component
  const HeroSection = () => (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Islamic Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="islamic-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <polygon points="10,1 19,6 19,14 10,19 1,14 1,6" fill="#059669" />
              <polygon
                points="10,3 17,7 17,13 10,17 3,13 3,7"
                fill="none"
                stroke="#059669"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      <div className="relative container mx-auto px-4 py-5 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Community
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
              Hub
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect, learn, and grow with your Muslim community. Building
            bridges of faith, knowledge, and compassion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#DiscussionForums"
              className="group bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Join A Community
              <ArrowRight
                className="inline ml-2 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </a>
            <a
              href="#Q&A"
              className="bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-emerald-200 hover:shadow-md transition-all duration-200"
            >
              Ask A Question
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  // Discussion Forums Component
  const DiscussionForums = () => (
    <div
      id="DiscussionForums"
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all duration-300"
    >
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <MessageSquare className="text-emerald-600" size={20} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Communities</h2>
        </div>
        <p className="text-slate-600">
          Engage in meaningful conversations with your community
        </p>
      </div>

      <div className="p-6 space-y-4">
        {forumCategories.map((category, index) => {
          const IconComponent = iconComponents[category.icon];
          return (
            <div
              key={index}
              className={`group/item p-4 rounded-xl border-2 bg-gradient-to-r ${category.color} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer`}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <IconComponent size={20} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1 group-hover/item:text-emerald-700 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      {category.posts} discussions
                    </span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-xs text-emerald-600 font-medium">
                      Active
                    </span>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="text-slate-400 group-hover/item:text-emerald-600 group-hover/item:translate-x-1 transition-all"
                />
              </div>
            </div>
          );
        })}

        <button className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
          View All Communities
        </button>
      </div>
    </div>
  );

  // Q&A Section Component
  const ScholarQA = () => (
    <div
      id="Q&A"
      
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all duration-300"
    >
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-xl">
            <HelpCircle className="text-blue-600" size={20} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            Q&A with Scholar
          </h2>
        </div>
        <p className="text-slate-600">
          Get your Islamic questions answered by knowledgeable scholars
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-4 mb-6">
          {scholarQA.map((qa, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 mb-2">
                    Q: {qa.question}
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-slate-500">
                      Asked by {qa.askedBy}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        qa.status === "answered"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {qa.status}
                    </span>
                  </div>
                </div>
                <BookOpen size={16} className="text-slate-400 mt-1" />
              </div>
            </div>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
          Ask a Question
        </button>
      </div>
    </div>
  );

  // Dua Wall Component
  const DuaWall = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all duration-300">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-violet-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 rounded-xl">
            <Heart className="text-purple-600" size={20} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            Dua Request Wall
          </h2>
        </div>
        <p className="text-slate-600">
          Share your supplications and pray for others
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar mb-6">
          {duaRequests.map((dua, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-sm transition-all duration-200"
            >
              <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                "{dua.text}"
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">- {dua.author}</p>
                <div className="flex items-center gap-1">
                  <Heart size={12} className="text-red-400 fill-red-400" />
                  <span className="text-xs text-slate-500">{dua.hearts}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
          Submit a Dua Request
        </button>
      </div>
    </div>
  );

  

  // Volunteer Opportunities Component
  const VolunteerBoard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-100 rounded-xl">
            <HandHeart className="text-amber-600" size={20} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            Volunteer Opportunities
          </h2>
        </div>
        <p className="text-slate-600">
          Get involved and give back to the community
        </p>
      </div>

      <div className="p-6 space-y-4">
        {volunteerOpportunities.map((opportunity, index) => {
          const IconComponent = iconComponents[opportunity.icon];
          return (
            <div
              key={index}
              className="group p-4 border border-gray-200 rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${opportunity.gradient} shadow-sm`}
                >
                  <IconComponent size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">
                    {opportunity.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">
                    {opportunity.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="text-xs text-slate-500">
                      {opportunity.location}
                    </span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-100 text-slate-700 rounded-lg font-medium hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-200">
                  Learn More
                </button>
              </div>
            </div>
          );
        })}

        <button
          onClick={() => navigate("/volunteer_board")}
          className="w-full mt-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          View All Opportunities
        </button>
      </div>
    </div>
  );

  // Community Guidelines Component
  const CommunityGuidelines = () => (
    <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-slate-100 rounded-xl">
          <Globe className="text-slate-600" size={20} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">
          Community Guidelines
        </h3>
      </div>
      <div className="space-y-3 text-sm text-slate-600">
        <p className="flex items-start gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
          Maintain respect and kindness in all interactions
        </p>
        <p className="flex items-start gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
          Share knowledge and resources for the benefit of all
        </p>
        <p className="flex items-start gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
          Welcome newcomers and help them feel at home
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>

      <main>
        <HeroSection />

        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <DiscussionForums />
            </div>
            <div className="lg:col-span-1">
              <ScholarQA />
            </div>
            <div className="lg:col-span-1">
              <DuaWall />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <VolunteerBoard />
            </div>
            <div className="lg:col-span-1">
              <CommunityGuidelines />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
