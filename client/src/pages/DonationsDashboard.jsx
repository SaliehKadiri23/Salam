import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Filter,
  ChevronDown,
  X,
  Calendar,
  CreditCard,
  User,
  Star,
  Stars
} from 'lucide-react';
import {
  useGetDonationsQuery,
  useCreateDonationMutation,
  useUpdateDonationMutation,
  useDeleteDonationMutation
} from '../services/apiSlice';

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

const DonationForm = ({ donation, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    donorName: donation?.donorName || '',
    donorEmail: donation?.donorEmail || '',
    donationType: donation?.donationType || 'General Donation',
    amount: donation?.amount || '',
    currency: donation?.currency || 'USD',
    frequency: donation?.frequency || 'One-time',
    paymentMethod: donation?.paymentMethod || 'Credit Card',
    status: donation?.status || 'Completed',
    notes: donation?.notes || '',
    isAnonymous: donation?.isAnonymous || false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      _id: donation?._id
    });
  };

  const donationTypes = [
    { id: 'Zakat', name: 'Zakat' },
    { id: 'Sadaqah', name: 'Sadaqah' },
    { id: 'Fitrana', name: 'Fitrana' },
    { id: 'General Donation', name: 'General Donation' },
    { id: 'Project Support', name: 'Project Support' },
    { id: 'Orphan Sponsorship', name: 'Orphan Sponsorship' },
    { id: 'Other', name: 'Other' }
  ];

  const paymentMethods = [
    { id: 'Credit Card', name: 'Credit Card' },
    { id: 'Bank Transfer', name: 'Bank Transfer' },
    { id: 'PayPal', name: 'PayPal' },
    { id: 'Crypto', name: 'Crypto' },
    { id: 'Other', name: 'Other' }
  ];

  const frequencies = [
    { id: 'One-time', name: 'One-time' },
    { id: 'Monthly', name: 'Monthly' },
    { id: 'Quarterly', name: 'Quarterly' },
    { id: 'Yearly', name: 'Yearly' }
  ];

  const statuses = [
    { id: 'Pending', name: 'Pending' },
    { id: 'Completed', name: 'Completed' },
    { id: 'Failed', name: 'Failed' },
    { id: 'Refunded', name: 'Refunded' }
  ];

  const currencies = [
    { id: 'USD', name: 'USD' },
    { id: 'EUR', name: 'EUR' },
    { id: 'GBP', name: 'GBP' },
    { id: 'CAD', name: 'CAD' },
    { id: 'AUD', name: 'AUD' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Donor Name
          </label>
          <div className="relative">
            <Stars className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Donor Email
          </label>
          <input
            type="email"
            name="donorEmail"
            value={formData.donorEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Donation Type
          </label>
          <CustomSelect
            value={formData.donationType}
            onChange={(value) => setFormData(prev => ({ ...prev, donationType: value }))}
            options={donationTypes}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Currency
          </label>
          <CustomSelect
            value={formData.currency}
            onChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
            options={currencies}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Frequency
          </label>
          <CustomSelect
            value={formData.frequency}
            onChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}
            options={frequencies}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Payment Method
          </label>
          <CustomSelect
            value={formData.paymentMethod}
            onChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
            options={paymentMethods}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <CustomSelect
            value={formData.status}
            onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
            options={statuses}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isAnonymous"
          id="isAnonymous"
          checked={formData.isAnonymous}
          onChange={handleChange}
          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
        />
        <label htmlFor="isAnonymous" className="ml-2 block text-sm text-gray-900 dark:text-white">
          Anonymous Donation
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {donation ? 'Update Donation' : 'Create Donation'}
        </button>
      </div>
    </form>
  );
};

const DonationsDashboard = () => {
  const { data: donationsData, isLoading, isError, error, refetch } = useGetDonationsQuery();
  const donations = donationsData?.data || [];
  
  const [createDonation] = useCreateDonationMutation();
  const [updateDonation] = useUpdateDonationMutation();
  const [deleteDonation] = useDeleteDonationMutation();
  
  const [showForm, setShowForm] = useState(false);
  const [editingDonation, setEditingDonation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort donations
  const filteredDonations = donations
    .filter(donation => {
      const matchesSearch = 
        donation.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.donorEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.notes?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = 
        selectedType === 'all' || donation.donationType === selectedType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.donationDate) - new Date(a.donationDate);
      } else if (sortBy === 'oldest') {
        return new Date(a.donationDate) - new Date(b.donationDate);
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
      } else if (sortBy === 'donor') {
        return a.donorName.localeCompare(b.donorName);
      }
      return 0;
    });

  const handleAddDonation = async (newDonation) => {
    try {
      await createDonation(newDonation).unwrap();
      setShowForm(false);
      toast.success('Donation created successfully!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Failed to create donation:', error);
      let errorMessage = 'Failed to create donation. ';
      
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

  const handleUpdateDonation = async (updatedDonation) => {
    try {
      await updateDonation(updatedDonation).unwrap();
      setShowForm(false);
      setEditingDonation(null);
      toast.success('Donation updated successfully!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Failed to update donation:', error);
      let errorMessage = 'Failed to update donation. ';
      
      if (error?.data?.message) {
        errorMessage += error.data.message;
      } else if (error?.status === 'FETCH_ERROR') {
        errorMessage += 'Network error. Please check your connection.';
      } else if (error?.status === 400) {
        errorMessage += 'Invalid data provided. Please check the form fields.';
      } else if (error?.status === 404) {
        errorMessage += 'Donation not found. It may have been deleted.';
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

  const handleDeleteDonation = async (_id) => {
    if (window.confirm('Are you sure you want to delete this donation? This action cannot be undone.')) {
      try {
        await deleteDonation(_id).unwrap();
        toast.success('Donation deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        console.error('Failed to delete donation:', error);
        let errorMessage = 'Failed to delete donation. ';
        
        if (error?.data?.message) {
          errorMessage += error.data.message;
        } else if (error?.status === 'FETCH_ERROR') {
          errorMessage += 'Network error. Please check your connection.';
        } else if (error?.status === 404) {
          errorMessage += 'Donation not found. It may have already been deleted.';
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

  const handleEditDonation = (donation) => {
    setEditingDonation(donation);
    setShowForm(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount);
  };

  const donationTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'Zakat', name: 'Zakat' },
    { id: 'Sadaqah', name: 'Sadaqah' },
    { id: 'Fitrana', name: 'Fitrana' },
    { id: 'General Donation', name: 'General Donation' },
    { id: 'Project Support', name: 'Project Support' },
    { id: 'Orphan Sponsorship', name: 'Orphan Sponsorship' },
    { id: 'Other', name: 'Other' }
  ];

  // Calculate stats
  const totalDonations = donations.length;
  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const zakatDonations = donations.filter(d => d.donationType === 'Zakat').length;
  const sadaqahDonations = donations.filter(d => d.donationType === 'Sadaqah').length;

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
    toast.error(`Error loading donations: ${error?.data?.message || 'Unknown error'}`, {
      position: "bottom-right",
      autoClose: 5000,
    });
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Donations
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {error?.data?.message || "An error occurred while loading donations."}
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
            Donations Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage all donations and contributions
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Donations
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalDonations}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalAmount, 'USD')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Filter className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Zakat
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {zakatDonations}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Filter className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Sadaqah
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sadaqahDonations}
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
                  placeholder="Search donations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
                  aria-label="Search donations"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:gap-3 w-full">
                {/* Type Dropdown */}
                <div className="min-w-[120px] mb-2 sm:mb-0 mr-2">
                  <CustomSelect
                    label="Type"
                    value={selectedType}
                    onChange={setSelectedType}
                    options={donationTypes}
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
                      { id: "amount", name: "Amount" },
                      { id: "donor", name: "Donor" },
                    ]}
                  />
                </div>

                {/* Add Donation Button */}
                <button
                  onClick={() => {
                    setEditingDonation(null);
                    setShowForm(true);
                  }}
                  className="flex items-center sm:mt-3 md:mt-0 justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-label="Add new donation"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span className="sm:inline">Add Donation</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Donations List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Donor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Payment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Status
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
                {filteredDonations.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No donations found.{" "}
                      {searchQuery ||
                      selectedType !== "all"
                        ? "Try changing your filters."
                        : "Add your first donation!"}
                    </td>
                  </tr>
                ) : (
                  filteredDonations.map((donation) => {
                    return (
                      <tr
                        key={donation._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center">
                              <User
                                className="h-5 w-5 text-emerald-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {donation.isAnonymous ? 'Anonymous' : donation.donorName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {donation.donorEmail}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {donation.donationType}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatCurrency(donation.amount, donation.currency)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {donation.frequency}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(donation.donationDate)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {donation.paymentMethod}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            donation.status === 'Completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400' 
                              : donation.status === 'Pending' 
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-400' 
                                : donation.status === 'Failed' 
                                  ? 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400' 
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400'
                          }`}>
                            {donation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleEditDonation(donation)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                              aria-label={`Edit donation: ${donation.donorName}`}
                            >
                              <Edit className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteDonation(donation._id)
                              }
                              className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                              aria-label={`Delete donation: ${donation.donorName}`}
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

      {/* Donation Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between rounded-t-xl">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingDonation ? "Edit Donation" : "Add New Donation"}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingDonation(null);
                }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close form"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-6">
              <DonationForm
                donation={editingDonation}
                onSubmit={
                  editingDonation ? handleUpdateDonation : handleAddDonation
                }
                onCancel={() => {
                  setShowForm(false);
                  setEditingDonation(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationsDashboard;