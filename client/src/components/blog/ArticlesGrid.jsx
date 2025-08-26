import React from "react";
import ArticleCard from "./ArticleCard";
import NewsletterSignup from "./NewsletterSignup";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const ArticlesGrid = ({
  articlesToDisplay,
  lastArticleElementRef,
  toggleBookmark,
  shareArticle,
  newsletterEmail,
  setNewsletterEmail,
  handleNewsletterSubmit,
  isLoading,
  hasMore,
  filteredArticles,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articlesToDisplay.map((article, index) => {
          if (articlesToDisplay.length === index + 1) {
            return (
              <div ref={lastArticleElementRef} key={article.id}>
                <ArticleCard
                  article={article}
                  onBookmark={() => toggleBookmark(article.id)}
                  onShare={shareArticle}
                />
              </div>
            );
          } else {
            return (
              <ArticleCard
                key={article.id}
                article={article}
                onBookmark={() => toggleBookmark(article.id)}
                onShare={shareArticle}
              />
            );
          }
        })}
      </div>

      {/* Newsletter Signup (appears between articles) */}
      {articlesToDisplay.length >= 6 && (
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
          className="my-16"
        >
          <NewsletterSignup
            email={newsletterEmail}
            setEmail={setNewsletterEmail}
            onSubmit={handleNewsletterSubmit}
          />
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
        </div>
      )}

      {/* No More Articles */}
      {!hasMore && articlesToDisplay.length > 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full">
            <Heart className="w-5 h-5 mr-2" />
            You've reached the end! Thank you for reading.
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredArticles.length === 0 && !isLoading && (
        <div className="text-center py-20 col-span-full">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-100 mb-2">
            No articles found
          </h3>
          <p className="text-gray-500 dark:text-gray-3\00">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </>
  );
};

export default ArticlesGrid;
