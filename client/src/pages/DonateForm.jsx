import React, { useState, useEffect } from "react";
import {
  Shield,
  CreditCard,
  Lock,
  CheckCircle,
  DollarSign,
  Calendar,
  Globe,
  Heart,
  Users,
  Star,
  ArrowRight,
  ArrowLeft,
  Info,
} from "lucide-react";
import { TbBuildingMosque } from "react-icons/tb";


// ==================== UTILITY COMPONENTS ====================

const IslamicPattern = ({ className = "" }) => (
  <div className={`opacity-5 pointer-events-none ${className}`}>
    <svg width="40" height="40" viewBox="0 0 40 40" className="w-full h-full">
      <g fill="currentColor" fillRule="evenodd">
        <circle cx="20" cy="20" r="2" />
        <circle cx="10" cy="10" r="1" />
        <circle cx="30" cy="10" r="1" />
        <circle cx="10" cy="30" r="1" />
        <circle cx="30" cy="30" r="1" />
      </g>
    </svg>
  </div>
);

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex justify-center items-center space-x-4 mb-8">
    {Array.from({ length: totalSteps }, (_, i) => (
      <div key={i} className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
            i < currentStep
              ? "bg-emerald-500 text-white"
              : i === currentStep
              ? "bg-emerald-100 text-emerald-600 border-2 border-emerald-500"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {i < currentStep ? <CheckCircle className="w-5 h-5" /> : i + 1}
        </div>
        {i < totalSteps - 1 && (
          <div
            className={`w-12 h-1 mx-2 transition-all duration-300 ${
              i < currentStep ? "bg-emerald-500" : "bg-gray-200"
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

const FormField = ({ label, children, error, helper }) => (
  <div className="mb-6">
    <label className="block text-gray-700 font-semibold mb-2">{label}</label>
    {children}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    {helper && <p className="text-gray-500 text-sm mt-1">{helper}</p>}
  </div>
);

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  fullWidth = false,
  className = "",
}) => {
  const baseClasses =
    "font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200",
    outline: "border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? "w-full" : ""} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${className}
      `}
    >
      {children}
    </button>
  );
};

// ==================== FORM STEP COMPONENTS ====================

const DonationTypeStep = ({ formData, updateFormData, onNext }) => {
  const donationTypes = [
    {
      id: "zakat",
      title: "Zakat",
      description: "2.5% of wealth annually",
      icon: <TbBuildingMosque className="w-6 h-6" />,
    },
    {
      id: "sadaqah",
      title: "Sadaqah",
      description: "Voluntary charity",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      id: "general",
      title: "General Donation",
      description: "Community programs",
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: "orphan",
      title: "Orphan Support",
      description: "Supporting orphaned children",
      icon: <Star className="w-6 h-6" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Choose Donation Type
        </h2>
        <p className="text-gray-600">
          Select how you'd like to contribute to our mission
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {donationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => updateFormData({ donationType: type.id })}
            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
              formData.donationType === type.id
                ? "border-emerald-500 bg-emerald-50"
                : "border-gray-200 hover:border-emerald-300"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-lg ${
                  formData.donationType === type.id
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {type.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{type.title}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>
              {formData.donationType === type.id && (
                <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto" />
              )}
            </div>
          </button>
        ))}
      </div>

      <Button
        onClick={onNext}
        disabled={!formData.donationType}
        fullWidth
        size="lg"
      >
        Continue <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

const AmountStep = ({ formData, updateFormData, onNext, onBack }) => {
  const [customAmount, setCustomAmount] = useState(formData.amount || "");
  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  const handleAmountSelect = (amount) => {
    setCustomAmount(amount.toString());
    updateFormData({ amount: amount });
  };

  const handleCustomAmount = (value) => {
    setCustomAmount(value);
    updateFormData({ amount: parseFloat(value) || 0 });
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
                ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                : "border-gray-200 hover:border-emerald-300 text-gray-700"
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
          {["One-time", "Monthly", "Quarterly", "Annually"].map((freq) => (
            <button
              key={freq}
              onClick={() => updateFormData({ frequency: freq })}
              className={`p-3 rounded-lg border transition-all duration-300 text-sm font-medium ${
                formData.frequency === freq
                  ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                  : "border-gray-200 hover:border-emerald-300 text-gray-700"
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
        <Button variant="secondary" onClick={onBack} size="lg">
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>
        <Button
          onClick={onNext}
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

const PaymentStep = ({ formData, updateFormData, onNext, onBack }) => {
  const paymentMethods = [
    {
      id: "card",
      title: "Credit/Debit Card",
      icon: <CreditCard className="w-6 h-6" />,
    },
    { id: "paypal", title: "PayPal", icon: <Globe className="w-6 h-6" /> },
    {
      id: "bank",
      title: "Bank Transfer",
      icon: <DollarSign className="w-6 h-6" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Method
        </h2>
        <p className="text-gray-600">Choose your preferred payment method</p>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => updateFormData({ paymentMethod: method.id })}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
              formData.paymentMethod === method.id
                ? "border-emerald-500 bg-emerald-50"
                : "border-gray-200 hover:border-emerald-300"
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
            <span className="font-semibold text-gray-800">{method.title}</span>
            {formData.paymentMethod === method.id && (
              <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto" />
            )}
          </button>
        ))}
      </div>

      {/* Security Indicators */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          Secure Payment
        </h3>
        <div className="grid gap-3 text-sm text-gray-600">
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
        <Button variant="secondary" onClick={onBack} size="lg">
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>
        <Button
          onClick={onNext}
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

const ReviewStep = ({ formData, onSubmit, onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onSubmit();
  };

  const getDonationTypeDisplay = (type) => {
    const types = {
      zakat: "Zakat",
      sadaqah: "Sadaqah",
      general: "General Donation",
      orphan: "Orphan Support",
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
          onClick={onBack}
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

const SuccessStep = ({ formData }) => (
  <div className="text-center space-y-6">
    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
      <CheckCircle className="w-12 h-12 text-emerald-600" />
    </div>

    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
      <p className="text-xl text-gray-600 mb-2">
        Your donation of ${formData.amount} has been processed
      </p>
      <p className="text-gray-500">May Allah reward you for your generosity</p>
    </div>

    <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
      <h3 className="font-bold text-emerald-800 mb-3">Your Impact</h3>
      <ImpactPreview
        amount={formData.amount}
        donationType={formData.donationType}
        detailed
      />
    </div>

    <div className="space-y-3">
      <Button fullWidth size="lg" onClick={() => (window.location.href = "/")}>
        Return to Home
      </Button>
      <Button variant="outline" fullWidth onClick={() => window.print()}>
        Print Receipt
      </Button>
    </div>
  </div>
);

// ==================== UTILITY COMPONENTS ====================

const ImpactPreview = ({ amount, donationType, detailed = false }) => {
  const getImpactData = (amount, type) => {
    const impacts = {
      zakat: [
        {
          metric: Math.floor(amount / 10),
          label: "meals provided",
          icon: "🍽️",
        },
        {
          metric: Math.floor(amount / 25),
          label: "families helped",
          icon: "🏠",
        },
      ],
      sadaqah: [
        {
          metric: Math.floor(amount / 15),
          label: "children educated",
          icon: "📚",
        },
        {
          metric: Math.floor(amount / 30),
          label: "medical treatments",
          icon: "❤️‍🩹",
        },
      ],
      general: [
        {
          metric: Math.floor(amount / 20),
          label: "community programs",
          icon: "🏘️",
        },
        {
          metric: Math.floor(amount / 12),
          label: "support packages",
          icon: "📦",
        },
      ],
      orphan: [
        {
          metric: Math.floor(amount / 50),
          label: "orphans supported",
          icon: "🎖️",
        },
        {
          metric: Math.floor(amount / 25),
          label: "months of care",
          icon: "❤️",
        },
      ],
    };

    return impacts[type] || impacts.general;
  };

  const impacts = getImpactData(amount, donationType);

  return (
    <div
      className={`grid gap-3 ${detailed ? "md:grid-cols-2" : "grid-cols-1"}`}
    >
      {impacts.map((impact, index) => (
        <div
          key={index}
          className="flex items-center gap-3 bg-white rounded-lg p-3"
        >
          <span className="text-2xl">{impact.icon}</span>
          <div>
            <p className="text-lg font-bold text-emerald-600">
              {impact.metric}
            </p>
            <p className="text-sm text-gray-600">{impact.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

const DonationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    donationType: "",
    amount: 0,
    frequency: "One-time",
    paymentMethod: "",
  });

  // Get URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type");
    const amount = urlParams.get("amount");

    if (type) {
      setFormData((prev) => ({ ...prev, donationType: type }));
    }
    if (amount) {
      setFormData((prev) => ({ ...prev, amount: parseFloat(amount) }));
    }
  }, []);

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    console.log("Donation submitted:", formData);
    nextStep(); // Move to success step
  };

  const steps = [
    <DonationTypeStep
      key="type"
      formData={formData}
      updateFormData={updateFormData}
      onNext={nextStep}
    />,
    <AmountStep
      key="amount"
      formData={formData}
      updateFormData={updateFormData}
      onNext={nextStep}
      onBack={prevStep}
    />,
    <PaymentStep
      key="payment"
      formData={formData}
      updateFormData={updateFormData}
      onNext={nextStep}
      onBack={prevStep}
    />,
    <ReviewStep
      key="review"
      formData={formData}
      onSubmit={handleSubmit}
      onBack={prevStep}
    />,
    <SuccessStep key="success" formData={formData} />,
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Islamic Pattern Background */}
      <div className="fixed inset-0">
        <IslamicPattern className="absolute inset-0 text-emerald-500" />
      </div>

      <div className="relative z-10 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          {currentStep < 4 && (
            <StepIndicator currentStep={currentStep} totalSteps={4} />
          )}

          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {steps[currentStep]}
          </div>

          {/* Trust Indicators */}
          {currentStep < 4 && (
            <div className="mt-8 text-center">
              <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
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
