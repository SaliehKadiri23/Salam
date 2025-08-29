import React, { useState } from 'react';
import { X, Send, User, Lock, Medal } from 'lucide-react';
import CategoryBadge from './CategoryBadge';

const DuaRequestForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    content: '',
    category: 'guidance',
    isAnonymous: false,
    author: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'health', label: 'Health' },
    { value: 'guidance', label: 'Guidance' },
    { value: 'success', label: 'Success' },
    { value: 'family', label: 'Family' },
    { value: 'community', label: 'Community' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.content.trim()) return;
    if (!formData.isAnonymous && !formData.author.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Create the request object (Dua Request)
      const newRequest = {
        id: Date.now().toString(),
        content: formData.content.trim(),
        category: formData.category,
        isAnonymous: formData.isAnonymous,
        author: formData.isAnonymous ? null : formData.author.trim(),
        timeAgo: 'Just now',
        likes: 0,
        comments: 0,
        prayerCount: 0,
        createdAt: new Date().toISOString()
      };

      await onSubmit(newRequest);
      
      // Reset form
      setFormData({
        content: '',
        category: 'guidance',
        isAnonymous: false,
        author: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting dua request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-950 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-emerald-600">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Share Your Dua Request
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-gray-400 dark:text-gray-100" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Content Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
              Your Request
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="Please share what you would like the community to pray for..."
              rows={5}
              className="w-full px-4 dark:bg-black/40 dark:text-gray-100 py-3 border dark:placeholder:text-gray-300 border-gray-200 dark:border-emerald-600 outline-none rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-100 mt-1">
              {formData.content.length}/500 characters
            </p>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleInputChange("category", category.value)}
                  className={`
                    px-2 py-2 rounded-xl border transition-all duration-200
                    ${
                      formData.category === category.value
                        ? "border-emerald-300 bg-emerald-50 dark:bg-gray-600  text-emerald-700"
                        : "border-gray-200 bg-white dark:bg-black/40  text-gray-600 hover:border-gray-300"
                    }
                  `}
                >
                  <CategoryBadge category={category.value} />
                </button>
              ))}
            </div>
          </div>

          {/* Anonymous Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/70 dark:border dark:border-emerald-600 rounded-xl">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-500" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  Post Anonymously
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your identity will be hidden
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                handleInputChange("isAnonymous", !formData.isAnonymous)
              }
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full outline-none transition-colors focus:outline-none focus:ring-2 dark:focus:border-none  focus:ring-emerald-500 focus:ring-offset-2
                ${
                  formData.isAnonymous
                    ? "bg-emerald-600 outline-none border-none ring-0"
                    : "bg-gray-200 dark:bg-black/40 dark:border dark:border-emerald-600"
                }
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${formData.isAnonymous ? "translate-x-6" : "translate-x-1"}
                `}
              />
            </button>
          </div>

          {/* Author Name (if not anonymous) */}
          {!formData.isAnonymous && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                Your Name
              </label>
              <div className="relative">
                <Medal className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-200" />
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 dark:text-gray-100 dark:bg-black/40 dark:placeholder:text-gray-300 py-3 border border-gray-200 dark:border-emerald-600 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required={!formData.isAnonymous}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 dark:border-emerald-600 text-gray-700 dark:text-gray-100 dark:hover:text-gray-900 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.content.trim() ||
                (!formData.isAnonymous && !formData.author.trim())
              }
              className={`
                flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2
                ${
                  isSubmitting ||
                  !formData.content.trim() ||
                  (!formData.isAnonymous && !formData.author.trim())
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-emerald-600 hover:to-green-700 hover:shadow-lg transform hover:scale-105"
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DuaRequestForm;