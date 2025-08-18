import React from 'react';

const NewsletterSignup = ({ email, setEmail, onSubmit }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 shadow-2xl">
      <div className="absolute inset-0 bg-islamic-pattern opacity-30"></div>
      
      <div className="relative text-center">
        <h3 className="text-3xl font-bold text-white mb-2">Stay Updated</h3>
        <p className="text-green-100 mb-6 text-lg">
          Subscribe to receive our latest articles and Islamic insights directly in your inbox
        </p>
        
        <form onSubmit={onSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-4 focus:ring-white/25 transition-all duration-300"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Subscribe
            </button>
          </div>
        </form>
        
        <p className="text-green-200 text-sm mt-4">
          Join 10,000+ Muslims receiving weekly inspiration
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;