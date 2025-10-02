import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  FileText,
  ChevronDown,
  X,
  BookOpen
} from 'lucide-react';
import {
  useGetArticlesQuery,
  useAddNewArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation
} from '../services/apiSlice';
import ArticleForm from '../components/articles/ArticleForm';

const CustomSelect = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.id === value) || options.find((option) => option.value === value);
  const buttonId = `${label?.replace(/\s+/g, '-').toLowerCase()}-select`;

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors flex items-center justify-between shadow-sm hover:shadow-md"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center space-x-2 dark:text-white">
          {selectedOption?.icon && (
            <selectedOption.icon className="w-4 h-4 text-gray-500 dark:text-gray-300" aria-hidden="true" />
          )}
          <span>{selectedOption?.name || selectedOption?.label || value}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 dark:text-gray-300 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div 
          className="absolute z-10 w-full min-w-[170px] mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto"
          role="listbox"
          aria-labelledby={buttonId}
        >
          {options.map((option) => (
            <button
              key={option.id || option.value}
              onClick={() => {
                onChange(option.id || option.value);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center space-x-2 dark:text-white focus:outline-none focus:bg-emerald-100 dark:focus:bg-emerald-900/50"
              role="option"
              aria-selected={option.id === value || option.value === value}
            >
              {option.icon && <option.icon className="w-4 h-4" aria-hidden="true" />}
              <span>{option.name || option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ArticleDashboard = () => {
  const { data: articlesData, isLoading, isError, error, refetch } = useGetArticlesQuery();
  const articles = articlesData || [];
  
  const [createArticle] = useAddNewArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();
  const [deleteArticle] = useDeleteArticleMutation();
  
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Article categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'Islam', name: 'Islam' },
    { id: 'Culture', name: 'Culture' },
    { id: 'Lifestyle', name: 'Lifestyle' },
    { id: 'Community', name: 'Community' }
  ];

  // Filter and sort articles
  const filteredArticles = articles
    .filter(article => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' || article.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.publishDate) - new Date(a.publishDate);
      } else if (sortBy === 'oldest') {
        return new Date(a.publishDate) - new Date(b.publishDate);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const handleAddArticle = async (newArticle) => {
    try {
      await createArticle(newArticle).unwrap();
      setShowForm(false);
      toast.success('Article created successfully!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Failed to create article:', error);
      let errorMessage = 'Failed to create article. ';
      
      if (error?.data?.message) {
        errorMessage += error.data.message;
      } else if (error?.status === 'FETCH_ERROR') {
        errorMessage += 'Network error. Please check your connection.';
      } else if (error?.status === 400) {
        errorMessage += 'Invalid data provided. Please check the form fields.';
      } else if (error?.status === 500) {
        errorMessage += 'Server error. Please try again later.';
      } else {
        errorMessage += 'An unknown error occurred.';
      }
      
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  const handleUpdateArticle = async (updatedArticle) => {
    try {
      await updateArticle(updatedArticle).unwrap();
      setShowForm(false);
      setEditingArticle(null);
      toast.success('Article updated successfully!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Failed to update article:', error);
      let errorMessage = 'Failed to update article. ';
      
      if (error?.data?.message) {
        errorMessage += error.data.message;
      } else if (error?.status === 'FETCH_ERROR') {
        errorMessage += 'Network error. Please check your connection.';
      } else if (error?.status === 400) {
        errorMessage += 'Invalid data provided. Please check the form fields.';
      } else if (error?.status === 404) {
        errorMessage += 'Article not found. It may have been deleted.';
      } else if (error?.status === 500) {
        errorMessage += 'Server error. Please try again later.';
      } else {
        errorMessage += 'An unknown error occurred.';
      }
      
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  const handleDeleteArticle = async (_id) => {
    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      try {
        await deleteArticle(_id).unwrap();
        toast.success('Article deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        console.error('Failed to delete article:', error);
        let errorMessage = 'Failed to delete article. ';
        
        if (error?.data?.message) {
          errorMessage += error.data.message;
        } else if (error?.status === 'FETCH_ERROR') {
          errorMessage += 'Network error. Please check your connection.';
        } else if (error?.status === 404) {
          errorMessage += 'Article not found. It may have already been deleted.';
        } else if (error?.status === 500) {
          errorMessage += 'Server error. Please try again later.';
        } else {
          errorMessage += 'An unknown error occurred.';
        }
        
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    }
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    toast.error(`Error loading articles: ${error?.data?.message || 'Unknown error'}`, {
      position: "bottom-right",
      autoClose: 5000,
    });
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {error?.data?.message || "An error occurred while loading articles."}
            </p>
            <button 
              onClick={refetch}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Article Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create, edit, and manage your Islamic articles
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white col-span-2 dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Articles
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {articles.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Islam
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {articles.filter((a) => a.category === "Islam").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <FileText className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Culture
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {articles.filter((a) => a.category === "Culture").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
                  aria-label="Search articles"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:gap-3 w-full">
                {/* Category Dropdown */}
                <div className="min-w-[120px] mb-2 sm:mb-0 mr-2">
                  <CustomSelect
                    label="Category"
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    options={categories}
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="min-w-[120px] mb-2 sm:mb-0 mr-2">
                  <CustomSelect
                    label="Sort by"
                    value={sortBy}
                    onChange={setSortBy}
                    options={[
                      { id: "newest", name: "Newest" },
                      { id: "oldest", name: "Oldest" },
                      { id: "title", name: "Title" },
                    ]}
                  />
                </div>

                {/* Add Article Button */}
                <button
                  onClick={() => {
                    setEditingArticle(null);
                    setShowForm(true);
                  }}
                  className="flex items-center sm:mt-3 md:mt-0 justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-label="Add new article"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span className="sm:inline">Add Article</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Article List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Article
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Published
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Read Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredArticles.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No articles found.{" "}
                      {searchQuery ||
                      selectedCategory !== "all"
                        ? "Try changing your filters."
                        : "Add your first article!"}
                    </td>
                  </tr>
                ) : (
                  filteredArticles.map((article) => {
                    return (
                      <tr
                        key={article._id || article.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center">
                              <FileText
                                className="h-5 w-5 text-emerald-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {article.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                {article.excerpt}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white capitalize">
                            {article.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {article.author}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(article.publishDate)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {article.readTime} min read
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleEditArticle(article)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                              aria-label={`Edit article: ${article.title}`}
                            >
                              <Edit className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteArticle(
                                  article._id || article.id
                                )
                              }
                              className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                              aria-label={`Delete article: ${article.title}`}
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Article Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between rounded-t-xl">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingArticle ? "Edit Article" : "Add New Article"}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingArticle(null);
                }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close form"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-6">
              <ArticleForm
                article={editingArticle}
                onSubmit={
                  editingArticle ? handleUpdateArticle : handleAddArticle
                }
                categories={categories.filter(cat => cat.id !== 'all')}
                onCancel={() => {
                  setShowForm(false);
                  setEditingArticle(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDashboard;