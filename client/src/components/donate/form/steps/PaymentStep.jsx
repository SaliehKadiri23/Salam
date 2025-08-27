import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateFormData,
  nextStep,
  prevStep,
} from '../../../../redux/donationFormSlice';
import {
  CreditCard,
  Globe,
  DollarSign,
  Shield,
  Lock,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import Button from '../../../utility/Button';

const PaymentStep = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.donationForm.formData);

  const paymentMethods = [
    {
      id: 'card',
      title: 'Credit/Debit Card',
      icon: <CreditCard className="w-6 h-6" />,
    },
    { id: 'paypal', title: 'PayPal', icon: <Globe className="w-6 h-6" /> },
    {
      id: 'bank',
      title: 'Bank Transfer',
      icon: <DollarSign className="w-6 h-6" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Payment Method
        </h2>
        <p className="text-gray-600 dark:text-gray-200">
          Choose your preferred payment method
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() =>
              dispatch(updateFormData({ paymentMethod: method.id }))
            }
            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
              formData.paymentMethod === method.id
                ? "border-emerald-500 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-700"
                : "border-gray-200  dark:border-emerald-600 hover:border-emerald-300"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                formData.paymentMethod === method.id
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {method.icon}
            </div>
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {method.title}
            </span>
            {formData.paymentMethod === method.id && (
              <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto" />
            )}
          </button>
        ))}
      </div>

      {/* Security Indicators */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          Secure Payment
        </h3>
        <div className="grid gap-3 text-sm text-gray-600 dark:text-gray-200">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            256-bit SSL encryption
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            PCI DSS compliant
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            Your data is protected
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="secondary"
          onClick={() => dispatch(prevStep())}
          size="lg"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>
        <Button
          onClick={() => dispatch(nextStep())}
          disabled={!formData.paymentMethod}
          fullWidth
          size="lg"
        >
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;