import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { ChevronDown, Upload, X } from 'lucide-react';

const ImageUpload = ({ onImageUpload, existingImage }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(existingImage || null);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, JPG, PNG, GIF, WEBP)');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size exceeds 5MB limit');
      return false;
    }

    setError('');
    return true;
  };

  const processFile = (file) => {
    if (!validateFile(file)) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      // Pass the file to the parent component
      onImageUpload(file);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUpload(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Featured Image
      </label>
      
      {preview ? (
        <div className="relative group">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="mt-2">
            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <Upload className="w-4 h-4 mr-2" />
              Change Image
              <input
                type="file"
                className="sr-only"
                onChange={handleChange}
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              />
            </label>
          </div>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragActive 
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          />
          <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-emerald-600 dark:text-emerald-400">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            PNG, JPG, GIF, WEBP up to 5MB
          </p>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

const ContentEditor = ({ section, index, onChange, onMediaUpload, onRemoveMedia, onRemove }) => {
  const [wordCount, setWordCount] = useState(section.content.split(/\s+/).filter(word => word).length);
  const textareaRef = useRef(null);

  const handleContentChange = (e) => {
    const content = e.target.value;
    const words = content.split(/\s+/).filter(word => word).length;
    setWordCount(words);
    onChange(index, 'content', content);
  };

  const handleMediaFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      onMediaUpload(index, e.target.files[0]);
    }
  };

  // Formatting functions
  const insertFormatting = (format) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'heading':
        formattedText = `## ${selectedText}`;
        break;
      case 'list':
        formattedText = `- ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      default:
        formattedText = selectedText;
    }

    const newText = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    onChange(index, 'content', newText);
    
    // Focus back to textarea and set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4 bg-white dark:bg-gray-700">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Section {index + 1}</h3>
        {index > 0 && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Section Title
        </label>
        <input
          type="text"
          value={section.title}
          onChange={(e) => onChange(index, 'title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
          placeholder="Enter section title"
        />
      </div>
      
      <div className="mb-2">
        <div className="flex flex-wrap gap-1 p-2 bg-gray-50 dark:bg-gray-600 rounded-t-lg border border-gray-200 dark:border-gray-600 border-b-0">
          <button
            type="button"
            onClick={() => insertFormatting('bold')}
            className="px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('italic')}
            className="px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('heading')}
            className="px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            title="Heading"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('list')}
            className="px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            title="Bullet List"
          >
            ●
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('link')}
            className="px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            title="Link"
          >
            ↗
          </button>
        </div>
        <textarea
          ref={textareaRef}
          value={section.content}
          onChange={handleContentChange}
          rows={12}
          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-b-lg rounded-t-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
          placeholder="Write your content here... Use Markdown formatting for rich text."
        />
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
          <span>{wordCount} words</span>
          <span>Markdown supported</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Media
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {section.media.map((media, mediaIndex) => (
            <div key={media.id} className="relative group">
              {media.type === 'image' ? (
                <img 
                  src={media.url} 
                  alt={media.alt} 
                  className="w-16 h-16 object-cover rounded border border-gray-200 dark:border-gray-600"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded border border-gray-200 dark:border-gray-600">
                  <span className="text-xs text-gray-500 dark:text-gray-300">{media.type}</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => onRemoveMedia(index, mediaIndex)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
          <Upload className="w-4 h-4 mr-2" />
          Add Media
          <input
            type="file"
            className="sr-only"
            onChange={handleMediaFile}
            accept="image/*,video/*,audio/*"
          />
        </label>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Supported formats: JPG, PNG, GIF, MP4, MP3
        </p>
      </div>
    </div>
  );
};

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
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors flex items-center justify-between shadow-sm hover:shadow-md"
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
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.id || option.value}
              type="button"
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

const UsefulResource = ({ resource, index, onChange, onRemove }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  // Initialize preview if there's an existing file
  useEffect(() => {
    if (resource.file && resource.file.name) {
      setPreview(URL.createObjectURL(resource.file));
    } else if (resource.url) {
      setPreview(null);
    }
  }, [resource.file, resource.url]);

  const validateFile = (file) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid file (PDF, DOC, DOCX, TXT, JPG, PNG)');
      return false;
    }

    if (file.size > maxSize) {
      toast.error('File size exceeds 10MB limit');
      return false;
    }

    return true;
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onChange(index, 'file', file);
        onChange(index, 'url', ''); // Clear URL if file is uploaded
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleUrlChange = (value) => {
    onChange(index, 'url', value);
    onChange(index, 'file', null); // Clear file if URL is entered
    setPreview(null);
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onChange(index, 'file', file);
        onChange(index, 'url', ''); // Clear URL if file is uploaded
        setPreview(URL.createObjectURL(file));
      }
    }
  }, [index, onChange]);

  const removeFile = () => {
    onChange(index, 'file', null);
    setPreview(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
      <div className="md:col-span-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Resource Title
        </label>
        <input
          type="text"
          value={resource.title}
          onChange={(e) => onChange(index, 'title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
          placeholder="e.g., Related Article, Video, etc."
        />
      </div>
      
      <div className="md:col-span-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          URL or Upload File
        </label>
        {resource.file ? (
          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-600 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900 rounded mr-2">
                <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-sm truncate max-w-[150px]">{resource.file.name}</span>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <input
            type="url"
            value={resource.url}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
            placeholder="https://example.com/resource or upload a file"
          />
        )}
      </div>
      
      <div className="md:col-span-2 flex items-end">
        {index > 0 && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="w-full px-3 py-2 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          >
            Remove
          </button>
        )}
      </div>
      
      <div className="md:col-span-12">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description (Optional)
        </label>
        <textarea
          value={resource.description}
          onChange={(e) => onChange(index, 'description', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
          placeholder="Brief description of this resource"
        />
      </div>
      
      {!resource.url && !resource.file && (
        <div className="md:col-span-12">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Or Upload a File
          </label>
          <div
            className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
              dragActive 
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            <Upload className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-emerald-600 dark:text-emerald-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PDF, DOC, DOCX, TXT, JPG, PNG up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const ResourceForm = ({ resource, onSubmit, categories, resourceTypes, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    // Try to load draft from localStorage
    const savedDraft = localStorage.getItem('resourceDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        // Ensure usefulResources exists
        if (!parsedDraft.usefulResources) {
          parsedDraft.usefulResources = [{ id: Date.now(), title: '', url: '', description: '' }];
        }
        return parsedDraft;
      } catch (e) {
        console.error('Failed to parse saved draft', e);
      }
    }
    
    // Default form state
    return {
      title: '',
      description: '',
      category: 'quran',
      type: 'article',
      author: '',
      image: '',
      imageFile: null,
      tags: '',
      publishedDate: new Date().toISOString().split('T')[0],
      contentSections: [
        { 
          title: '', 
          content: '', 
          media: [],
          order: 1
        }
      ],
      usefulResources: [{ title: '', url: '', description: '', file: null }]
    };
  });
  const [lastSaved, setLastSaved] = useState(null);
  const autosaveTimer = useRef(null);

  // Autosave to localStorage
  useEffect(() => {
    // Clear existing timer
    if (autosaveTimer.current) {
      clearTimeout(autosaveTimer.current);
    }

    // Set new timer for autosave (3 seconds after last change)
    if (formData.title || formData.description) {
      autosaveTimer.current = setTimeout(() => {
        try {
          // Save to localStorage (excluding file objects which can't be serialized)
          const formDataToSave = {
            ...formData,
            imageFile: null, // File objects can't be serialized
            contentSections: formData.contentSections.map(section => {
              const savedSection = {
                ...section,
                // Media URLs from files can't be serialized, so we'll save just the metadata
                media: section.media.map(media => ({
                  type: media.type,
                  alt: media.alt,
                  // Note: URL will be lost on page refresh for file uploads
                }))
              };
              
              // Only save ID if it's a MongoDB ObjectId (24-character hex string)
              if (section.id && typeof section.id === 'string' && section.id.length === 24) {
                savedSection.id = section.id;
              }
              
              return savedSection;
            }),
            // Ensure usefulResources is properly structured without file objects
            usefulResources: formData.usefulResources ? formData.usefulResources.map(resource => {
              const savedResource = {
                title: resource.title,
                url: resource.url,
                description: resource.description,
                // File objects can't be serialized, so we exclude them
                // On page refresh, users will need to re-upload files
              };
              
              // Only save ID if it's a MongoDB ObjectId (24-character hex string)
              if (resource.id && typeof resource.id === 'string' && resource.id.length === 24) {
                savedResource.id = resource.id;
              }
              
              return savedResource;
            }) : [{ title: '', url: '', description: '', file: null }]
          };
          
          localStorage.setItem('resourceDraft', JSON.stringify(formDataToSave));
          setLastSaved(new Date());
          toast.info('Draft autosaved', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } catch (e) {
          console.error('Failed to autosave draft', e);
          toast.error('Failed to autosave draft', {
            position: "bottom-right",
            autoClose: 3000,
          });
        }
      }, 3000);
    }

    // Cleanup timer on unmount
    return () => {
      if (autosaveTimer.current) {
        clearTimeout(autosaveTimer.current);
      }
    };
  }, [formData]);

  // Clear draft when form is submitted successfully
  const handleSuccessfulSubmit = useCallback(() => {
    localStorage.removeItem('resourceDraft');
    setLastSaved(null);
    toast.success('Resource saved successfully!', {
      position: "bottom-right",
      autoClose: 3000,
    });
  }, []);

  // Initialize form with existing resource data when editing
  useEffect(() => {
    if (resource) {
      setFormData({
        title: resource.title || '',
        description: resource.description || '',
        category: resource.category || 'quran',
        type: resource.type || 'article',
        author: resource.author || '',
        image: resource.image || '',
        imageFile: null,
        tags: resource.tags ? resource.tags.join(', ') : '',
        publishedDate: resource.publishedDate || new Date().toISOString().split('T')[0],
        contentSections: resource.contentSections && resource.contentSections.length > 0 
          ? resource.contentSections.map(section => ({
              id: section.id, // Preserve existing ID if it exists
              title: section.title || '',
              content: section.content || '',
              media: section.media || [],
              order: section.order || 0
            }))
          : [{ 
              title: '', 
              content: '', 
              media: [],
              order: 1
            }],
        usefulResources: resource.usefulResources && resource.usefulResources.length > 0
          ? resource.usefulResources.map(resource => ({
              id: resource.id, // Preserve existing ID if it exists
              title: resource.title || '',
              url: resource.url || '',
              description: resource.description || '',
              file: null // File objects can't be serialized from existing resources
            }))
          : [{ title: '', url: '', description: '', file: null }]
      });
    } else {
      // For new resources, set publishedDate to current date
      setFormData(prev => ({
        ...prev,
        publishedDate: new Date().toISOString().split('T')[0]
      }));
    }
  }, [resource]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (file) => {
    setFormData(prev => ({
      ...prev,
      imageFile: file
    }));
  };

  const handleChapterChange = (index, field, value) => {
    const updatedSections = [...formData.contentSections];
    updatedSections[index][field] = value;
    setFormData(prev => ({
      ...prev,
      contentSections: updatedSections
    }));
  };

  const handleMediaUpload = (sectionIndex, file) => {
    const updatedSections = [...formData.contentSections];
    const mediaItem = {
      type: file.type.split('/')[0], // 'image', 'video', etc.
      url: URL.createObjectURL(file),
      alt: file.name.split('.')[0]
    };
    updatedSections[sectionIndex].media.push(mediaItem);
    setFormData(prev => ({
      ...prev,
      contentSections: updatedSections
    }));
  };

  const removeMedia = (sectionIndex, mediaIndex) => {
    const updatedSections = [...formData.contentSections];
    updatedSections[sectionIndex].media.splice(mediaIndex, 1);
    setFormData(prev => ({
      ...prev,
      contentSections: updatedSections
    }));
  };

  const handleUsefulResourceChange = (index, field, value) => {
    const updatedResources = [...formData.usefulResources];
    updatedResources[index][field] = value;
    setFormData(prev => ({
      ...prev,
      usefulResources: updatedResources
    }));
  };

  const addUsefulResource = () => {
    setFormData(prev => ({
      ...prev,
      usefulResources: [
        ...prev.usefulResources,
        { title: '', url: '', description: '', file: null }
      ]
    }));
  };

  const removeUsefulResource = (index) => {
    if (formData.usefulResources.length > 1) {
      const updatedResources = formData.usefulResources.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        usefulResources: updatedResources
      }));
    }
  };

  const addChapter = () => {
    setFormData(prev => ({
      ...prev,
      contentSections: [
        ...prev.contentSections,
        { 
          title: '', 
          content: '', 
          media: [],
          order: prev.contentSections.length + 1
        }
      ]
    }));
  };

  const removeChapter = (index) => {
    if (formData.contentSections.length > 1) {
      const updatedSections = formData.contentSections.filter((_, i) => i !== index);
      // Reorder the remaining sections
      const reorderedSections = updatedSections.map((section, i) => ({
        ...section,
        order: i + 1
      }));
      setFormData(prev => ({
        ...prev,
        contentSections: reorderedSections
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process tags
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    // Process content sections
    const contentSectionsArray = formData.contentSections
      .filter(section => section.title || section.content)
      .map((section, index) => {
        const processedSection = {
          title: section.title,
          content: section.content,
          media: section.media,
          order: index + 1
        };
        
        // Only include ID if it's a MongoDB ObjectId (24-character hex string)
        if (section.id && typeof section.id === 'string' && section.id.length === 24) {
          processedSection.id = section.id;
        }
        
        return processedSection;
      });
    
    // Process useful resources
    const usefulResourcesArray = formData.usefulResources
      .filter(resource => resource.title && (resource.url || resource.file || resource.description))
      .map((resource, index) => {
        const processedResource = {
          title: resource.title,
          url: resource.url,
          description: resource.description,
          fileName: resource.file ? resource.file.name : null
        };
        
        // Only include ID if it's a MongoDB ObjectId (24-character hex string)
        if (resource.id && typeof resource.id === 'string' && resource.id.length === 24) {
          processedResource.id = resource.id;
        }
        
        return processedResource;
      });
    
    // Automatically calculate duration and estimated time based on resource type
    let duration = '';
    let estimatedTime = 0;
    
    // Calculate word count from all content sections
    const totalWordCount = contentSectionsArray.reduce((total, section) => {
      return total + section.content.split(/\s+/).length;
    }, 0);
    
    switch (formData.type) {
      case 'video':
        // For videos, we could calculate based on sections or set a default
        estimatedTime = contentSectionsArray.length * 5 || 30;
        duration = `${estimatedTime} min`;
        break;
      case 'podcast':
        // For podcasts, we could calculate based on sections or set a default
        estimatedTime = contentSectionsArray.length * 7 || 45;
        duration = `${estimatedTime} min`;
        break;
      case 'article':
        // For articles, estimate based on word count (approx. 200 words per minute)
        estimatedTime = Math.max(1, Math.round(totalWordCount / 200));
        duration = `${estimatedTime} min read`;
        break;
      case 'course':
        // For courses, calculate based on sections
        estimatedTime = contentSectionsArray.length * 20 || 120;
        duration = `${Math.floor(estimatedTime / 60)}h ${estimatedTime % 60}min`;
        break;
      default:
        estimatedTime = 0;
        duration = '0 min';
    }
    
    const resourceData = {
      ...formData,
      tags: tagsArray,
      contentSections: contentSectionsArray,
      usefulResources: usefulResourcesArray,
      duration,
      estimatedTime,
      views: 0,
      rating: 0
    };
    
    // Handle image file upload
    // In a real application, you would upload the file to a server here
    // For now, we'll just use a placeholder URL or keep the existing image
    if (formData.imageFile) {
      // This is where you would typically upload the file to your server
      // For this example, we'll just generate a placeholder URL
      resourceData.image = URL.createObjectURL(formData.imageFile);
    }
    
    // Handle useful resource file uploads
    // In a real application, you would upload these files to a server here
    const uploadedFiles = formData.usefulResources
      .filter(resource => resource.file)
      .map(resource => resource.file);
    
    if (uploadedFiles.length > 0) {
      console.log('Files to upload:', uploadedFiles);
      // This is where you would typically upload the files to your server
      toast.info(`${uploadedFiles.length} file(s) will be uploaded when connected to a backend`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
    
    // If editing, include the resource ID
    if (resource) {
      resourceData._id = resource._id || resource.id;
    } else {
      // When creating a new resource, remove any ID fields to let MongoDB generate them
      delete resourceData._id;
      delete resourceData.id;
    }
    
    onSubmit(resourceData);
    handleSuccessfulSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resource Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
            placeholder="Enter resource title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
            placeholder="Author name"
          />
        </div>
        
        <div>
          <CustomSelect
            label="Category"
            value={formData.category}
            onChange={(value) => handleChange({ target: { name: 'category', value } })}
            options={categories.filter(cat => cat.id !== 'all')}
          />
        </div>
        
        <div>
          <CustomSelect
            label="Resource Type"
            value={formData.type}
            onChange={(value) => handleChange({ target: { name: 'type', value } })}
            options={resourceTypes.filter(type => type.id !== 'all')}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
          placeholder="Enter resource description"
        />
      </div>
      
      <div>
        <ImageUpload 
          onImageUpload={handleImageUpload} 
          existingImage={formData.image} 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags (comma separated)
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
          placeholder="e.g., faith, basics, spirituality"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Published Date
        </label>
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
          {resource 
            ? new Date(formData.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : 'Will be set to current date when published'
          }
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content Sections
          </label>
          <button
            type="button"
            onClick={addChapter}
            className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
          >
            + Add Section
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.contentSections.map((section, index) => (
            <ContentEditor
              key={section.id || `content-section-${index}`}
              section={section}
              index={index}
              onChange={handleChapterChange}
              onMediaUpload={handleMediaUpload}
              onRemoveMedia={removeMedia}
              onRemove={removeChapter}
            />
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Useful Resources
          </label>
          <button
            type="button"
            onClick={addUsefulResource}
            className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
          >
            + Add Resource
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.usefulResources && formData.usefulResources.map((resource, index) => (
            <UsefulResource
              key={resource.id || `useful-resource-${index}`}
              resource={resource}
              index={index}
              onChange={handleUsefulResourceChange}
              onRemove={removeUsefulResource}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {resource ? 'Update Resource' : 'Add Resource'}
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;