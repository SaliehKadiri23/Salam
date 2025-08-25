import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuranicVerse from '../components/blog/QuranicVerse';
import BlogHeader from '../components/blog/BlogHeader';
import FilterControls from '../components/blog/FilterControls';
import ArticlesGrid from '../components/blog/ArticlesGrid';
import { setSearchTerm, setSelectedCategory, setPage, toggleBookmark } from '../redux/blogSlice';

// Custom Hook for Debouncing (Fix #4)
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};


// function to check if article is from last week
const isLatest = (dateString) => {
  const articleDate = new Date(dateString);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return articleDate > oneWeekAgo;
};

// Social sharing function
const shareArticle = (article, platform) => {
  const articleUrl = `${window.location.origin}/articles/${article.id}`;
  const url = encodeURIComponent(articleUrl);
  const title = encodeURIComponent(article.title);
  
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${title}`,
    whatsapp: `https://wa.me/?text=${title}%20${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  };
  
  if (navigator.share && platform === 'native') {
    navigator.share({ title: article.title, text: article.excerpt, url: articleUrl });
  } else if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400,noopener,noreferrer');
  }
};

// Main Component
const BlogAndArticles = () => {
  const dispatch = useDispatch();
  const { articles, searchTerm, selectedCategory, page } = useSelector((state) => state.blog);
  const {quranicVerseOfTheDay} = useSelector((state) => state.islamicUtilities)

  const [isLoading, setIsLoading] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const articlesPerPage = 9;
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  
  // Categories
  const categories = useMemo(() => {
    const allArticles = articles; // Use a fresh copy to derive categories
    return ['All', 'Latest', ...new Set(allArticles.map(article => article.category))];
  }, []);

  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    if (selectedCategory === 'Latest') {
      filtered = articles.filter(article => isLatest(article.publishDate));
    } else if (selectedCategory !== 'All') {
      filtered = articles.filter(article => article.category === selectedCategory);
    }

    if (debouncedSearchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [articles, debouncedSearchTerm, selectedCategory]);
  
  const hasMore = page * articlesPerPage < filteredArticles.length;

  // Sliced articles for display (Fix #3)
  const articlesToDisplay = useMemo(() => {
    return filteredArticles.slice(0, page * articlesPerPage);
  }, [filteredArticles, page]);


  // Reset pagination when filters change
  useEffect(() => {
    dispatch(setPage(1));
  }, [debouncedSearchTerm, selectedCategory, dispatch]);

  // Load more articles function (for Intersection Observer)
  const loadMoreArticles = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => { // Simulate network delay
      dispatch(setPage(page + 1));
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMore, dispatch, page]);
  
  // Intersection Observer for infinite scroll (Fix #2)
  const observer = useRef();
  const lastArticleElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreArticles();
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore, loadMoreArticles]);


  // Toggle bookmark (Fix #3 - this now works correctly)
  const handleToggleBookmark = useCallback((articleId) => {
    dispatch(toggleBookmark(articleId));
  }, [dispatch]);

  // Newsletter signup
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      alert(`Thank you for subscribing with ${newsletterEmail}!`);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900 font-sans">
      <QuranicVerse verse={quranicVerseOfTheDay} />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <BlogHeader />
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={(value) => dispatch(setSearchTerm(value))}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(value) => dispatch(setSelectedCategory(value))}
        />
        <ArticlesGrid
          articlesToDisplay={articlesToDisplay}
          lastArticleElementRef={lastArticleElementRef}
          toggleBookmark={handleToggleBookmark}
          shareArticle={shareArticle}
          newsletterEmail={newsletterEmail}
          setNewsletterEmail={setNewsletterEmail}
          handleNewsletterSubmit={handleNewsletterSubmit}
          isLoading={isLoading}
          hasMore={hasMore}
          filteredArticles={filteredArticles}
        />
      </main>
    </div>
  );
};

export default BlogAndArticles;