import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  Play,
  Clock,
  Users,
  Star,
  TrendingUp,
  CheckCircle2,
  ChevronDown,
  Heart,
  Share2,
  Download,
  Eye,
  Award,
  Target,
  Book,
  Headphones,
  Video,
  FileText,
  ArrowRight,
  Grid3X3,
  List,
  Send,
  ArrowLeft,
  MessageCircle,
  Calendar,
  User,
  ThumbsUp,
} from "lucide-react";

// ==================== MAIN APP COMPONENT ====================
const IslamicResourcesPlatform = () => {
  // Global State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set([1, 3, 5]));
  const [completedItems, setCompletedItems] = useState(new Set([1, 2]));
  const [progressItems, setProgressItems] = useState(
    new Map([
      [3, 45],
      [4, 78],
    ])
  );
  const [currentView, setCurrentView] = useState("main"); // 'main' or 'detail'
  const [selectedResource, setSelectedResource] = useState(null);
  const [reviews, setReviews] = useState(new Map());

  // Resource Data
  const resourcesData = [
    {
      id: 1,
      title: "The Essence of Faith",
      description:
        "Explore the core principles of Islam and strengthen your spiritual foundation",
      category: "aqidah",
      type: "article",
      duration: "15 min read",
      author: "Dr. Ahmed Hassan",
      rating: 4.9,
      views: 2340,
      image:
        "https://images.unsplash.com/photo-1584502062692-99d0115f3f79?w=400&h=300&fit=crop",
      tags: ["faith", "basics", "spirituality"],
      publishedDate: "2024-01-15",
      estimatedTime: 15,
      chapters: [
        { id: 1, title: "Introduction to Faith", duration: 5 },
        { id: 2, title: "The Six Pillars of Iman", duration: 7 },
        { id: 3, title: "Strengthening Your Faith", duration: 3 },
      ],
      downloads: [
        { name: "Faith Guide PDF", size: "2.3 MB", type: "pdf" },
        { name: "Audio Recitation", size: "15.7 MB", type: "audio" },
      ],
    },
    {
      id: 2,
      title: "Understanding Islamic Art",
      description:
        "Discover the rich history, symbolism, and spiritual significance of Islamic artistic traditions",
      category: "culture",
      type: "video",
      duration: "32 min",
      author: "Fatima Al-Zahra",
      rating: 4.7,
      views: 1890,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["art", "history", "culture"],
      publishedDate: "2024-01-12",
      estimatedTime: 32,
      chapters: [
        { id: 1, title: "Origins of Islamic Art", duration: 8 },
        { id: 2, title: "Geometric Patterns", duration: 12 },
        { id: 3, title: "Calligraphy and Design", duration: 12 },
      ],
      downloads: [
        { name: "Art Pattern Templates", size: "5.2 MB", type: "zip" },
      ],
    },
    {
      id: 3,
      title: "Family Values in Islam",
      description:
        "Learn about the importance of family relationships and responsibilities in Islamic teachings",
      category: "family",
      type: "podcast",
      duration: "28 min",
      author: "Imam Mohammad Ali",
      rating: 4.8,
      views: 3120,
      image:
        "",
      tags: ["family", "relationships", "values"],
      publishedDate: "2024-01-10",
      estimatedTime: 28,
      chapters: [
        { id: 1, title: "The Sacred Bond of Marriage", duration: 9 },
        { id: 2, title: "Raising Righteous Children", duration: 10 },
        { id: 3, title: "Honoring Parents and Elders", duration: 9 },
      ],
      downloads: [
        { name: "Family Values Handbook", size: "1.8 MB", type: "pdf" },
      ],
    },
    {
      id: 4,
      title: "Quranic Studies Advanced",
      description:
        "Deep dive into Quranic interpretation, linguistic analysis, and theological insights",
      category: "quran",
      type: "course",
      duration: "2h 15min",
      author: "Dr. Amina Yusuf",
      rating: 4.9,
      views: 890,
      image:
        "https://images.unsplash.com/photo-1544816565-c9b20136fef0?w=400&h=300&fit=crop",
      tags: ["quran", "advanced", "linguistics"],
      publishedDate: "2024-01-08",
      estimatedTime: 135,
      chapters: [
        { id: 1, title: "Principles of Tafsir", duration: 45 },
        { id: 2, title: "Arabic Language Structure", duration: 50 },
        { id: 3, title: "Historical Context", duration: 40 },
      ],
      downloads: [
        { name: "Tafsir Reference Guide", size: "12.4 MB", type: "pdf" },
        { name: "Arabic Grammar Charts", size: "3.1 MB", type: "pdf" },
      ],
    },
    {
      id: 5,
      title: "Quranic Studies Intermediate",
      description:
        "Deep dive into Quranic interpretation, linguistic analysis, and theological insights",
      category: "quran",
      type: "course",
      duration: "1h 9min",
      author: "Dr. Muhammad Ali",
      rating: 5.0,
      views: 18900,
      image:
        "https://images.unsplash.com/photo-1544816565-c9b20136fef0?w=400&h=300&fit=crop",
      tags: ["quran", "advanced", "linguistics"],
      publishedDate: "2025-01-08",
      estimatedTime: 135,
      chapters: [
        { id: 1, title: "Principles of Tafsir", duration: 45 },
        { id: 2, title: "Arabic Language Structure", duration: 50 },
        { id: 3, title: "Historical Context", duration: 40 },
      ],
      downloads: [
        { name: "Tafsir Reference Guide", size: "12.4 MB", type: "pdf" },
        { name: "Arabic Grammar Charts", size: "3.1 MB", type: "pdf" },
      ],
    },
  ];

  // Resource Category Dropdown Menu
  const categories = [
    { id: "all", name: "All Resources", icon: Book },
    { id: "quran", name: "Quranic Studies", icon: Book },
    { id: "hadith", name: "Hadith", icon: FileText },
    { id: "fiqh", name: "Fiqh", icon: Award },
    { id: "aqidah", name: "Aqidah", icon: Target },
    { id: "seerah", name: "Seerah", icon: Star },
    { id: "history", name: "History", icon: Clock },
    { id: "family", name: "Family", icon: Heart },
    { id: "culture", name: "Culture", icon: Award },
  ];

  // Resource Type Dropdown Menu
  const resourceTypes = [
    { id: "all", name: "All Types", icon: FileText },
    { id: "article", name: "Articles", icon: FileText },
    { id: "video", name: "Videos", icon: Video },
    { id: "podcast", name: "Podcasts", icon: Headphones },
    { id: "course", name: "Courses", icon: Book },
  ];

  // Filtered Resources
  const filteredResources = useMemo(() => {
    return resourcesData.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" || resource.category === selectedCategory;
      const matchesType =
        selectedType === "all" || resource.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchQuery, selectedCategory, selectedType]);

  // Event Handlers
  // Adding & Removing Bookmarks
  const toggleBookmark = (id) => {
    setBookmarkedItems((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(id)) {
        newBookmarks.delete(id);
      } else {
        newBookmarks.add(id);
      }
      return newBookmarks;
    });
  };

  // Updating User Progress
  const updateProgress = (id, progress) => {
    setProgressItems((prev) => new Map(prev.set(id, progress)));
    if (progress >= 100) {
      setCompletedItems((prev) => new Set(prev.add(id)));
    }
  };

  // Opening a Particular Resource
  const openResourceDetail = (resource) => {
    setSelectedResource(resource);
    setCurrentView("detail");
  };

  // Closing a Particular Resource
  const closeResourceDetail = () => {
    setCurrentView("main");
    setSelectedResource(null);
  };

  // --- Showing Recommended / Related Resources
  const getRecommendedResources = (currentResource) => {
    return resourcesData
      .filter(
        (resource) =>
          resource.id !== currentResource.id &&
          (resource.category === currentResource.category ||
            resource.tags.some((tag) => currentResource.tags.includes(tag)))
      )
      .slice(0, 3);
  };

  // User Stats
  const userStats = {
    totalCompleted: completedItems.size,
    totalBookmarked: bookmarkedItems.size,
    totalInProgress: progressItems.size,
    totalTimeSpent: Array.from(completedItems).reduce((total, id) => {
      const resource = resourcesData.find((r) => r.id === id);
      return total + (resource?.estimatedTime || 0);
    }, 0),
  };

  // Render Views
  if (currentView === "detail" && selectedResource) {
    return (
      <ResourceDetailView
        resource={selectedResource}
        onBack={closeResourceDetail}
        recommendedResources={getRecommendedResources(selectedResource)}
        isBookmarked={bookmarkedItems.has(selectedResource.id)}
        onToggleBookmark={() => toggleBookmark(selectedResource.id)}
        progress={progressItems.get(selectedResource.id) || 0}
        onUpdateProgress={(progress) =>
          updateProgress(selectedResource.id, progress)
        }
        reviews={reviews.get(selectedResource.id) || []}
        onAddReview={(review) => {
          setReviews((prev) => {
            const newReviews = new Map(prev);
            const resourceReviews = newReviews.get(selectedResource.id) || [];
            newReviews.set(selectedResource.id, [...resourceReviews, review]);
            return newReviews;
          });
        }}
        onNavigateToResource={openResourceDetail}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader userStats={userStats} />

        {/* Search and Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categories={categories}
          resourceTypes={resourceTypes}
        />

        {/* Results and View Toggle */}
        <ResultsHeader
          resultCount={filteredResources.length}
          searchQuery={searchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Resources Display */}
        <ResourcesGrid
          resources={filteredResources}
          viewMode={viewMode}
          bookmarkedItems={bookmarkedItems}
          completedItems={completedItems}
          progressItems={progressItems}
          onToggleBookmark={toggleBookmark}
          onUpdateProgress={updateProgress}
          onOpenDetail={openResourceDetail}
          getRecommendedResources={getRecommendedResources}
          reviews={reviews}
          setReviews={setReviews}
        />

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <EmptyState
            onClearFilters={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedType("all");
            }}
          />
        )}
      </main>
    </div>
  );
};

// User Stats Header
const PageHeader = ({ userStats }) => (
  <div className="mb-8">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Islamic Resources & Learning
        </h1>
        <p className="text-gray-600">
          Deepen your understanding with curated Islamic knowledge
        </p>
      </div>

      {/* User Progress Stats */}
      <div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
        <StatCard
          icon={CheckCircle2}
          value={userStats.totalCompleted}
          label="Completed"
          color="emerald"
        />
        <StatCard
          icon={BookmarkCheck}
          value={userStats.totalBookmarked}
          label="Bookmarked"
          color="amber"
        />
        <StatCard
          icon={TrendingUp}
          value={userStats.totalInProgress}
          label="In Progress"
          color="blue"
        />
        <StatCard
          icon={Clock}
          value={`${userStats.totalTimeSpent}m`}
          label="Time Spent"
          color="purple"
        />
      </div>
    </div>
  </div>
);

// Individual Stat Card
const StatCard = ({ icon: Icon, value, label, color }) => {
  const colorClasses = {
    emerald: "text-emerald-600",
    amber: "text-amber-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
  };

  return (
    <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-emerald-100">
      <div className="flex items-center space-x-2">
        <Icon className={`w-4 h-4 ${colorClasses[color]}`} />
        <span className="text-sm font-medium text-gray-900">{value}</span>
        <span className="text-xs text-gray-600">{label}</span>
      </div>
    </div>
  );
};

// Search and Filter Component
const SearchAndFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
  showFilters,
  setShowFilters,
  categories,
  resourceTypes,
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 mb-8">
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search resources, topics, or authors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Filter Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center space-x-2 px-4 py-3 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200"
      >
        <Filter className="w-5 h-5" />
        <span className="font-medium">Filters</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            showFilters ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>

    {/* Expanded Filters */}
    {showFilters && (
      <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSelect
          label="Category"
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={categories}
        />
        <CustomSelect
          label="Resource Type"
          value={selectedType}
          onChange={setSelectedType}
          options={resourceTypes}
        />
      </div>
    )}
  </div>
);

// Custom Select (For Drop Down Menu)
const CustomSelect = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.id === value);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-white border border-gray-200 rounded-lg hover:border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors flex items-center justify-between"
      >
        <span className="flex items-center space-x-2">
          {selectedOption?.icon && (
            <selectedOption.icon className="w-4 h-4 text-gray-500" />
          )}
          <span>{selectedOption?.name}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-emerald-50 hover:text-emerald-600 transition-colors flex items-center space-x-2"
            >
              {option.icon && <option.icon className="w-4 h-4" />}
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Results - Header Section
const ResultsHeader = ({ resultCount, searchQuery, viewMode, setViewMode }) => (
  <div className="flex items-center justify-between mb-6">
    <p className="text-gray-600">
      Found <span className="font-semibold text-gray-900">{resultCount}</span>{" "}
      resources
      {searchQuery && (
        <span>
          {" "}
          for "<span className="font-medium">{searchQuery}</span>"
        </span>
      )}
    </p>

    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">View:</span>
      <button
        onClick={() => setViewMode("grid")}
        className={`p-2 rounded-lg transition-colors ${
          viewMode === "grid"
            ? "bg-emerald-100 text-emerald-600"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <Grid3X3 className="w-4 h-4" />
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`p-2 rounded-lg transition-colors ${
          viewMode === "list"
            ? "bg-emerald-100 text-emerald-600"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Resources Grid Component
const ResourcesGrid = ({
  resources,
  viewMode,
  bookmarkedItems,
  completedItems,
  progressItems,
  onToggleBookmark,
  onUpdateProgress,
  onOpenDetail,
  getRecommendedResources,
  reviews,
  setReviews,
}) => (
  <div
    className={
      viewMode === "grid"
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        : "space-y-4 mb-12"
    }
  >
    {resources.map((resource) => (
      <ResourceCard
        key={resource.id}
        resource={resource}
        viewMode={viewMode}
        isBookmarked={bookmarkedItems.has(resource.id)}
        isCompleted={completedItems.has(resource.id)}
        progress={progressItems.get(resource.id) || 0}
        onToggleBookmark={() => onToggleBookmark(resource.id)}
        onUpdateProgress={(progress) => onUpdateProgress(resource.id, progress)}
        onOpenDetail={() => onOpenDetail(resource)}
        recommendedResources={getRecommendedResources(resource)}
        reviews={reviews.get(resource.id) || []}
        onAddReview={(review) => {
          setReviews((prev) => {
            const newReviews = new Map(prev);
            const resourceReviews = newReviews.get(resource.id) || [];
            newReviews.set(resource.id, [...resourceReviews, review]);
            return newReviews;
          });
        }}
      />
    ))}
  </div>
);

// Resource Card Component
const ResourceCard = ({
  resource,
  viewMode,
  isBookmarked,
  isCompleted,
  progress,
  onToggleBookmark,
  onUpdateProgress,
  onOpenDetail,
  recommendedResources,
  reviews,
  onAddReview,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return Video;
      case "podcast":
        return Headphones;
      case "course":
        return Book;
      default:
        return FileText;
    }
  };

  const TypeIcon = getTypeIcon(resource.type);
  const isListView = viewMode === "list";

  const cardClass = isListView
    ? "flex bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-emerald-200 transition-all duration-300"
    : "group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-1";

  return (
    <div className={cardClass}>
      {/* Image Container */}
      <div
        className={
          isListView ? "w-[40%] flex-shrink-0" : "relative overflow-hidden"
        }
      >
        <div
          className={
            isListView
              ? "h-full bg-gray-100 relative"
              : "aspect-video bg-gray-100 relative"
          }
        >
          {!imageLoaded && (
            // Rotating Spinner If Image has not loaded
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          )}
          <img
            src={resource.image}
            alt={resource.title}
            className={`w-full h-full object-cover transition-all duration-300 ${
              !isListView ? "group-hover:scale-105" : ""
            } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Overlay for grid view (Play, Share, Download) */}
          {!isListView && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button
                  onClick={onOpenDetail}
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

        {/* Type and Bookmark Badges */}
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
              onClick={onToggleBookmark}
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

      {/* Content */}
      <div className={isListView ? "flex-1 p-6" : "p-6"}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors">
              {resource.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {resource.description}
            </p>
          </div>

          {/* Bookmark for list view */}
          {isListView && (
            <button
              onClick={onToggleBookmark}
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
            <button onClick={onOpenDetail} className="flex w-full my-3 text-white font-bold py-2 rounded-lg transition-all duration-300 hover:scale-107 justify-center items-center text-center bg-blue-600 ">
              {resource.type === "article"
                ? "Read Article"
                : resource.type === "video"
                ? "Watch Video"
                : resource.type === "podcast"
                ? "Listen To Podcast"
                : resource.type === "course" ? "View Course" : "View"}
            </button>
          </div>
        </div>

        {/* Resource Information */}
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

        {/* Author */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">by {resource.author}</span>
        </div>

        {/* Progress Bar */}
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

        {/* Status Badge */}
        {isCompleted && (
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Completed</span>
            </div>
          </div>
        )}

        {/* Tags */}
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

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
            onClick={() => {
              if (progress < 100) {
                onUpdateProgress(Math.min(progress + 25, 100));
              }
            }}
          >
            {isCompleted
              ? "Review"
              : progress > 0
              ? "Continue"
              : "Start Learning"}
          </button>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 border border-emerald-200 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
          >
            Details
          </button>
        </div>

        {/* Review Button for Completed Resources */}
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

        {/* Review Form */}
        {showReviewForm && (
          <ReviewForm
            onSubmit={onAddReview}
            onClose={() => setShowReviewForm(false)}
          />
        )}

        {/* Expandable Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  About this resource
                </h4>
                <p className="text-sm text-gray-600">{resource.description}</p>
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

              {/* Recommended Resources */}
              {recommendedResources.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    You might also like
                  </h4>
                  <div className="space-y-2">
                    {recommendedResources.slice(0, 2).map((rec) => (
                      <button
                        key={rec.id}
                        onClick={() => onOpenDetail(rec)}
                        className="w-full flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                      >
                        <div className="w-12 h-8 bg-gradient-to-br from-emerald-100 to-green-100 rounded flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {rec.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {rec.duration}
                          </p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== REVIEW FORM COMPONENT ====================
const ReviewForm = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit({
        id: Date.now(),
        rating,
        comment,
        author: "Current User",
        date: new Date().toLocaleDateString(),
        likes: 0,
      });
      onClose();
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-medium text-gray-900 mb-3">Write a Review</h4>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Star Rating */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-5 h-5 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            Your thoughts
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this resource..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
            rows="3"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={rating === 0}
            className="flex-1 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
          >
            <Send className="w-3 h-3" />
            <span>Submit</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// ==================== RESOURCE DETAIL VIEW COMPONENT ====================
const ResourceDetailView = ({
  resource,
  onBack,
  recommendedResources,
  isBookmarked,
  onToggleBookmark,
  progress,
  onUpdateProgress,
  reviews,
  onAddReview,
  onNavigateToResource,
}) => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : resource.rating;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Resources</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Resource Header */}
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

                {/* Play Button */}
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Play className="w-6 h-6 text-emerald-600 ml-1" />
                </button>
              </div>

              {/* Resource Info */}
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
                        {averageRating.toFixed(1)} ({reviews.length} reviews)
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{resource.publishedDate}</span>
                    </div>
                  </div>

                  <button
                    onClick={onToggleBookmark}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-gray-600" />
                    )}
                    <span className="text-sm">
                      {isBookmarked ? "Bookmarked" : "Bookmark"}
                    </span>
                  </button>
                </div>

                {/* Progress */}
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

                {/* Description */}
                <p className="text-gray-600 mb-6">{resource.description}</p>

                {/* Tags */}
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

            {/* Chapter Navigation */}
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
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
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

            {/* Comments Section */}
            <CommentsSection
              reviews={reviews}
              onAddReview={onAddReview}
              showReviewForm={showReviewForm}
              setShowReviewForm={setShowReviewForm}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Downloads */}
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
                        <p className="text-xs text-gray-600">{download.size}</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Resources */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommended
              </h3>
              <div className="space-y-4">
                {recommendedResources.map((rec) => (
                  <button
                    key={rec.id}
                    onClick={() => onNavigateToResource(rec)}
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

// ==================== COMMENTS SECTION COMPONENT ====================
const CommentsSection = ({
  reviews,
  onAddReview,
  showReviewForm,
  setShowReviewForm,
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-emerald-100">
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Reviews ({reviews.length})
        </h2>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <ReviewForm
            onSubmit={onAddReview}
            onClose={() => setShowReviewForm(false)}
          />
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {review.author}
                  </span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-emerald-600 transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{review.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p>No reviews yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  </div>
);

// ==================== EMPTY STATE COMPONENT ====================
const EmptyState = ({ onClearFilters }) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Search className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      No resources found
    </h3>
    <p className="text-gray-600 mb-4">
      Try adjusting your search criteria or filters
    </p>
    <button
      onClick={onClearFilters}
      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
    >
      Clear All Filters
    </button>
  </div>
);

export default IslamicResourcesPlatform;
