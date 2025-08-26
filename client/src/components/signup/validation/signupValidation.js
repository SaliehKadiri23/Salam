import * as Yup from "yup";

export const getSignupValidationSchema = (selectedRole, authMethod) => {
  const baseSchema = {
    fullName: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    location: Yup.string().required("Location is required"),
    phone: Yup.string().matches(
      /^[\+]?[1-9]\d{1,14}$/,
      "Invalid phone number format"
    ),
  };

  if (authMethod === "email") {
    baseSchema.password = Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/(?=.*[a-z])/, "Password must contain lowercase letter")
      .matches(/(?=.*[A-Z])/, "Password must contain uppercase letter")
      .matches(/(?=.*\d)/, "Password must contain a number")
      .matches(/(?=.*[@$!%*?&])/, "Password must contain special character")
      .required("Password is required");
  }

  if (selectedRole === "imam") {
    baseSchema.mosque = Yup.string().required(
      "Mosque affiliation is required"
    );
    baseSchema.certification = Yup.string().required(
      "Certification is required"
    );
    baseSchema.experience = Yup.string().required("Experience is required");
    baseSchema.specialization = Yup.string().required(
      "Specialization is required"
    );
  }

  if (selectedRole === "chief_imam") {
    baseSchema.mosque = Yup.string().required(
      "Mosque affiliation is required"
    );
    baseSchema.certification = Yup.string().required(
      "Certification is required"
    );
    baseSchema.experience = Yup.string().required("Experience is required");
    baseSchema.specialization = Yup.string().required(
      "Specialization is required"
    );
    baseSchema.references = Yup.string().required("References are required");
    baseSchema.adminExperience = Yup.string().required(
      "Administrative experience is required"
    );
  }

  return Yup.object().shape(baseSchema);
};