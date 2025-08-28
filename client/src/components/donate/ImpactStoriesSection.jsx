import React from "react";
import { Globe, Star, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const iconMap = {
  Globe: <Globe className="w-8 h-8" />,
  Star: <Star className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
};

const ImpactCard = ({ story, index }) => (
  <div
    className="bg-white dark:bg-gradient-to-br dark:bg-black from-gray-500 to-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-emerald-600 text-center group"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div className="mb-6">
      <div className="inline-flex p-4 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform duration-300">
        {iconMap[story.icon]}
      </div>
    </div>

    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
      {story.title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 mb-6">{story.description}</p>

    <div className="border-t border-gray-100 dark:border-emerald-600 pt-6">
      <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-500 mb-1">
        {story.number}
      </p>
      <p className="text-gray-600 dark:text-gray-200 font-medium">
        {story.label}
      </p>
    </div>
  </div>
);

const ImpactStoriesSection = () => {
  const impactStories = useSelector((state) => state.donate.impactStories);

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 dark:from-gray-900 dark:to-gray-900 to-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">Our Impact</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how your donations have made a real difference in communities
            around the world
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {impactStories.map((story, index) => (
            <motion.div
              initial={{
                opacity: 0,
                y: 70 + 15 * index,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.55 + 0.15 * index },
              }}
              exit={{
                opacity: 0,
                y: 70,
              }}
              viewport={{ once: true }}
              key={index}
            >
              <ImpactCard key={index} story={story} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStoriesSection;