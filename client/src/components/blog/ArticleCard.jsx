import React, { useState } from 'react';
import { Heart, Share2, BookmarkPlus, Facebook, Linkedin, MessageCircle, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useToggleArticleLikeMutation } from '../../services/apiSlice';

const isLatest = (dateString) => {
  const articleDate = new Date(dateString);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return articleDate > oneWeekAgo;
};

const ArticleCard = ({ article, onBookmark, onShare }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [likes, setLikes] = useState(article.likes || 0);
  const [liked, setLiked] = useState(false);
  const [toggleLike] = useToggleArticleLikeMutation();

  const handleLike = async () => {
    try {
      const result = await toggleLike(article._id).unwrap();
      setLikes(result.likes);
      setLiked(result.liked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <article className="group relative bg-white dark:bg-black/60 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-emerald-600 flex flex-col h-full">
      {/* Article Image */}
      <div className="relative overflow-hidden h-48">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
        )}
        <img
          src={article.image}
          alt={article.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="flex items-center space-x-2 text-white text-sm">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onBookmark(article.id)}
                aria-label={
                  article.isBookmarked ? "Remove bookmark" : "Add bookmark"
                }
                className={`p-2 rounded-full transition-all duration-300 ${
                  article.isBookmarked
                    ? "bg-red-500 text-white"
                    : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                }`}
              >
                <BookmarkPlus className="w-4 h-4" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  onBlur={() => setShowShareMenu(false)}
                  aria-label="Share article"
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border p-2 flex space-x-1 z-50">
                    {[
                      {
                        platform: "facebook",
                        icon: Facebook,
                        color: "text-blue-600",
                      },
                      {
                        platform: "telegram",
                        icon: MessageCircle,
                        color: "text-blue-500",
                      },
                      {
                        platform: "whatsapp",
                        icon: MessageCircle,
                        color: "text-green-500",
                      },
                      {
                        platform: "linkedin",
                        icon: Linkedin,
                        color: "text-blue-700",
                      },
                    ].map(({ platform, icon: Icon, color }) => (
                      <button
                        key={platform} 
                        onClick={() => {
                          onShare(article, platform);
                          setShowShareMenu(false);
                        }}
                        className={`p-1 hover:bg-gray-100 rounded transition-colors ${color}`}
                        aria-label={`Share on ${platform}`}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
            {article.category}
          </span>
        </div>

        {/* New Badge for Latest Articles */}
        {isLatest(article.publishDate) && (
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
              NEW
            </span>
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="p-6 space-y-4 flex-grow flex flex-col">
        {/* Article Title */}
        <h3
          className="text-xl font-bold text-gray-800 dark:text-gray-100 leading-tight group-hover:text-green-600 transition-colors duration-300"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          <a
            href={`/articles/${article.id}`}
            className="hover:underline focus:outline-none  focus:ring-2 focus:ring-green-300 rounded"
          >
            {article.title}
          </a>
        </h3>

        {/* Article Excerpt */}
        <p
          className="text-gray-600 dark:text-gray-200 text-sm leading-relaxed flex-grow"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.excerpt}
        </p>

        {/* Article Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-emerald-600">
          <a
            href={`/authors/${article.author
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            className="flex items-center space-x-3 group/author rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {article.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100 text-sm group-hover/author:underline">
                {article.author}
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-300">
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(article.publishDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </a>

          <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-300">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                liked ? "text-red-500" : "text-gray-500 dark:text-gray-300 hover:text-red-500"
              }`}
              aria-label={liked ? "Unlike article" : "Like article"}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              <span>{likes}</span>
            </button>
          </div>
        </div>

        {/* Read More Button */}
        <div className="pt-2">
          <a
            href={`/articles/${article.id}`}
            className="group/btn inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold transition-all duration-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;