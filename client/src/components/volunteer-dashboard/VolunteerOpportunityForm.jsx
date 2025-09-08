import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import CustomSelect from './CustomSelect';

const VolunteerOpportunityForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    category: 'Mosque Events',
    title: '',
    organization: '',
    description: '',
    location: '',
    timeCommitment: '4-8 hours/week',
    skillLevel: 'Beginner',
    skills: [''],
    urgency: 'medium',
    spotsAvailable: 5,
    image: '',
    remote: false
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        skills: initialData.skills && initialData.skills.length > 0 
          ? [...initialData.skills] 
          : ['']
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSkillsChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkillField = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkillField = (index) => {
    if (formData.skills.length > 1) {
      const newSkills = [...formData.skills];
      newSkills.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        skills: newSkills
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (formData.spotsAvailable < 1 || formData.spotsAvailable > 100) {
      newErrors.spotsAvailable = 'Spots available must be between 1 and 100';
    }
    
    // Check if at least one skill is filled
    const hasValidSkill = formData.skills.some(skill => skill.trim() !== '');
    if (!hasValidSkill) {
      newErrors.skills = 'At least one skill is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Remove empty skills
      const filteredSkills = formData.skills.filter(skill => skill.trim() !== '');
      
      const submissionData = {
        ...formData,
        skills: filteredSkills
      };
      
      // If editing, include the _id
      if (initialData && initialData._id) {
        submissionData._id = initialData._id;
      }
      
      onSubmit(submissionData);
    }
  };

  const categoryOptions = [
    'Mosque Events',
    'Educational Programs',
    'Community Outreach',
    'Other'
  ];

  const timeCommitmentOptions = [
    '4-8 hours/week',
    '5-8 hours/week',
    '6-10 hours/week',
    '8-12 hours/week',
    '10-15 hours/week',
    '12-20 hours/week',
    'Flexible'
  ];

  const skillLevelOptions = [
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low', color: 'bg-emerald-100 text-emerald-800' },
    { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-800' },
    { value: 'high', label: 'High', color: 'bg-rose-100 text-rose-800' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <CustomSelect
            label="Category *"
            value={formData.category}
            onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            options={categoryOptions}
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white`}
            placeholder="e.g., Event Coordinator"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Organization */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Organization *
          </label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.organization ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white`}
            placeholder="e.g., Islamic Center of Al-Madinah"
          />
          {errors.organization && <p className="mt-1 text-sm text-red-600">{errors.organization}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white`}
            placeholder="e.g., Al-Madinah"
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        {/* Time Commitment */}
        <div>
          <CustomSelect
            label="Time Commitment *"
            value={formData.timeCommitment}
            onChange={(value) => setFormData(prev => ({ ...prev, timeCommitment: value }))}
            options={timeCommitmentOptions}
          />
        </div>

        {/* Skill Level */}
        <div>
          <CustomSelect
            label="Skill Level *"
            value={formData.skillLevel}
            onChange={(value) => setFormData(prev => ({ ...prev, skillLevel: value }))}
            options={skillLevelOptions}
          />
        </div>

        {/* Spots Available */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Spots Available *
          </label>
          <input
            type="number"
            name="spotsAvailable"
            value={formData.spotsAvailable}
            onChange={handleChange}
            min="1"
            max="100"
            className={`w-full px-3 py-2 border ${
              errors.spotsAvailable ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white`}
          />
          {errors.spotsAvailable && <p className="mt-1 text-sm text-red-600">{errors.spotsAvailable}</p>}
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Urgency *
          </label>
          <div className="flex space-x-4">
            {urgencyOptions.map(option => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="urgency"
                  value={option.value}
                  checked={formData.urgency === option.value}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Remote */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="remote"
          checked={formData.remote}
          onChange={handleChange}
          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          This is a remote opportunity
        </label>
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Image URL
        </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`w-full px-3 py-2 border ${
            errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white`}
          placeholder="Describe the volunteer opportunity in detail..."
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Required Skills *
        </label>
        {formData.skills.map((skill, index) => (
          <div key={index} className="flex items-center mt-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleSkillsChange(index, e.target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Event Planning"
            />
            {formData.skills.length > 1 && (
              <button
                type="button"
                onClick={() => removeSkillField(index)}
                className="ml-2 p-2 text-red-600 hover:text-red-800"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addSkillField}
          className="mt-2 text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 text-sm font-medium"
        >
          + Add another skill
        </button>
        {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills}</p>}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          {initialData ? 'Update Opportunity' : 'Create Opportunity'}
        </button>
      </div>
    </form>
  );
};

export default VolunteerOpportunityForm;