import React from 'react';
import { useSelector } from 'react-redux';
import { CheckCircle } from 'lucide-react';
import Button from '../../../utility/Button';
import ImpactPreview from '../../../utility/ImpactPreview';

const SuccessStep = () => {
  const formData = useSelector((state) => state.donationForm.formData);

  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-12 h-12 text-emerald-600" />
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Thank You!
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-200 mb-2">
          Your donation of ${formData.amount} has been processed
        </p>
        <p className="text-gray-500 dark:text-gray-100">
          May Allah reward you for your generosity
        </p>
      </div>

      <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-6 border border-emerald-200">
        <h3 className="font-bold text-emerald-800 dark:text-gray-100 mb-3">
          Your Impact
        </h3>
        <ImpactPreview
          amount={formData.amount}
          donationType={formData.donationType}
          detailed
        />
      </div>

      <div className="space-y-3">
        <Button
          fullWidth
          size="lg"
          onClick={() => (window.location.href = "/")}
        >
          Return to Home
        </Button>
        <Button variant="outline" fullWidth onClick={() => window.print()}>
          Print Receipt
        </Button>
      </div>
    </div>
  );
};

export default SuccessStep;