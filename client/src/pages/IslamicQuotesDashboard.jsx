import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  StarOff, 
  RefreshCw,
  CheckCircle,
  XCircle,
  X,
  ChevronDown,
  Search
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import {
  useGetIslamicQuotesQuery,
  useAddIslamicQuoteMutation,
  useUpdateIslamicQuoteMutation,
  useDeleteIslamicQuoteMutation
} from "../services/apiSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

// Custom Select Component
const CustomSelect = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((option) => 
    option.id === value || option.name === value
  ) || options[0];

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && selectRef.current && dropdownRef.current) {
      const selectRect = selectRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.scrollHeight;
      const spaceBelow = window.innerHeight - selectRect.bottom;
      
      // If there's not enough space below, position above
      if (spaceBelow < dropdownHeight + 10) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={selectRef} className="custom-select-container relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors flex items-center justify-between"
      >
        <span className="dark:text-gray-100">{selectedOption?.name || selectedOption?.id || "Select..."}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 dark:text-gray-100 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div 
          ref={dropdownRef}
          className={`absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto ${
            dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
          }`}
        >
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-emerald-600 hover:text-emerald-600 transition-colors"
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const IslamicQuotesDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingQuote, setEditingQuote] = useState(null);
  const [newQuote, setNewQuote] = useState({
    text: "",
    reference: "",
    category: "General"
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get quotes data
  const { 
    data: quotesData, 
    error, 
    isLoading,
    refetch
  } = useGetIslamicQuotesQuery();
  
  // RTK Query mutations
  const [addIslamicQuote] = useAddIslamicQuoteMutation();
  const [updateIslamicQuote] = useUpdateIslamicQuoteMutation();
  const [deleteIslamicQuote] = useDeleteIslamicQuoteMutation();
  
  // Categories for quotes
  const categories = [
    { id: "quran", name: "Quran", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300" },
    { id: "hadith", name: "Hadith", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300" },
    { id: "companions", name: "Companions", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300" },
    { id: "scholars", name: "Scholars", color: "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300" },
    { id: "general", name: "General", color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300" }
  ];
  
  // Validation schema
  const validationSchema = Yup.object({
    text: Yup.string()
      .trim()
      .required("Quote text is required")
      .min(10, "Quote text must be at least 10 characters long"),
    reference: Yup.string()
      .trim()
      .required("Reference is required")
      .min(3, "Reference must be at least 3 characters long"),
    category: Yup.string()
      .oneOf(categories.map(cat => cat.id), "Please select a valid category")
      .required("Category is required")
  });
  
  // Open modal for adding a new quote
  const openAddModal = () => {
    setModalMode('add');
    setNewQuote({
      text: "",
      reference: "",
      category: "general" // Use the ID instead of the name
    });
    setIsModalOpen(true);
  };
  
  // Open modal for editing a quote
  const openEditModal = (quote) => {
    setModalMode('edit');
    setEditingQuote(quote);
    // Find the category ID based on the category name
    const categoryObj = categories.find(cat => cat.name === quote.category);
    setNewQuote({
      text: quote.text,
      reference: quote.reference,
      category: categoryObj ? categoryObj.id : "general"
    });
    setIsModalOpen(true);
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingQuote(null);
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuote({
      ...newQuote,
      [name]: value
    });
  };
  
  // Handle form submission for adding a new quote
  const handleAddQuote = async (values, { setSubmitting, resetForm }) => {
    // Find the category name based on the ID
    const categoryObj = categories.find(cat => cat.id === values.category);
    const quoteToAdd = {
      ...values,
      category: categoryObj ? categoryObj.name : "General"
    };
    
    try {
      await addIslamicQuote(quoteToAdd).unwrap();
      toast.success("Quote added successfully!");
      closeModal();
      refetch();
      resetForm();
    } catch (err) {
      toast.error("Failed to add quote. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  // Handle form submission for updating a quote
  const handleUpdateQuote = async (values, { setSubmitting }) => {
    // Find the category name based on the ID
    const categoryObj = categories.find(cat => cat.id === values.category);
    const quoteToUpdate = {
      ...values,
      category: categoryObj ? categoryObj.name : "General"
    };
    
    try {
      await updateIslamicQuote({
        id: editingQuote._id,
        ...quoteToUpdate,
        isQuoteOfTheDay: editingQuote.isQuoteOfTheDay
      }).unwrap();
      toast.success("Quote updated successfully!");
      closeModal();
      refetch();
    } catch (err) {
      toast.error("Failed to update quote. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  // Handle deleting a quote
  const handleDeleteQuote = async (id) => {
    if (window.confirm("Are you sure you want to delete this quote?")) {
      try {
        await deleteIslamicQuote(id).unwrap();
        toast.success("Quote deleted successfully!");
        refetch();
      } catch (err) {
        toast.error("Failed to delete quote. Please try again.");
      }
    }
  };
  
  // Handle refresh with toast notifications
  const handleRefresh = async () => {
    if (isRefreshing) return; // Prevent multiple clicks
    
    setIsRefreshing(true);
    
    // Show progress toast
    const progressToast = toast.loading("Refreshing quotes...");
    
    try {
      // Simulate a 1500ms delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Refetch the data
      await refetch();
      
      // Update toast to success and auto-close
      toast.update(progressToast, {
        render: "Quotes refreshed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    } catch (err) {
      // Update toast to error and auto-close
      toast.update(progressToast, {
        render: "Failed to refresh quotes. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    } finally {
      // Ensure the refreshing state is reset after a short delay
      // to allow the success message to be visible
      setTimeout(() => {
        setIsRefreshing(false);
      }, 3000);
    }
  };
  
  // Handle setting a quote as Quote of the Day
  const handleSetQuoteOfTheDay = async (quote) => {
    try {
      // First unset any existing Quote of the Day
      // Then set this quote as Quote of the Day
      await updateIslamicQuote({
        id: quote._id,
        ...quote,
        isQuoteOfTheDay: true
      }).unwrap();
      
      toast.success("Quote of the Day updated successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to set Quote of the Day. Please try again.");
    }
  };
  const handleUnsetQuoteOfTheDay = async (quote) => {
    try {
      await updateIslamicQuote({
        id: quote._id,
        ...quote,
        isQuoteOfTheDay: false
      }).unwrap();
      
      toast.success("Quote of the Day unset successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to unset Quote of the Day. Please try again.");
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Find category details for display
  const getCategoryDetails = (categoryName) => {
    return categories.find(cat => cat.name === categoryName) || categories[4]; // Default to General
  };
  
  // Filter quotes based on search term and selected category
  const filteredQuotes = quotesData?.data?.filter(quote => {
    // Filter by search term
    const matchesSearch = searchTerm === "" || 
      quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = 
      selectedCategory === "all" || 
      selectedCategory === "" ||
      quote.category === (categories.find(cat => cat.id === selectedCategory)?.name || selectedCategory);
    
    return matchesSearch && matchesCategory;
  }) || [];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Islamic Quotes Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage Islamic quotes and set the Quote of the Day
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-lg transition-colors flex items-center"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Quote
            </button>
          </div>
        </div>
        
        {/* Modal for Add/Edit Quote */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {modalMode === 'add' ? 'Add New Islamic Quote' : 'Edit Islamic Quote'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <Formik
                  initialValues={{
                    text: newQuote.text,
                    reference: newQuote.reference,
                    category: newQuote.category
                  }}
                  validationSchema={validationSchema}
                  onSubmit={modalMode === 'add' ? handleAddQuote : handleUpdateQuote}
                  enableReinitialize={true}
                >
                  {({ isSubmitting, values, setFieldValue, errors, touched }) => (
                    <Form>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Quote Text *
                          </label>
                          <Field
                            as="textarea"
                            name="text"
                            rows={4}
                            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                              errors.text && touched.text
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                            placeholder="Enter the Islamic quote..."
                          />
                          <ErrorMessage
                            name="text"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Reference *
                          </label>
                          <Field
                            type="text"
                            name="reference"
                            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                              errors.reference && touched.reference
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                            placeholder="e.g., Quran 2:255"
                          />
                          <ErrorMessage
                            name="reference"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Category
                          </label>
                          <CustomSelect
                            label=""
                            value={values.category}
                            onChange={(value) => setFieldValue("category", value)}
                            options={categories}
                          />
                          <ErrorMessage
                            name="category"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        
                        {modalMode === 'edit' && (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="isQuoteOfTheDay"
                              name="isQuoteOfTheDay"
                              checked={editingQuote?.isQuoteOfTheDay || false}
                              onChange={(e) => setEditingQuote({
                                ...editingQuote,
                                isQuoteOfTheDay: e.target.checked
                              })}
                              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isQuoteOfTheDay" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              Set as Quote of the Day
                            </label>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-end space-x-3 mt-6">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                          {isSubmitting 
                            ? (modalMode === 'add' ? 'Adding...' : 'Updating...') 
                            : (modalMode === 'add' ? 'Add Quote' : 'Update Quote')}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        )}
        
        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search Quotes
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by quote text, reference..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <CustomSelect
                label="Filter by Category"
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={[{ id: "all", name: "All Categories" }, ...categories]}
              />
            </div>
          </div>
        </div>
        
        {/* Quotes Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Islamic Quotes</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Manage all Islamic quotes and set the Quote of the Day
            </p>
          </div>
          
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading quotes...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <div className="mx-auto h-12 w-12 text-red-500">
                <XCircle className="h-12 w-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Error loading quotes</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {error.message || "An error occurred while fetching quote data."}
              </p>
              <div className="mt-6">
                <button
                  onClick={refetch}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center mx-auto"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Quote
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Reference
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date Added
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Quote of the Day
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredQuotes.map((quote, index) => {
                    const categoryDetails = getCategoryDetails(quote.category);
                    return (
                      <tr key={quote._id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}>
                        <td className="px-6 py-4 whitespace-normal max-w-xs">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            "{quote.text}"
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {quote.reference}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${categoryDetails.color}`}>
                            {quote.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {formatDate(quote.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {quote.isQuoteOfTheDay ? (
                            <div className="flex items-center">
                              <Star className="h-5 w-5 text-amber-500 mr-1" />
                              <span className="text-amber-500 font-medium">Yes</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <StarOff className="h-5 w-5 text-gray-400 mr-1" />
                              <span className="text-gray-400">No</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            {!quote.isQuoteOfTheDay ? (
                              <button
                                onClick={() => handleSetQuoteOfTheDay(quote)}
                                className="text-amber-600 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-300"
                                title="Set as Quote of the Day"
                              >
                                <Star className="h-5 w-5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUnsetQuoteOfTheDay(quote)}
                                className="text-amber-600 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-300"
                                title="Unset as Quote of the Day"
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                            )}
                            
                            <button
                              onClick={() => openEditModal(quote)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              title="Edit"
                            >
                              <Edit3 className="h-5 w-5" />
                            </button>
                            
                            <button
                              onClick={() => handleDeleteQuote(quote._id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {filteredQuotes.length === 0 && (
                <div className="py-12 text-center">
                  <Star className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    {searchTerm || selectedCategory !== "all" 
                      ? "No quotes match your search criteria" 
                      : "No quotes found"}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {searchTerm || selectedCategory !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "Get started by adding a new Islamic quote."}
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={openAddModal}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
                    >
                      <Plus className="-ml-1 mr-2 h-5 w-5" />
                      Add Quote
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Islamic Quotes Management Dashboard • Showing {filteredQuotes.length} of {quotesData?.data?.length || 0} quotes</p>
        </div>
      </div>
    </div>
  );
};

export default IslamicQuotesDashboard;