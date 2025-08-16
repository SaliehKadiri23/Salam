import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ArrowLeft,
  Play,
  Eye,
  Star,
  Calendar,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  FileText,
  Download,
  Clock,
} from 'lucide-react';
import { closeResourceDetail, openResourceDetail } from '../../redux/uiSlice';
import { toggleBookmark } from '../../redux/userSlice';
import CommentsSection from './CommentsSection';

const ResourceDetailView = () => {
  const dispatch = useDispatch();
  const { selectedResource } = useSelector((state) => state.ui);
  const resources = useSelector((state) => state.resources);
  const { bookmarkedItems, reviews, progressItems } = useSelector(
    (state) => state.user
  );

  const [activeChapter, setActiveChapter] = useState(0);

  if (!selectedResource) {
    return null;
  }

  const resource = selectedResource;
  const isBookmarked = bookmarkedItems.includes(resource.id);
  const resourceReviews = reviews[resource.id] || [];
  const progress = progressItems[resource.id] || 0;

  const averageRating =
    resourceReviews.length > 0
      ? resourceReviews.reduce((sum, review) => sum + review.rating, 0) /
        resourceReviews.length
      : resource.rating;

  const getRecommendedResources = (currentResource) => {
    return resources.all
      .filter(
        (res) =>
          res.id !== currentResource.id &&
          (res.category === currentResource.category ||
            res.tags.some((tag) => currentResource.tags.includes(tag)))
      )
      .slice(0, 3);
  };

  const recommendedResources = getRecommendedResources(resource);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => dispatch(closeResourceDetail())}
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Resources</span>
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden mb-6">
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 capitalize">
                        {resource.type}
                      </span>
                      <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                        {resource.duration}
                      </span>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                      {resource.title}
                    </h1>
                    <p className="text-gray-200 text-sm">
                      by {resource.author}
                    </p>
                  </div>
                </div>
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Play className="w-6 h-6 text-emerald-600 ml-1" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{resource.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-amber-400" />
                      <span>
                        {averageRating.toFixed(1)} ({resourceReviews.length}{' '}
                        reviews)
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{resource.publishedDate}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(toggleBookmark(resource.id))}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-gray-600" />
                    )}
                    <span className="text-sm">
                      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </span>
                  </button>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Progress
                    </span>
                    <span className="text-sm text-emerald-600">
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{resource.description}</p>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Content Structure
                </h2>
                <div className="space-y-2">
                  {resource.chapters.map((chapter, index) => (
                    <button
                      key={chapter.id}
                      onClick={() => setActiveChapter(index)}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        activeChapter === index
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      } border`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{chapter.title}</h3>
                          <p className="text-sm text-gray-500">
                            {chapter.duration} minutes
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {index < activeChapter && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          )}
                          <Play className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <CommentsSection resourceId={resource.id} />
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Downloads
              </h3>
              <div className="space-y-3">
                {resource.downloads.map((download, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {download.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {download.size}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommended
              </h3>
              <div className="space-y-4">
                {recommendedResources.map((rec) => (
                  <button
                    key={rec.id}
                    onClick={() => dispatch(openResourceDetail(rec))}
                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex space-x-3">
                      <div className="w-16 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 mb-1 truncate">
                          {rec.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-1">
                          {rec.author}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{rec.duration}</span>
                          <Star className="w-3 h-3 fill-current text-amber-400" />
                          <span>{rec.rating}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailView;