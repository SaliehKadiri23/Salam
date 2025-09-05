import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
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
import { toggleBookmark, updateProgress, addReview, markSectionAsCompleted } from '../../redux/userSlice';
import { useGetResourcesQuery } from '../../services/apiSlice';
import CommentsSection from './CommentsSection';
import MarkdownRenderer from './MarkdownRenderer';
import ReviewForm from './ReviewForm';

const ResourceDetailView = () => {
  const dispatch = useDispatch();
  const { selectedResource } = useSelector((state) => state.ui);
  const { bookmarkedItems, reviews, progressItems, completedItems, completedSections } = useSelector(
    (state) => state.user
  );
  const { data: resourcesData } = useGetResourcesQuery();
  const allResources = resourcesData?.data || [];

  const [expandedSections, setExpandedSections] = useState({});
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [completionToastShown, setCompletionToastShown] = useState(false);
  const contentSectionsRef = useRef(null);
  const sectionRefs = useRef({});

  if (!selectedResource) {
    return null;
  }

  const resource = selectedResource;
  const isBookmarked = bookmarkedItems.includes(resource._id);
  const resourceReviews = reviews[resource._id] || [];
  const progress = progressItems[resource._id] || 0;
  const isResourceCompleted = completedItems.includes(resource._id);
  const resourceCompletedSections = completedSections[resource._id] || [];

  const averageRating =
    resourceReviews.length > 0
      ? resourceReviews.reduce((sum, review) => sum + review.rating, 0) /
        resourceReviews.length
      : resource.rating;

  const handleAddReview = (review) => {
    dispatch(addReview({ resourceId: resource.id, review }));
  };

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

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const recommendedResources = getRecommendedResources(resource);

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
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-sm font-medium text-emerald-700 dark:text-emerald-300 capitalize">
                    {resource.type}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                    {resource.duration}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {resource.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                  by {resource.author}
                </p>
                {(resource.type === 'video' || resource.type === 'podcast') && (
                  <div className="flex justify-center mb-6">
                    <button 
                      onClick={() => dispatch(openResourceDetail(resource))}
                      className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
                    >
                      <Play className="w-6 h-6 text-white ml-1" />
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center dark:text-gray-100 space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{resource.views} views</span>
                  </div>
                  <div className="flex items-center dark:text-gray-100 space-x-1">
                    <Star className="w-4 h-4 fill-current text-amber-400" />
                    <span>
                      {averageRating.toFixed(1)} ({resourceReviews.length}{" "}
                      reviews)
                    </span>
                  </div>
                  <div className="flex items-center dark:text-gray-100 space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(resource.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="md:col-span-1 col-span-3 md:mt-0 mt-2">
                    <button
                      onClick={() => dispatch(toggleBookmark(resource._id))}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-200 dark:border-emerald-600 rounded-lg hover:bg-gray-50 dark:hover:bg-green-700 transition-colors w-full justify-center"
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
                {/* Progress Button */}
                {progress < 100 && (
                  <div className="mt-6">
                    <button
                      className="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
                      onClick={() => {
                        if (progress >= 100) {
                          // Already completed
                          return;
                        }
                        
                        if (progress === 0) {
                          // First time starting - scroll to first section and open it
                          if (resource.contentSections && resource.contentSections.length > 0) {
                            const firstSectionKey = resource.contentSections[0].id || `section-0-${resource.contentSections[0].title || 'untitled'}`;
                            
                            // Open the first section
                            setExpandedSections(prev => ({
                              ...prev,
                              [firstSectionKey]: true
                            }));
                            
                            // Scroll to content sections
                            setTimeout(() => {
                              contentSectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
                              
                              // Also scroll to the first section specifically
                              setTimeout(() => {
                                sectionRefs.current[firstSectionKey]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }, 300);
                            }, 100);
                          }
                        } else {
                        // Continue learning - just update progress
                        const progressIncrement = Math.max(5, Math.floor(100 / (resource.contentSections?.length || 4)));
                        const newProgress = Math.min(progress + progressIncrement, 100);
                        dispatch(updateProgress({ 
                          id: resource.id, 
                          progress: newProgress 
                        }));
                      }
                      }}
                    >
                      {progress >= 100
                        ? "Completed"
                        : progress > 0
                        ? "Continue Learning"
                        : "Start Learning"}
                    </button>
                  </div>
                )}
                {/* Write Review Button */}
                {progress >= 100 && (
                  <div className="mt-4">
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-emerald-600 text-gray-700 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm flex items-center justify-center space-x-2"
                    >
                      <Star className="w-5 h-5" />
                      <span>Write a Review</span>
                    </button>
                  </div>
                )}
                {/* Review Form */}
                {showReviewForm && (
                  <div className="mt-4">
                    <ReviewForm
                      onSubmit={handleAddReview}
                      onClose={() => setShowReviewForm(false)}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Content Sections */}
            <div ref={contentSectionsRef} className="bg-white dark:bg-black/40 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-600 mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Content
                </h2>
                <div className="space-y-4">
                  {resource.contentSections && resource.contentSections.map((section, index) => {
                    // Create a unique key for each section
                    const sectionKey = section.id || `section-${index}-${section.title || 'untitled'}`;
                    
                    // Check if this specific section is completed
                    const isSectionCompleted = resourceCompletedSections.includes(sectionKey) || 
                      isResourceCompleted || 
                      (progress > 0 && index < Math.floor((progress / 100) * resource.contentSections.length));
                    
                    return (
                      <div 
                        key={sectionKey} 
                        ref={el => sectionRefs.current[sectionKey] = el}
                        className="border border-gray-200 dark:border-emerald-600 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleSection(sectionKey)}
                          className="w-full text-left p-4 bg-gray-50 dark:bg-black/40 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">
                              {section.title || `Section ${section.order || index + 1}`}
                            </h3>
                            {isSectionCompleted && (
                              <CheckCircle2 className="w-5 h-5 text-green-500 ml-2" />
                            )}
                          </div>
                          {expandedSections[sectionKey] ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                          )}
                        </button>
                        
                        {expandedSections[sectionKey] && (
                          <div className="p-4 bg-white dark:bg-black/20">
                            <MarkdownRenderer content={section.content} />
                            
                            {/* Continue Reading Button */}
                            <div className="mt-4 flex justify-end">
                              <button
                                onClick={() => {
                                  // Close current section
                                  setExpandedSections(prev => ({
                                    ...prev,
                                    [sectionKey]: false
                                  }));
                                  
                                  // Only mark this section as completed if it's not already completed
                                  if (!resourceCompletedSections.includes(sectionKey)) {
                                    dispatch(markSectionAsCompleted({ 
                                      resourceId: resource._id, 
                                      sectionId: sectionKey 
                                    }));
                                  }
                                  
                                  // Update progress
                                  const progressIncrement = Math.max(5, Math.floor(100 / resource.contentSections.length));
                                  const newProgress = Math.min(progress + progressIncrement, 100);
                                  
                                  // Check if this is the last section and course is being completed for the first time
                                  if (index === resource.contentSections.length - 1) {
                                    if (newProgress >= 100 && progress < 100 && !completionToastShown) {
                                      // Course completed for the first time
                                      setCompletionToastShown(true);
                                      toast.success(`🎉 Congratulations! You've completed "${resource.title}"`, {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                      });
                                    }
                                    // Update progress
                                    dispatch(updateProgress({ 
                                      id: resource._id, 
                                      progress: newProgress 
                                    }));
                                    // Last section - do nothing else, just complete
                                    return;
                                  }
                                  
                                  // Update progress for non-last sections
                                  dispatch(updateProgress({ 
                                    id: resource._id, 
                                    progress: newProgress 
                                  }));
                                  
                                  // Open next section if available
                                  const nextSection = resource.contentSections[index + 1];
                                  const nextSectionKey = nextSection.id || `section-${index + 1}-${nextSection.title || 'untitled'}`;
                                  
                                  setTimeout(() => {
                                    setExpandedSections(prev => ({
                                      ...prev,
                                      [nextSectionKey]: true
                                    }));
                                    
                                    // Scroll to next section
                                    setTimeout(() => {
                                      sectionRefs.current[nextSectionKey]?.scrollIntoView({ 
                                        behavior: 'smooth', 
                                        block: 'center' 
                                      });
                                    }, 100);
                                  }, 300);
                                }}
                                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                                  index === resource.contentSections.length - 1
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                }`}
                              >
                                {index === resource.contentSections.length - 1 ? 'Finish Reading' : 'Continue Reading'}
                              </button>
                            </div>
                            
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
            {recommendedResources && recommendedResources.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



export default ResourceDetailView
