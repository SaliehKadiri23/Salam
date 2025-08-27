import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MessageCircle, Medal, TrendingUp } from "lucide-react";
import { selectQAStats, selectLoading, fetchQuestions } from "../../../redux/qaSlice";

function QAStats() {
  const dispatch = useDispatch();
  const stats = useSelector(selectQAStats);
  const { fetchingQuestions } = useSelector(selectLoading);

  useEffect(() => {
    // Load questions data if not already loaded
    if (stats.questionsAnswered === "0") {
      dispatch(fetchQuestions());
    }
  }, [dispatch, stats.questionsAnswered]);

  const statsConfig = [
    {
      icon: MessageCircle,
      label: "Questions Answered",
      value: stats.questionsAnswered,
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Medal,
      label: "Active Scholars",
      value: stats.activeScholars,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      label: "This Month",
      value: stats.thisMonth,
      gradient: "from-green-500 to-green-600",
    },
  ];

  if (fetchingQuestions) {
    return (
      <div className="backdrop-blur-xl bg-white dark:bg-black/40 bg-opacity-80 rounded-2xl border border-white border-opacity-50 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Community Stats
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse" />
              <div className="flex-1">
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
    <div className="backdrop-blur-xl bg-white dark:bg-black/40 bg-opacity-80 rounded-2xl border border-white dark:border-emerald-600 border-opacity-50 p-6 shadow-xl">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
        Community Stats
      </h3>
      <div className="space-y-4">
        {statsConfig.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-100">
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