import * as Yup from 'yup';

// Base validation schema for all users
const baseValidationSchema = {
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
    .required('Full name is required'),
  
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  
  location: Yup.string()
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must be less than 100 characters')
    .required('Location is required'),
  
  phone: Yup.string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .nullable(),
};

// Password validation for email auth
const passwordValidationSchema = {
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
    .required('Password is required'),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
};

// Role-specific validation schemas
const imamValidationSchema = {
  mosque: Yup.string()
    .min(3, 'Mosque name must be at least 3 characters')
    .max(100, 'Mosque name must be less than 100 characters')
    .required('Mosque/Islamic Center is required'),
  
  certification: Yup.string()
    .min(10, 'Please provide more details about your Islamic education')
    .max(500, 'Certification details must be less than 500 characters')
    .required('Islamic education/certification is required'),
  
  experience: Yup.number()
    .min(1, 'Experience must be at least 1 year')
    .max(70, 'Please enter a realistic number of years')
    .integer('Experience must be a whole number')
    .required('Years of experience is required'),
  
  specialization: Yup.string()
    .min(5, 'Please provide more details about your specialization')
    .max(200, 'Specialization must be less than 200 characters')
    .required('Area of specialization is required'),
};

const chiefImamValidationSchema = {
  ...imamValidationSchema,
  
  references: Yup.string()
    .min(50, 'Please provide detailed references with contact information')
    .max(1000, 'References must be less than 1000 characters')
    .required('Professional references are required'),
  
  adminExperience: Yup.string()
    .min(50, 'Please provide detailed administrative experience')
    .max(1000, 'Administrative experience must be less than 1000 characters')
    .required('Administrative experience is required'),
};

// Dynamic validation schema generator
export const getValidationSchema = (selectedRole, authMethod) => {
  let schema = { ...baseValidationSchema };
  
  // Add password validation for email auth
  if (authMethod === 'email') {
    schema = { ...schema, ...passwordValidationSchema };
  }
  
  // Add role-specific validation
  if (selectedRole === 'imam') {
    schema = { ...schema, ...imamValidationSchema };
  } else if (selectedRole === 'chiefImam') {
    schema = { ...schema, ...chiefImamValidationSchema };
  }
  
  return Yup.object().shape(schema);
};

// Initial values generator
export const getInitialValues = (selectedRole, authMethod) => {
  let initialValues = {
    fullName: '',
    email: '',
    location: '',
    phone: '',
  };
  
  // Add password fields for email auth
  if (authMethod === 'email') {
    initialValues = {
      ...initialValues,
      password: '',
      confirmPassword: '',
    };
  }
  
  // Add role-specific fields
  if (selectedRole === 'imam') {
    initialValues = {
      ...initialValues,
      mosque: '',
      certification: '',
      experience: '',
      specialization: '',
    };
  } else if (selectedRole === 'chiefImam') {
    initialValues = {
      ...initialValues,
      mosque: '',
      certification: '',
      experience: '',
      specialization: '',
      references: '',
      adminExperience: '',
    };
  }
  
  return initialValues;
};

// Helper function to get field validation rules for displaying to users
export const getFieldHelperText = (fieldName) => {
  const helperTexts = {
    fullName: 'Enter your full name (letters and spaces only)',
    email: 'We\'ll use this to send you important updates',
    location: 'City, Country format preferred',
    phone: 'Include country code (optional)',
    password: 'At least 8 characters with uppercase, lowercase, number, and special character',
    confirmPassword: 'Must match your password exactly',
    mosque: 'Full name of your mosque or Islamic center',
    certification: 'Details about your Islamic education, certificates, or qualifications',
    experience: 'Number of years in Islamic leadership or teaching',
    specialization: 'Your areas of expertise (e.g., Fiqh, Quran, Hadith, Community Services)',
    references: 'Provide 2-3 professional references with names, positions, and contact information',
    adminExperience: 'Describe your administrative and leadership experience in Islamic organizations',
  };
  
  return helperTexts[fieldName] || '';
};