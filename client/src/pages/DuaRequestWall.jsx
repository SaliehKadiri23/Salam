import React, { useState, useEffect, useRef } from 'react';
import { Plus, Filter, Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import DuaRequestCard from '../components/dua-wall/DuaRequestCard';
import DuaRequestForm from '../components/dua-wall/DuaRequestForm';
import CategoryBadge from '../components/dua-wall/CategoryBadge';

const DuaRequestWall = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modern dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Category carousel state
  const categoryScrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Mock data for initial requests
  const mockRequests = [
    {
      id: '1',
      content: 'Please make dua for my family\'s health and well-being during this challenging time. May Allah grant us strength and patience.',
      category: 'health',
      isAnonymous: true,
      author: null,
      timeAgo: '2 hours ago',
      likes: 12,
      comments: 3,
      prayerCount: 45,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      content: 'I\'m seeking guidance in making a significant life decision. Please pray that I choose the path that is most pleasing to Allah.',
      category: 'guidance',
      isAnonymous: false,
      author: 'Fatima',
      timeAgo: '5 hours ago',
      likes: 8,
      comments: 5,
      prayerCount: 23,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      content: 'Please make dua for my success in my upcoming exams. May Allah grant me knowledge and understanding.',
      category: 'success',
      isAnonymous: true,
      author: null,
      timeAgo: '1 day ago',
      likes: 15,
      comments: 2,
      prayerCount: 67,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      content: 'I\'m facing financial difficulties. Please pray that Allah provides for me and my family.',
      category: 'family',
      isAnonymous: false,
      author: 'Omar',
      timeAgo: '2 days ago',
      likes: 20,
      comments: 7,
      prayerCount: 89,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '5',
      content: 'Please make dua for the safety and well-being of all those affected by the recent events in the region.',
      category: 'community',
      isAnonymous: true,
      author: null,
      timeAgo: '3 days ago',
      likes: 35,
      comments: 12,
      prayerCount: 156,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  const categories = [
    { value: 'all', label: 'All Requests' },
    { value: 'health', label: 'Health' },
    { value: 'guidance', label: 'Guidance' },
    { value: 'success', label: 'Success' },
    { value: 'family', label: 'Family' },
    { value: 'community', label: 'Community' }
  ];

  // Initialize requests on component mount
  useEffect(() => {
    setRequests(mockRequests);
    setFilteredRequests(mockRequests);
  }, []);

  // Filter requests based on category and search term
  useEffect(() => {
    let filtered = requests;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(request => request.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(request =>
        request.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (request.author && request.author.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredRequests(filtered);
  }, [requests, selectedCategory, searchTerm]);

  const handleNewRequest = (newRequest) => {
    setRequests(prev => [newRequest, ...prev]);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false); // Close dropdown when selecting
  };

  // Category carousel functions
  const checkScrollButtons = () => {
    const container = categoryScrollRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 5
      );
    }
  };

  const scrollCategories = (direction) => {
    const container = categoryScrollRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300); // Check buttons after scroll
    }
  };

  // Check scroll buttons on mount and resize
  useEffect(() => {
    checkScrollButtons();
    const container = categoryScrollRef.current;
    
    const handleScroll = () => checkScrollButtons();
    const handleResize = () => setTimeout(checkScrollButtons, 100);
    
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Dua Request Wall
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            A space to share and support each other through prayer. Join our
            community in lifting each other up through dua.
          </p>
        </div>

        {/* Action Bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Post Button */}
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Post a Dua Request
            </button>

            {/* Search and Filter */}
            <div className="flex gap-3 w-full sm:w-auto ">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-100" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 dark:bg-black/40 dark:text-gray-100 border border-gray-200 dark:border-emerald-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Category Filter Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-white dark:bg-black/70 dark:border-emerald-600 border border-gray-200 rounded-xl px-4 py-2 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 cursor-pointer hover:border-gray-300 hover:shadow-sm flex items-center gap-2 min-w-[140px]"
                >
                  <Filter className="w-4 h-4 text-gray-500  dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {
                      categories.find((cat) => cat.value === selectedCategory)
                        ?.label
                    }
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 dark:text-gray-300 absolute right-2 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-black/90  border border-gray-200 dark:border-emerald-600 rounded-xl shadow-lg z-50 py-2 max-h-64 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => handleCategoryFilter(category.value)}
                        className={`w-full py-2 text-left hover:bg-gray-50 dark:hover:bg-emerald-700 transition-colors text-sm font-medium ${
                          selectedCategory === category.value
                            ? "bg-emerald-50 dark:bg-emerald-800 text-emerald-700 dark:text-gray-100"
                            : "text-gray-700 dark:text-gray-100"
                        }`}
                      >
                        <span className="block px-4">{category.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills with Arrow Navigation */}
        <div className="mb-8 relative">
          <div className="flex items-center">
            {/* Left Arrow */}
            {showLeftArrow && (
              <button
                onClick={() => scrollCategories("left")}
                className="absolute left-0 z-10 w-10 h-10 bg-white dark:bg-black/90  border border-gray-200 dark:border-emerald-600 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-gray-50"
              >
                <ChevronLeft className="w-7 h-7 text-gray-600 dark:text-gray-100" />
              </button>
            )}

            {/* Categories Container */}
            <div
              ref={categoryScrollRef}
              className="flex gap-2 overflow-x-auto hide-scrollbar px-10 md:px-0"
            >
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryFilter(category.value)}
                  className={`
                    flex-shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 whitespace-nowrap
                    ${
                      selectedCategory === category.value
                        ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-200 dark:border-emerald-600 shadow-sm"
                        : "bg-white dark:bg-black/40  text-gray-600 dark:text-gray-100 border border-gray-200 hover:border-gray-300 dark:border-emerald-600 hover:bg-gray-50 hover:shadow-sm"
                    }
                  `}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Right Arrow */}
            {showRightArrow && (
              <button
                onClick={() => scrollCategories("right")}
                className="absolute right-0 z-10 w-10 h-10 bg-white dark:bg-black/90 border border-gray-200 dark:border-emerald-600 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-gray-50"
              >
                <ChevronRight className="w-7 h-7 text-gray-600 dark:text-gray-100" />
              </button>
            )}
          </div>
        </div>

        {/* Stats - Responsive Grid: 2 cols mobile, 3 cols tablet+ */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-black/40  flex flex-col items-center rounded-xl p-4 shadow-sm border border-gray-100 dark:border-emerald-600">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">
              {filteredRequests.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-100">
              {selectedCategory === "all"
                ? "Total Requests"
                : `${selectedCategory} Requests`}
            </div>
          </div>
          <div className="bg-white dark:bg-black/40  flex flex-col items-center rounded-xl p-4 shadow-sm border border-gray-100 dark:border-emerald-600">
            <div className="text-2xl font-bold text-blue-600">
              {filteredRequests.reduce((sum, req) => sum + req.prayerCount, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-100">
              Total Prayers
            </div>
          </div>
          <div className="bg-white dark:bg-black/40  flex flex-col items-center rounded-xl p-4 shadow-sm border border-gray-100 dark:border-emerald-600">
            <div className="text-2xl font-bold text-purple-600">
              {filteredRequests.reduce((sum, req) => sum + req.comments, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-100">
              Community Support
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <DuaRequestCard key={request.id} request={request} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400 dark:text-gray-800" />
              </div>
              <h3 className="text-lg font-medium dark:text-gray-100 mb-2">
                No requests found
              </h3>
              <p className="text-gray-600 dark:text-gray-200 mb-4">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Be the first to share a dua request with the community."}
              </p>
              {!searchTerm && selectedCategory === "all" && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl transition-colors"
                >
                  Post the First Request
                </button>
              )}
            </div>
          )}
        </div>

        {/* Load More Button (for future pagination) */}
        {filteredRequests.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white dark:bg-black/40  hover:bg-gray-50 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-emerald-600 px-6 py-3 rounded-xl transition-colors">
              Load More Duas
            </button>
          </div>
        )}
      </div>

      {/* Dua Request Form Modal */}
      <DuaRequestForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleNewRequest}
      />
    </div>
  );
};

export default DuaRequestWall;