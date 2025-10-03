import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal from '../components/signup/ui-components/SuccessModal';
import { showSuccessModal, hideSuccessModal } from '../redux/signupSlice';

const SignUpSuccess = () => {
  const dispatch = useDispatch();
  const showSuccess = useSelector((state) => state.signup.showSuccessModal);

  useEffect(() => {
    dispatch(showSuccessModal());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
      <SuccessModal isOpen={showSuccess} onClose={() => dispatch(hideSuccessModal())} />
    </div>
  );
};

export default SignUpSuccess;
