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
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { closeResourceDetail, openResourceDetail } from '../../redux/uiSlice';
import { toggleBookmark } from '../../redux/userSlice';
import { useGetResourcesQuery } from '../../services/apiSlice';
import CommentsSection from './CommentsSection';
import MarkdownRenderer from './MarkdownRenderer';

const ResourceDetailView = () => {
  const dispatch = useDispatch();
  const { selectedResource } = useSelector((state) => state.ui);
  const { bookmarkedItems, reviews, progressItems } = useSelector(
    (state) => state.user
  );
  const { data: resourcesData } = useGetResourcesQuery();
  const allResources = resourcesData?.data || [];

  const [expandedSections, setExpandedSections] = useState({});

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
    return allResources
      .filter(
        (res) =>
          res.id !== currentResource.id &&
          (res.category === currentResource.category ||
            res.tags?.some((tag) => currentResource.tags?.includes(tag)))
      )
      .slice(0, 3);
  };

  const recommendedResources = getRecommendedResources(resource);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => dispatch(closeResourceDetail())}
          className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500 hover:text-emerald-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Resources</span>
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-black/40 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-600 overflow-hidden mb-6">
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
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-100">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{resource.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-amber-400" />
                      <span>
                        {averageRating.toFixed(1)} ({resourceReviews.length}{" "}
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
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-200 dark:border-emerald-600 rounded-lg hover:bg-gray-50 dark:hover:bg-green-700 transition-colors"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-gray-600 dark:text-gray-100" />
                    )}
                    <span className="text-sm dark:text-gray-100">
                      {isBookmarked ? "Bookmarked" : "Bookmark"}
                    </span>
                  </button>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-100">
                      Progress
                    </span>
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">
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
                <div className="mb-6">
                  <MarkdownRenderer content={resource.description} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {resource.tags?.map((tag) => (
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
            
            {/* Content Sections */}
            <div className="bg-white dark:bg-black/40 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-600 mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Content
                </h2>
                <div className="space-y-4">
                  {resource.contentSections && resource.contentSections.map((section, index) => {
                    // Create a unique key for each section
                    const sectionKey = section.id || `section-${index}-${section.title || 'untitled'}`;
                    
                    return (
                      <div 
                        key={sectionKey} 
                        className="border border-gray-200 dark:border-emerald-600 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleSection(sectionKey)}
                          className="w-full text-left p-4 bg-gray-50 dark:bg-black/40 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
                        >
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            {section.title || `Section ${section.order || index + 1}`}
                          </h3>
                          {expandedSections[sectionKey] ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                          )}
                        </button>
                        
                        {expandedSections[sectionKey] && (
                          <div className="p-4 bg-white dark:bg-black/20">
                            <MarkdownRenderer content={section.content} />
                            
                            {/* Media Gallery */}
                            {section.media && section.media.length > 0 && (
                              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                {section.media.map((media, mediaIndex) => (
                                  <div key={`${sectionKey}-media-${mediaIndex}`} className="relative group">
                                    {media.type === 'image' ? (
                                      <img 
                                        src={media.url} 
                                        alt={media.alt} 
                                        className="w-full h-24 object-cover rounded border border-gray-200 dark:border-gray-600"
                                      />
                                    ) : (
                                      <div className="w-full h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                                        <span className="text-xs text-gray-500 dark:text-gray-300">
                                          {media.type.toUpperCase()}
                                        </span>
                                      </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                                      <Play className="w-6 h-6 text-white" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <CommentsSection resourceId={resource.id} />
          </div>
          
          <div className="space-y-6">
            {/* Useful Resources Section */}
            {resource.usefulResources && resource.usefulResources.length > 0 && (
              <div className="bg-white dark:bg-black/40 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Useful Resources
                </h3>
                <div className="space-y-3">
                  {resource.usefulResources.map((usefulResource, index) => {
                    // Create a unique key for each useful resource
                    const resourceKey = usefulResource.id || `useful-resource-${index}-${usefulResource.title || 'untitled'}`;
                    
                    return (
                      <div
                        key={resourceKey}
                        className="flex items-center justify-between p-3 dark:border dark:border-emerald-600 bg-gray-50 dark:bg-black/40 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {usefulResource.title}
                            </p>
                            {usefulResource.description && (
                              <p className="text-xs text-gray-600 dark:text-gray-100 truncate max-w-[150px]">
                                {usefulResource.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <button className="p-2 text-gray-400 dark:text-gray-100 hover:text-emerald-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Recommended Resources Section */}
            <div className="bg-white dark:bg-black/40 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-600 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Recommended
              </h3>
              <div className="space-y-4">
                {recommendedResources.map((rec) => {
                  // Create a unique key for each recommended resource
                  const recKey = rec.id || `rec-${rec.title || 'untitled'}`;
                  
                  return (
                    <button
                      key={recKey}
                      onClick={() => dispatch(openResourceDetail(rec))}
                      className="w-full text-left p-3 bg-gray-50 dark:bg-black/40 dark:border dark:border-emerald-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex space-x-3">
                        <div className="w-16 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1 truncate">
                            {rec.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-200 mb-1">
                            {rec.author}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-100">
                            <Clock className="w-3 h-3" />
                            <span>{rec.duration}</span>
                            <Star className="w-3 h-3 fill-current text-amber-400" />
                            <span>{rec.rating}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailView;