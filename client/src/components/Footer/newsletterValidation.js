import * as Yup from 'yup';

export const newsletterValidationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required')
});