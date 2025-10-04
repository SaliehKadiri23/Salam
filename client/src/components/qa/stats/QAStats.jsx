import React, { useMemo } from "react";
import { MessageCircle, Medal, TrendingUp } from "lucide-react";
import { useGetQuestionsAndAnswersQuery } from "../../../services/apiSlice";

function QAStats() {
  const {data : QuestionsAndAnswers = [], isLoading, isSuccess, isError} = useGetQuestionsAndAnswersQuery()



  // Getting the number of active scholars
const numberOfActiveScholars = useMemo(() => {
      let activeScholars = [];
      for (let qa of QuestionsAndAnswers) {
        if (qa.isAnswered === true) {
          // Use the ID if answeredBy is an object, otherwise use the value directly
          activeScholars.push(typeof qa.answeredBy === 'object' ? qa.answeredBy._id : qa.answeredBy);
        }
      }
     return new Set(activeScholars).size;
    }
  
    , [QuestionsAndAnswers.length])

  // Getting the number likes
const numberOfLikes = useMemo(() => {
      let likes = 0;
      for (let qa of QuestionsAndAnswers) {
        if (qa.likes) {
          likes += qa.likes;
        }
      }
     return likes;
    }
  
    , [QuestionsAndAnswers])



  const statsConfig = [
    {
      icon: MessageCircle,
      label: "Questions Answered",
      value: QuestionsAndAnswers.filter((qa, idx) => qa.isAnswered === true)
        .length,
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Medal,
      label: "Active Scholars",
      value: numberOfActiveScholars,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      label: "Likes",
      value: numberOfLikes,
      gradient: "from-green-500 to-green-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full max-w-full backdrop-blur-xl bg-white dark:bg-black/40 bg-opacity-80 rounded-2xl border border-white border-opacity-50 p-6 shadow-xl overflow-hidden">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Community Stats
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 w-full">
              <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-1" />
                <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full backdrop-blur-xl bg-white dark:bg-black/40 bg-opacity-80 rounded-2xl border border-white dark:border-emerald-600 border-opacity-50 p-6 shadow-xl overflow-hidden">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 break-words">
        Community Stats
      </h3>
      <div className="space-y-4">
        {statsConfig.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4 w-full">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 truncate">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-100 break-words">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QAStats;