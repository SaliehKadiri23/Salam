import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Users, Clock, FileText, RefreshCw, Star } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useGetNewsletterSubscribersQuery } from "../services/apiSlice";
import { setSelectedLanguage } from "../redux/userSlice";
import "react-toastify/dist/ReactToastify.css";

const NewsletterSubscribersDashboard = () => {
  const dispatch = useDispatch();
  const { selectedLanguage } = useSelector((state) => state.user);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Get subscribers data
  const { 
    data: subscribersData, 
    error, 
    isLoading,
    refetch
  } = useGetNewsletterSubscribersQuery();
  
  // Handle refresh with toast notifications
  const handleRefresh = async () => {
    if (isRefreshing) return; // Prevent multiple clicks
    
    setIsRefreshing(true);
    
    // Show progress toast
    const progressToast = toast.loading("Refreshing subscribers data...");
    
    try {
      // Simulate a 1500ms delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Refetch the data
      await refetch();
      
      // Update toast to success
      toast.update(progressToast, {
        render: "Subscribers data refreshed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    } catch (err) {
      // Update toast to error
      toast.update(progressToast, {
        render: "Failed to refresh subscribers data. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate statistics
  const totalSubscribers = subscribersData?.data?.length || 0;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
       
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage and view all newsletter subscribers
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Refresh button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || isLoading}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-lg transition-colors flex items-center"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                <Star className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Subscribers</p>
                <p className="text-2xl font-bold dark:text-white">
                  {isLoading ? 'Loading...' : totalSubscribers}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</p>
                <p className="text-lg font-bold dark:text-white">
                  {isLoading ? 'Loading...' : new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Data Source</p>
                <p className="text-lg font-bold dark:text-white">Newsletter DB</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subscribers Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Subscriber List</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Showing {totalSubscribers} subscriber{totalSubscribers !== 1 ? 's' : ''}
            </p>
          </div>
          
          {isLoading && !isRefreshing ? (
            <div className="py-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading subscribers...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <div className="mx-auto h-12 w-12 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Error loading subscribers</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {error.message || "An error occurred while fetching subscriber data."}
              </p>
              <div className="mt-6">
                <button
                  onClick={handleRefresh}
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
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Subscription Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {subscribersData?.data?.map((subscriber, index) => (
                    <tr key={subscriber._id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{subscriber.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {formatDate(subscriber.subscribedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {totalSubscribers === 0 && (
                <div className="py-12 text-center">
                  <Star className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No subscribers</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    No one has subscribed to your newsletter yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Newsletter Subscribers Dashboard • Updated in real-time</p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscribersDashboard;