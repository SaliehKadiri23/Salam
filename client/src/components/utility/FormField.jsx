import React from 'react';

const FormField = ({ label, children, error, helper }) => (
  <div className="mb-6">
    <label className="block text-gray-700 font-semibold mb-2">{label}</label>
    {children}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    {helper && <p className="text-gray-500 text-sm mt-1">{helper}</p>}
  </div>
);

export default FormField;