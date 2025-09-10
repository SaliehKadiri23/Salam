import React, { useState, useEffect } from "react";
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
  Stars,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useGetForumsQuery, useGetQuestionsAndAnswersQuery, useGetDuaRequestsQuery, useIncrementDuaRequestPrayerCountMutation, useGetVolunteerOpportunitiesQuery } from "../services/apiSlice";

const iconComponents = {
  Heart,
  Users,
  Star,
  HandHeart,
  Stars,
  BookOpen,
  Calendar,
};


const Community = () => {
  const navigate = useNavigate();

    const {data: forumCategories = [], isLoading, isSuccess, isError} = useGetForumsQuery()
    
    

  // Hero Section Component
  const HeroSection = () => (
    <section className="relative overflow-hidden rounded-b-lg ">
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

      <div className="relative inset-0 container dark:bg-black/75 mx-auto px-4 py-5 text-center md:rounded-b-xl ">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-slate-100 mb-6 leading-tight">
            Community
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 ">
              Hub
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect, learn, and grow with your Muslim community. Building
            bridges of faith, knowledge, and compassion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              initial={{
                opacity: 0,
                x: -200,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.4 },
              }}
              exit={{
                opacity: 0,
                x: -200,
              }}
              viewport={{ once: true }}
              href="#DiscussionForums"
              className="group bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Join A Community
              <ArrowRight
                className="inline ml-2 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </motion.a>
            <motion.a
              initial={{
                opacity: 0,
                x: 200,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.4 },
              }}
              exit={{
                opacity: 0,
                x: 200,
              }}
              viewport={{ once: true }}
              href="#Q&A"
              className="bg-white dark:bg-black/65 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-200 hover:dark:border-emerald-600 hover:shadow-md transition-all duration-200"
            >
              Ask A Question
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );

  // Discussion Forums Component
  const DiscussionForums = () => (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, type: "tween", ease: "linear" },
      }}
      exit={{
        opacity: 0,
        y: 50,
      }}
      viewport={{ once: true }}
      id="DiscussionForums"
      className="bg-white dark:bg-black/55 rounded-2xl shadow-sm border border-gray-100 dark:border-emerald-600 overflow-hidden group hover:shadow-md transition-all duration-300"
    >
      <div className="p-6 border-b border-gray-100 dark:border-emerald-600 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:text-gray-700/40">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <MessageSquare className="text-emerald-600" size={20} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-50 ">
            Communities
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-100">
          Engage in meaningful conversations with your community
        </p>
      </div>

      <div className="p-6 space-y-4">
        {forumCategories.map((category, index) => {
          const IconComponent = iconComponents[category.icon];
          return (
            <div
              key={category?._id}
              className={`group/item p-4 rounded-xl border-2 dark:border-emerald-600 bg-gradient-to-r from-green-100 via-emerald-100 to-blue-200 dark:from-gray-800 dark:to-gray-800  hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer`}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <IconComponent size={20} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1 group-hover/item:text-emerald-700 dark:group-hover/item:text-emerald-400 transition-colors">
                    {category?.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    {category?.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-300">
                      {category?.posts.length} discussions
                    </span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      Active
                    </span>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="text-slate-900 dark:text-slate-100 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 group-hover/item:translate-x-1 transition-all"
                />
              </div>
            </div>
          );
        })}

        <button className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
          View All Communities
        </button>
      </div>
    </motion.div>
  );

  // Q&A Section Component
const ScholarQA = () => {
  const {
    data: QuestionsAndAnswers = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetQuestionsAndAnswersQuery();
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 70,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.45 },
      }}
      exit={{
        opacity: 0,
        y: 70,
      }}
      viewport={{ once: true }}
      id="Q&A"
      className="bg-white dark:bg-black/55 rounded-2xl shadow-sm border border-gray-100 dark:border-emerald-600 overflow-hidden group hover:shadow-md transition-all duration-300"
    >
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r dark:border-emerald-600 from-blue-50 to-indigo-50  dark:from-gray-900 dark:text-gray-700/40">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-xl">
            <HelpCircle className="text-blue-600" size={20} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-50">
            Q&A with Scholar
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-100">
          Get your Islamic questions answered by knowledgeable scholars
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-4 mb-6">
          {QuestionsAndAnswers.filter((qa) => qa.isAnswered)
            .slice(-3) // take the last 3 answered questions
            .map((qa, index) => (
              <button
                key={index}
                
                onClick={() => navigate(`/questions_and_answers#${qa._id}`)}
                className="p-4 border w-full text-left border-gray-200 dark:border-emerald-600 rounded-xl dark:bg-gray-800 hover:border-blue-200 dark:hover:border-blue-600 dark:hover:bg-blue-50/20 hover:bg-blue-50/30 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 mb-2 text-wrap">
                      Q: {qa.question}
                    </p>
                    <div className="flex items-center gap-3 md:grid md:grid-cols-1">
                      <p className="text-sm text-slate-500 dark:text-slate-300">
                        Asked by {qa.askedBy}
                      </p>
                      <span
                        className={`px-2 md:mx-auto md:ml-0 py-1 rounded-full text-xs font-medium ${
                          qa.isAnswered
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {qa.isAnswered ? "Answered" : "Pending"}
                      </span>
                    </div>
                  </div>
                  <BookOpen
                    size={16}
                    className="text-slate-400 dark:text-slate-100 mt-1"
                  />
                </div>
              </button>
            ))}
        </div>

        <button
          onClick={() => navigate("/questions_and_answers")}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Ask a Question
        </button>
      </div>
    </motion.div>
  );};



  // Dua Wall Component
  const DuaWall = () => {
    const { data: duaRequestsData, isLoading, isError } = useGetDuaRequestsQuery();
    const [incrementPrayerCount] = useIncrementDuaRequestPrayerCountMutation();
    const duaRequests = duaRequestsData?.data || [];
    
    // State for tracking which requests the user has prayed for
    const [prayedRequests, setPrayedRequests] = useState({});
    const [prayerCounts, setPrayerCounts] = useState({});
    
    // Initialize prayer state from localStorage
    useEffect(() => {
      const savedPrayedRequests = JSON.parse(localStorage.getItem('prayedRequests') || '{}');
      setPrayedRequests(savedPrayedRequests);
      
      // Initialize prayer counts
      const initialCounts = {};
      duaRequests.forEach(dua => {
        initialCounts[dua._id] = dua.prayerCount || 0;
      });
      setPrayerCounts(initialCounts);
    }, [duaRequests]);
    
    // Handle prayer functionality
    const handlePray = async (requestId) => {
      // Check if user has already prayed for this request
      if (prayedRequests[requestId]) {
        return;
      }
      
      try {
        // Update local state immediately for UI feedback
        setPrayerCounts(prev => ({
          ...prev,
          [requestId]: (prev[requestId] || 0) + 1
        }));
        
        // Mark as prayed in state
        setPrayedRequests(prev => ({
          ...prev,
          [requestId]: true
        }));
        
        // Save to localStorage
        const updatedPrayedRequests = {
          ...prayedRequests,
          [requestId]: true
        };
        localStorage.setItem('prayedRequests', JSON.stringify(updatedPrayedRequests));
        
        // Call the API to increment prayer count
        await incrementPrayerCount(requestId).unwrap();
      } catch (error) {
        console.error('Error recording prayer:', error);
        // Revert the local state changes if API call fails
        setPrayerCounts(prev => ({
          ...prev,
          [requestId]: Math.max(0, (prev[requestId] || 0) - 1)
        }));
        
        // Remove from prayed requests
        const revertedPrayedRequests = { ...prayedRequests };
        delete revertedPrayedRequests[requestId];
        setPrayedRequests(revertedPrayedRequests);
        localStorage.setItem('prayedRequests', JSON.stringify(revertedPrayedRequests));
      }
    };
    
    // Show loading state
    if (isLoading) {
      return (
        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.45 },
          }}
          exit={{
            opacity: 0,
            y: 100,
          }}
          viewport={{ once: true }}
          className="bg-white dark:bg-black/55 rounded-2xl shadow-sm border border-gray-100 dark:border-emerald-600 overflow-hidden group hover:shadow-md transition-all duration-300"
        >
          <div className="p-6 border-b border-gray-100 dark:border-emerald-600 bg-gradient-to-r from-purple-50 to-violet-50  dark:from-gray-900 dark:text-gray-700/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-xl">
                <Heart className="text-purple-600" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Dua Request Wall
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-200">
              Share your supplications and pray for others
            </p>
          </div>
          
          <div className="p-6">
            <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar mb-6">
              <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            </div>
            
            <button
              onClick={() => navigate("/dua_request")}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Submit a Dua Request
            </button>
          </div>
        </motion.div>
      );
    }
    
    // Show error state
    if (isError) {
      return (
        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.45 },
          }}
          exit={{
            opacity: 0,
            y: 100,
          }}
          viewport={{ once: true }}
          className="bg-white dark:bg-black/55 rounded-2xl shadow-sm border border-gray-100 dark:border-emerald-600 overflow-hidden group hover:shadow-md transition-all duration-300"
        >
          <div className="p-6 border-b border-gray-100 dark:border-emerald-600 bg-gradient-to-r from-purple-50 to-violet-50  dark:from-gray-900 dark:text-gray-700/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-xl">
                <Heart className="text-purple-600" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Dua Request Wall
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-200">
              Share your supplications and pray for others
            </p>
          </div>
          
          <div className="p-6">
            <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar mb-6">
              <div className="text-center py-4">
                <p className="text-red-500 dark:text-red-400">Failed to load dua requests. Please try again later.</p>
              </div>
            </div>
            
            <button
              onClick={() => navigate("/dua_request")}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Submit a Dua Request
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.45 },
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        viewport={{ once: true }}
        className="bg-white dark:bg-black/55 rounded-2xl shadow-sm border border-gray-100 dark:border-emerald-600 overflow-hidden group hover:shadow-md transition-all duration-300"
      >
        <div className="p-6 border-b border-gray-100 dark:border-emerald-600 bg-gradient-to-r from-purple-50 to-violet-50  dark:from-gray-900 dark:text-gray-700/40">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Heart className="text-purple-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Dua Request Wall
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-200">
            Share your supplications and pray for others
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar mb-6">
            {duaRequests.slice(0, 4).map((dua, index) => (
              <div
                key={dua._id || index}
                className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-xl border border-green-100 dark:border-emerald-600 hover:shadow-sm transition-all duration-200"
              >
                <p className="text-sm text-slate-700 dark:text-slate-100 mb-3 leading-relaxed">
                  "{dua.content || dua.text}"
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 dark:text-slate-100">
                    - {dua.author || "Anonymous"}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePray(dua._id)}
                      disabled={prayedRequests[dua._id]}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                        prayedRequests[dua._id]
                          ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md cursor-default"
                          : "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 hover:from-emerald-100 hover:to-green-100 hover:shadow-md cursor-pointer"
                      }`}
                    >
                      {prayedRequests[dua._id] ? (
                        <>
                          <Sparkles className="w-3 h-3 animate-pulse" />
                          <span>Prayed</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-3 h-3" />
                          <span>Make Dua</span>
                        </>
                      )}
                    </button>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-100">
                      <span className="font-medium">
                        {prayerCounts[dua._id] || dua.prayerCount || 0}
                      </span>
                      <span>
                        {((prayerCounts[dua._id] || dua.prayerCount || 0) === 1) ? "prayer" : "prayers"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/dua_request")}
            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Submit a Dua Request
          </button>
        </div>
      </motion.div>
    );
  };

  // Volunteer Opportunities Component
  const VolunteerBoard = () => {
    const { data: apiResponse, isLoading, isError } = useGetVolunteerOpportunitiesQuery();
    const volunteerOpportunities = apiResponse?.data || [];
    
    if (isLoading) {
      return (
        <motion.div
          initial={{
            opacity: 0,
            y: 130,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.45 },
          }}
          exit={{
            opacity: 0,
            y: 130,
          }}
          viewport={{ once: true }}
          className="bg-white dark:bg-black/55 rounded-2xl shadow-sm border border-gray-100 dark:border-emerald-600 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-emerald-600 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900 dark:to-orange-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 rounded-xl">
                <HandHeart className="text-amber-600" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Volunteer Opportunities
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-200">
              Get involved and give back to the community
            </p>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            </div>
            
            <button
              onClick={() => navigate("/volunteer_board")}
              className="w-full mt-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              View All Opportunities
            </button>
          </div>
        </motion.div>
      );
    }
    
    if (isError) {
      return (
        <motion.div
          initial={{
            opacity: 0,
            y: 130,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.45 },
          }}
          exit={{
            opacity: 0,
            y: 130,
          }}
          viewport={{ once: true }}
          className="bg-white dark:bg-black/55 rounded-2xl shadow-sm border border-gray-100 dark:border-emerald-600 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-emerald-600 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900 dark:to-orange-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 rounded-xl">
                <HandHeart className="text-amber-600" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Volunteer Opportunities
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-200">
              Get involved and give back to the community
            </p>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="text-center py-4">
              <p className="text-red-500 dark:text-red-400">Failed to load volunteer opportunities. Please try again later.</p>
            </div>
            
            <button
              onClick={() => navigate("/volunteer_board")}
              className="w-full mt-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              View All Opportunities
            </button>
          </div>
        </motion.div>
      );
    }
    
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 130,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.45 },
        }}
        exit={{
          opacity: 0,
          y: 130,
        }}
        viewport={{ once: true }}
        className="bg-white dark:bg-black/55 rounded-2xl shadow-sm border border-gray-100 dark:border-emerald-600 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 dark:border-emerald-600 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900 dark:to-orange-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 rounded-xl">
              <HandHeart className="text-amber-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Volunteer Opportunities
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-200">
            Get involved and give back to the community
          </p>
        </div>

        <div className="p-6 space-y-4">
          {volunteerOpportunities.slice(0, 3).map((opportunity, index) => (
            <div
              key={opportunity._id || index}
              className="group p-4 border border-gray-200 dark:border-emerald-600 rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
                  <img
                    src={opportunity.image || "/placeholder-image.jpg"}
                    alt={opportunity.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-50 mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {opportunity.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 line-clamp-2">
                    {opportunity.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={14}
                      className="text-slate-400 dark:text-slate-100"
                    />
                    <span className="text-xs text-slate-500 dark:text-slate-300">
                      {opportunity.location}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    // Store the opportunity ID in sessionStorage before navigating
                    sessionStorage.setItem('scrollToOpportunity', opportunity._id);
                    // Use a more direct approach for navigation with hash
                    navigate(`/volunteer_board#${opportunity._id}`);
                  }}
                  className="px-4 py-2 bg-gray-100 text-slate-700 rounded-lg font-medium hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-200"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate("/volunteer_board")}
            className="w-full mt-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            View All Opportunities
          </button>
        </div>
      </motion.div>
    );
  };

  // Community Guidelines Component
  const CommunityGuidelines = () => (
    <motion.div
      initial={{
        opacity: 0,
        x: -200,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.4 },
      }}
      exit={{
        opacity: 0,
        x: 200,
      }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-slate-50 to-gray-50  dark:from-gray-900 dark:text-gray-700/40 rounded-2xl p-6 border border-gray-200 dark:border-emerald-600"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-slate-100 rounded-xl">
          <Globe className="text-slate-600" size={20} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Community Guidelines
        </h3>
      </div>
      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-200">
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
    </motion.div>
  );

  return (
    <div className="bg-gray-50 dark:bg-black/95">
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

        <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mb-12">
            <div className="lg:col-span-1 w-full">
              <DiscussionForums />
            </div>
            <div className="lg:col-span-1 w-full">
              <ScholarQA />
            </div>
            <div className="lg:col-span-1 w-full">
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
