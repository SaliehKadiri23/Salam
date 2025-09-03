import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Book,
  Video,
  Headphones,
  FileText,
  ChevronDown
} from 'lucide-react';
import {
  useGetResourcesQuery,
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation
} from '../redux/resourcesSlice';
import ResourceForm from '../components/resources/ResourceForm';

const CustomSelect = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.id === value) || options.find((option) => option.value === value);

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors flex items-center justify-between shadow-sm hover:shadow-md"
      >
        <span className="flex items-center space-x-2 dark:text-white">
          {selectedOption?.icon && (
            <selectedOption.icon className="w-4 h-4 text-gray-500 dark:text-gray-300" />
          )}
          <span>{selectedOption?.name || selectedOption?.label || value}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 dark:text-gray-300 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full min-w-[170px] mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.id || option.value}
              onClick={() => {
                onChange(option.id || option.value);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center space-x-2 dark:text-white"
            >
              {option.icon && <option.icon className="w-4 h-4" />}
              <span>{option.name || option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ResourceDashboard = () => {
  const { data: resourcesData, isLoading, isError, error, refetch } = useGetResourcesQuery();
  const resources = resourcesData?.data || [];
  
  const [createResource] = useCreateResourceMutation();
  const [updateResource] = useUpdateResourceMutation();
  const [deleteResource] = useDeleteResourceMutation();
  
  const categories = useSelector((state) => state.resources.categories);
  const resourceTypes = useSelector((state) => state.resources.resourceTypes);
  
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort resources
  const filteredResources = resources
    .filter(resource => {
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' || resource.category === selectedCategory;
      
      const matchesType = 
        selectedType === 'all' || resource.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.publishedDate) - new Date(a.publishedDate);
      } else if (sortBy === 'oldest') {
        return new Date(a.publishedDate) - new Date(b.publishedDate);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const handleAddResource = async (newResource) => {
    try {
      await createResource(newResource).unwrap();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create resource:', error);
      // TODO: Show error notification to user
    }
  };

  const handleUpdateResource = async (updatedResource) => {
    try {
      await updateResource(updatedResource).unwrap();
      setShowForm(false);
      setEditingResource(null);
    } catch (error) {
      console.error('Failed to update resource:', error);
      // TODO: Show error notification to user
    }
  };

  const handleDeleteResource = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await deleteResource(id).unwrap();
      } catch (error) {
        console.error('Failed to delete resource:', error);
        // TODO: Show error notification to user
      }
    }
  };

  const handleEditResource = (resource) => {
    setEditingResource(resource);
    setShowForm(true);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'podcast': return Headphones;
      case 'course': return Book;
      default: return FileText;
    }
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {error?.data?.message || "An error occurred while loading resources."}
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
            Resource Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage all Islamic learning resources
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Book className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Resources</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{resources.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Video className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Videos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {resources.filter(r => r.type === 'video').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Headphones className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Podcasts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {resources.filter(r => r.type === 'podcast').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Articles</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {resources.filter(r => r.type === 'article').length}
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:gap-3 w-full">
                {/* Category Dropdown */}
                <div className="min-w-[120px] mb-2 sm:mb-0 sm:mr-2">
                  <CustomSelect
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    options={categories}
                  />
                </div>
                
                {/* Type Dropdown */}
                <div className="min-w-[120px] mb-2 sm:mb-0 sm:mr-2">
                  <CustomSelect
                    value={selectedType}
                    onChange={setSelectedType}
                    options={resourceTypes}
                  />
                </div>
                
                {/* Sort Dropdown */}
                <div className="min-w-[120px] mb-2 sm:mb-0 sm:mr-2">
                  <CustomSelect
                    value={sortBy}
                    onChange={setSortBy}
                    options={[
                      { id: 'newest', name: 'Newest' },
                      { id: 'oldest', name: 'Oldest' },
                      { id: 'title', name: 'Title' }
                    ]}
                  />
                </div>
                
                {/* Add Resource Button */}
                <button
                  onClick={() => {
                    setEditingResource(null);
                    setShowForm(true);
                  }}
                  className="flex items-center sm:mt-3 md:mt-0 justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Resource</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resource List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredResources.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      No resources found. {searchQuery || selectedCategory !== 'all' || selectedType !== 'all' ? 'Try changing your filters.' : 'Add your first resource!'}
                    </td>
                  </tr>
                ) : (
                  filteredResources.map((resource) => {
                    const TypeIcon = getTypeIcon(resource.type);
                    return (
                      <tr key={resource.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center">
                              <TypeIcon className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {resource.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                {resource.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white capitalize">
                            {resource.category}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white capitalize">
                            {resource.type}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {resource.author}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(resource.publishedDate)}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => handleEditResource(resource)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteResource(resource.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
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

      {/* Resource Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between rounded-t-xl">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingResource ? 'Edit Resource' : 'Add New Resource'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingResource(null);
                }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <ResourceForm 
                resource={editingResource}
                onSubmit={editingResource ? handleUpdateResource : handleAddResource}
                categories={categories} 
                resourceTypes={resourceTypes} 
                onCancel={() => {
                  setShowForm(false);
                  setEditingResource(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceDashboard;