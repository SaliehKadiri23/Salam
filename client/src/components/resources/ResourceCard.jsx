import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Bookmark,
  BookmarkCheck,
  Play,
  Clock,
  Star,
  CheckCircle2,
  Heart,
  Share2,
  Download,
  Eye,
  ArrowRight,
  Video,
  Headphones,
  Book,
  FileText,
} from 'lucide-react';
import { toggleBookmark, updateProgress, addReview } from '../../redux/userSlice';
import { openResourceDetail } from '../../redux/uiSlice';
import ReviewForm from './ReviewForm';

const ResourceCard = ({ resource }) => {
  const dispatch = useDispatch();
  const { bookmarkedItems, completedItems, progressItems } = useSelector(
    (state) => state.user
  );
  const { viewMode } = useSelector((state) => state.ui);

  const [showDetails, setShowDetails] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isBookmarked = bookmarkedItems.includes(resource.id);
  const isCompleted = completedItems.includes(resource.id);
  const progress = progressItems[resource.id] || 0;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return Video;
      case 'podcast':
        return Headphones;
      case 'course':
        return Book;
      default:
        return FileText;
    }
  };

  const TypeIcon = getTypeIcon(resource.type);
  const isListView = viewMode === 'list';

  const cardClass = isListView
    ? 'flex bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-emerald-200 transition-all duration-300'
    : 'group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-1';

  const handleOpenDetail = () => {
    dispatch(openResourceDetail(resource));
  };

  const handleToggleBookmark = () => {
    dispatch(toggleBookmark(resource.id));
  };

  const handleUpdateProgress = (newProgress) => {
    dispatch(updateProgress({ id: resource.id, progress: newProgress }));
  };

  const handleAddReview = (review) => {
    dispatch(addReview({ resourceId: resource.id, review }));
  };

  return (
    <div className={cardClass}>
      <div
        className={
          isListView ? 'w-[40%] flex-shrink-0' : 'relative overflow-hidden'
        }
      >
        <div
          className={
            isListView
              ? 'h-full bg-gray-100 relative'
              : 'aspect-video bg-gray-100 relative'
          }
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          )}
          <img
            src={resource.image}
            alt={resource.title}
            className={`w-full h-full object-cover transition-all duration-300 ${
              !isListView ? 'group-hover:scale-105' : ''
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {!isListView && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button
                  onClick={handleOpenDetail}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Play className="w-4 h-4 text-emerald-600" />
                </button>
                <div className="flex space-x-2">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {!isListView && (
          <>
            <div className="absolute top-4 left-4">
              <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                <TypeIcon className="w-3 h-3 text-emerald-600" />
                <span className="text-xs font-medium text-gray-700 capitalize">
                  {resource.type}
                </span>
              </div>
            </div>
            <button
              onClick={handleToggleBookmark}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-amber-500" />
              ) : (
                <Bookmark className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </>
        )}
      </div>
      <div className={isListView ? 'flex-1 p-6' : 'p-6'}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors">
              {resource.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {resource.description}
            </p>
          </div>
          {isListView && (
            <button
              onClick={handleToggleBookmark}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-4"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-amber-500" />
              ) : (
                <Bookmark className="w-5 h-5 text-gray-400" />
              )}
            </button>
          )}
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-[70%] mx-auto ">
            <button
              onClick={handleOpenDetail}
              className="flex w-full my-3 text-white font-bold py-2 rounded-lg transition-all duration-300 hover:scale-107 justify-center items-center text-center bg-blue-600 "
            >
              {resource.type === 'article'
                ? 'Read Article'
                : resource.type === 'video'
                ? 'Watch Video'
                : resource.type === 'podcast'
                ? 'Listen To Podcast'
                : resource.type === 'course'
                ? 'View Course'
                : 'View'}
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <TypeIcon className="w-3 h-3" />
            <span className="capitalize">{resource.type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{resource.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{resource.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 fill-current text-amber-400" />
            <span>{resource.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">by {resource.author}</span>
        </div>
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Progress</span>
              <span className="text-xs font-medium text-emerald-600">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-gradient-to-r from-emerald-500 to-green-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        {isCompleted && (
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Completed</span>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          {isCompleted ? null : (<button
            className="flex-1 disabled bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
            onClick={() => {
              if (progress < 100) {
                console.log(progress)
                handleUpdateProgress(Math.min(progress + 25, 100));
              }
            
            }}
          >
            {isCompleted
              ? 'Review'
              : progress > 0
              ? 'Continue'
              : 'Start Learning'}
          </button>)}
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`px-4 py-2 border border-emerald-200 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors text-sm ${isCompleted ? "w-full" : ""} `}
          >
            Details
          </button>
        </div>
        {isCompleted && (
          <div className="mt-2">
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="w-full px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-2"
            >
              <Star className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        )}
        {showReviewForm && (
          <ReviewForm
            onSubmit={handleAddReview}
            onClose={() => setShowReviewForm(false)}
          />
        )}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  About this resource
                </h4>
                <p className="text-sm text-gray-600">
                  {resource.description}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  What you'll learn
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                    <span>Core concepts and principles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                    <span>Practical applications</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                    <span>Historical context</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;