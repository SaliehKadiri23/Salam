import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../redux/donationFormSlice';

import IslamicPattern from '../components/utility/IslamicPattern';
import StepIndicator from '../components/utility/StepIndicator';
import DonationTypeStep from '../components/donate/form/steps/DonationTypeStep';
import AmountStep from '../components/donate/form/steps/AmountStep';
import PaymentStep from '../components/donate/form/steps/PaymentStep';
import ReviewStep from '../components/donate/form/steps/ReviewStep';
import SuccessStep from '../components/donate/form/steps/SuccessStep';
import { Shield, CheckCircle, Heart } from 'lucide-react';

const DonationForm = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.donationForm.currentStep);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const amount = urlParams.get('amount');

    const initialData = {};
    if (type) initialData.donationType = type;
    if (amount) initialData.amount = parseFloat(amount);

    if (Object.keys(initialData).length > 0) {
      dispatch(updateFormData(initialData));
    }
  }, [dispatch]);

  const steps = [
    <DonationTypeStep key="type" />,
    <AmountStep key="amount" />,
    <PaymentStep key="payment" />,
    <ReviewStep key="review" />,
    <SuccessStep key="success" />,
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black/100 ">
      {/* Islamic Pattern Background */}
      <div className="fixed inset-0">
        <IslamicPattern className="absolute inset-0 text-emerald-500" />
      </div>

      <div className="relative z-10 px-6 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          {currentStep < 4 && (
            <StepIndicator currentStep={currentStep} totalSteps={4} />
          )}

          {/* Form Container */}
          <div className="bg-white dark:bg-gray-950  rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-emerald-600">
            {steps[currentStep]}
          </div>

          {/* Trust Indicators */}
          {currentStep < 4 && (
            <div className="mt-8 text-center">
              <div className="flex justify-center items-center gap-6 text-sm text-gray-500 dark:text-gray-100">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Secure & Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>100% Transparent</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-emerald-600" />
                  <span>Scholar Approved</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
