import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { ChevronDown, Upload, X, Bold, Italic, Heading, List, Link } from 'lucide-react';

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

const ContentEditor = ({ content, onChange, onMediaUpload, onRemoveMedia }) => {
  const [wordCount, setWordCount] = useState(content.split(/\s+/).filter(word => word).length);
  const textareaRef = useRef(null);

  const handleContentChange = (e) => {
    const content = e.target.value;
    const words = content.split(/\s+/).filter(word => word).length;
    setWordCount(words);
    onChange(content);
  };

  const handleMediaFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      onMediaUpload(e.target.files[0]);
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
    onChange(newText);
    
    // Focus back to textarea and set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4 bg-white dark:bg-gray-700">
      <div className="mb-2">
        <div className="flex flex-wrap gap-1 p-2 bg-gray-50 dark:bg-gray-600 rounded-t-lg border border-gray-200 dark:border-gray-600 border-b-0">
          <button
            type="button"
            onClick={() => insertFormatting('bold')}
            className="px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('italic')}
            className="px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('heading')}
            className="px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            title="Heading"
          >
            <Heading className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('list')}
            className="px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('link')}
            className="px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            title="Link"
          >
            <Link className="w-4 h-4" />
          </button>
        </div>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          rows={15}
          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-b-lg rounded-t-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
          placeholder="Write your article content here... Use Markdown formatting for rich text."
        />
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
          <span>{wordCount} words</span>
          <span>Markdown supported</span>
        </div>
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

const ArticleForm = ({ article, onSubmit, categories, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    // Generate a unique identifier for this form session
    const formId = article ? `edit_${article._id || article.id}` : 'new_article';
    
    // Try to load draft from localStorage for this specific article/form
    const savedDraft = localStorage.getItem(`articleDraft_${formId}`);
    if (savedDraft) {
      try {
        return JSON.parse(savedDraft);
      } catch (e) {
        console.error('Failed to parse saved draft', e);
      }
    }
    
    // If editing an existing article, initialize with that data
    if (article) {
      return {
        title: article.title || '',
        excerpt: article.excerpt || '',
        category: article.category || 'Islam',
        author: article.author || '',
        image: article.image || '',
        imageFile: null,
        content: article.content || '',
      };
    }
    
    // For new articles, start with a clean form
    return {
      title: '',
      excerpt: '',
      category: 'Islam',
      author: '',
      image: '',
      imageFile: null,
      content: '',
    };
  });
  
  const formId = article ? `edit_${article._id || article.id}` : 'new_article';
  const [lastSaved, setLastSaved] = useState(null);
  const autosaveTimer = useRef(null);

  // Autosave to localStorage
  useEffect(() => {
    // Clear existing timer
    if (autosaveTimer.current) {
      clearTimeout(autosaveTimer.current);
    }

    // Set new timer for autosave (3 seconds after last change)
    if (formData.title || formData.excerpt) {
      autosaveTimer.current = setTimeout(() => {
        try {
          // Save to localStorage (excluding file objects which can't be serialized)
          const formDataToSave = {
            ...formData,
            imageFile: null, // File objects can't be serialized
          };
          
          localStorage.setItem(`articleDraft_${formId}`, JSON.stringify(formDataToSave));
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
  }, [formData, formId]);

  // Clear draft when form is submitted successfully
  const handleSuccessfulSubmit = useCallback(() => {
    localStorage.removeItem(`articleDraft_${formId}`);
    setLastSaved(null);
    toast.success('Article saved successfully!', {
      position: "bottom-right",
      autoClose: 3000,
    });
  }, [formId]);

  // Update form when article prop changes (e.g., when switching between add/edit modes)
  useEffect(() => {
    // When switching to add mode (article is null), reset to clean form
    if (!article) {
      setFormData({
        title: '',
        excerpt: '',
        category: 'Islam',
        author: '',
        image: '',
        imageFile: null,
        content: '',
      });
    }
    // When switching to edit mode (article is not null), initialize with article data
    else {
      setFormData({
        title: article.title || '',
        excerpt: article.excerpt || '',
        category: article.category || 'Islam',
        author: article.author || '',
        image: article.image || '',
        imageFile: null,
        content: article.content || '',
      });
    }
  }, [article]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate read time based on word count (approx. 200 words per minute)
    const wordCount = formData.content.split(/\s+/).filter(word => word).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));
    
    const articleData = {
      ...formData,
      readTime,
    };
    
    // Handle image file upload
    // In a real application, you would upload the file to a server here
    // For now, we'll just use a placeholder URL or keep the existing image
    if (formData.imageFile) {
      // This is where you would typically upload the file to your server
      // For this example, we'll just generate a placeholder URL
      articleData.image = URL.createObjectURL(formData.imageFile);
    }
    
    // If editing, include the article ID
    if (article) {
      articleData._id = article._id || article.id;
    } else {
      // When creating a new article, remove any ID fields to let MongoDB generate them
      delete articleData._id;
      delete articleData.id;
    }
    
    onSubmit(articleData);
    handleSuccessfulSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Article Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
            placeholder="Enter article title"
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
            options={categories}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Excerpt
        </label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:bg-gray-700 dark:text-white"
          placeholder="Brief summary of the article"
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
          Content
        </label>
        <ContentEditor
          content={formData.content}
          onChange={(content) => handleChange({ target: { name: 'content', value: content } })}
          onMediaUpload={() => {}}
          onRemoveMedia={() => {}}
        />
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
          {article ? 'Update Article' : 'Add Article'}
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;