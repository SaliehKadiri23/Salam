import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateFormData,
  nextStep,
  prevStep,
} from '../../../../redux/donationFormSlice';
import { DollarSign, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../../../utility/Button';
import FormField from '../../../utility/FormField';
import ImpactPreview from '../../../utility/ImpactPreview';

const AmountStep = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.donationForm.formData);
  const [customAmount, setCustomAmount] = useState(formData.amount || '');

  useEffect(() => {
    setCustomAmount(formData.amount || '');
  }, [formData.amount]);

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  const handleAmountSelect = (amount) => {
    setCustomAmount(amount.toString());
    dispatch(updateFormData({ amount }));
  };

  const handleCustomAmount = (value) => {
    setCustomAmount(value);
    dispatch(updateFormData({ amount: parseFloat(value) || 0 }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Amount</h2>
        <p className="text-gray-600">Every contribution makes a difference</p>
      </div>

      {/* Preset Amounts */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => handleAmountSelect(amount)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 font-semibold ${
              formData.amount === amount
                ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                : 'border-gray-200 hover:border-emerald-300 text-gray-700'
            }`}
          >
            ${amount}
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <FormField label="Custom Amount">
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="number"
            value={customAmount}
            onChange={(e) => handleCustomAmount(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
            placeholder="Enter custom amount"
            min="1"
          />
        </div>
      </FormField>

      {/* Frequency Selection */}
      <FormField label="Donation Frequency">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['One-time', 'Monthly', 'Quarterly', 'Annually'].map((freq) => (
            <button
              key={freq}
              onClick={() => dispatch(updateFormData({ frequency: freq }))}
              className={`p-3 rounded-lg border transition-all duration-300 text-sm font-medium ${
                formData.frequency === freq
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                  : 'border-gray-200 hover:border-emerald-300 text-gray-700'
              }`}
            >
              {freq}
            </button>
          ))}
        </div>
      </FormField>

      {/* Impact Preview */}
      {formData.amount > 0 && (
        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
          <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Your Impact
          </h3>
          <ImpactPreview
            amount={formData.amount}
            donationType={formData.donationType}
          />
        </div>
      )}

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
          disabled={!formData.amount || formData.amount <= 0}
          fullWidth
          size="lg"
        >
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default AmountStep;