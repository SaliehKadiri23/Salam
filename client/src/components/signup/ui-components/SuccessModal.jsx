import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { resetSignup, goBackToRoleSelection, hideSuccessModal } from '../../../redux/signupSlice';

const SuccessModal = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      const redirectTimer = setTimeout(() => {
        dispatch(hideSuccessModal());
        dispatch(resetSignup());
        dispatch(goBackToRoleSelection());
        navigate('/');
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimer);
      };
    }
  }, [isOpen, dispatch, navigate]);

  if (!isOpen) return null;

  const handleCloseAndRedirect = () => {
    dispatch(hideSuccessModal());
    dispatch(resetSignup());
    dispatch(goBackToRoleSelection());
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center max-w-sm mx-auto">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Account Created Successfully!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Welcome to our community! You will be redirected to the homepage in {countdown} seconds.</p>
        <button
          onClick={handleCloseAndRedirect}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Go to Homepage Now
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
