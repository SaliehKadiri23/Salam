import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { prevStep, submitDonation } from '../../../../redux/donationFormSlice';
import { ArrowLeft, Heart, CheckCircle } from 'lucide-react';
import Button from '../../../utility/Button';
import ImpactPreview from '../../../utility/ImpactPreview';

const ReviewStep = () => {
  const dispatch = useDispatch();
  const { formData, isSubmitting } = useSelector((state) => state.donationForm);

  const handleSubmit = () => {
    dispatch(submitDonation(formData));
  };

  const getDonationTypeDisplay = (type) => {
    const types = {
      zakat: 'Zakat',
      sadaqah: 'Sadaqah',
      general: 'General Donation',
      orphan: 'Orphan Support',
    };
    return types[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Review Your Donation
        </h2>
        <p className="text-gray-600">
          Please review your donation details before proceeding
        </p>
      </div>

      {/* Donation Summary Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6">
          <h3 className="text-2xl font-bold">Donation Summary</h3>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Donation Type</span>
            <span className="font-semibold text-gray-800">
              {getDonationTypeDisplay(formData.donationType)}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Amount</span>
            <span className="text-2xl font-bold text-emerald-600">
              ${formData.amount}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Frequency</span>
            <span className="font-semibold text-gray-800">
              {formData.frequency}
            </span>
          </div>

          <div className="flex justify-between items-center py-3">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-semibold text-gray-800 capitalize">
              {formData.paymentMethod}
            </span>
          </div>
        </div>
      </div>

      {/* Impact Preview */}
      <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
        <h3 className="font-bold text-emerald-800 mb-4">Your Impact</h3>
        <ImpactPreview
          amount={formData.amount}
          donationType={formData.donationType}
          detailed
        />
      </div>

      {/* Receipt Preview */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          What happens next?
        </h3>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>• You'll receive an instant email confirmation</li>
          <li>• Tax-deductible receipt will be sent within 24 hours</li>
          <li>• Updates on how your donation is being used</li>
          <li>• Quarterly impact reports showing your contribution's effect</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <Button
          variant="secondary"
          onClick={() => dispatch(prevStep())}
          size="lg"
          disabled={isSubmitting}
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          fullWidth
          size="lg"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Heart className="w-5 h-5" />
              Complete Donation
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;