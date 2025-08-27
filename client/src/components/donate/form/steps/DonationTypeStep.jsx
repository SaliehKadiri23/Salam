import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, nextStep } from '../../../../redux/donationFormSlice';
import { Heart, Users, Star, ArrowRight, CheckCircle, Stars } from 'lucide-react';
import { TbBuildingMosque } from 'react-icons/tb';
import Button from '../../../utility/Button';

const DonationTypeStep = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.donationForm.formData);
  

  const donationTypes = [
    {
      id: 'zakat',
      title: 'Zakat',
      description: '2.5% of wealth annually',
      icon: <TbBuildingMosque className="w-6 h-6" />,
    },
    {
      id: 'sadaqah',
      title: 'Sadaqah',
      description: 'Voluntary charity',
      icon: <Heart className="w-6 h-6" />,
    },
    {
      id: 'general',
      title: 'General Donation',
      description: 'Community programs',
      icon: <Stars className="w-6 h-6" />,
    },
    {
      id: 'orphan',
      title: 'Orphan Support',
      description: 'Supporting orphaned children',
      icon: <Star className="w-6 h-6" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Choose Donation Type
        </h2>
        <p className="text-gray-600 dark:text-gray-200">
          Select how you'd like to contribute to our mission
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {donationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => dispatch(updateFormData({ donationType: type.id }))}
            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
              formData.donationType === type.id
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-700"
                : "border-gray-200 dark:border-emerald-600 hover:border-emerald-300"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-lg ${
                  formData.donationType === type.id
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 dark:bg-gray-400 text-gray-600 dark:text-white"
                }`}
              >
                {type.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100">{type.title}</h3>
                <p className="text-gray-600 dark:text-gray-200 text-sm">{type.description}</p>
              </div>
              {formData.donationType === type.id && (
                <CheckCircle className="w-5 h-5 text-emerald-500 dark:text-emerald-300 ml-auto" />
              )}
            </div>
          </button>
        ))}
      </div>

      <Button
        onClick={() => dispatch(nextStep())}
        disabled={!formData.donationType}
        fullWidth
        size="lg"
      >
        Continue <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default DonationTypeStep;