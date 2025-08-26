import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { FaCheck } from "react-icons/fa";
import { SIGNUP_ROLES } from "../constants/rolesData";
import { 
  selectRole, 
  selectSelectedRole,
  selectCurrentStep 
} from "../../../redux/signupSlice";

const RoleSelectionStep = ({ stepRefs }) => {
  const dispatch = useDispatch();
  const selectedRole = useSelector(selectSelectedRole);
  const currentStep = useSelector(selectCurrentStep);

  const handleRoleSelect = (roleId) => {
    dispatch(selectRole(roleId));
  };

  if (currentStep !== "selectRole") return null;

  return (
    <div
      ref={stepRefs ? (el) => (stepRefs.current[0] = el) : null}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Choose Your Role
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {SIGNUP_ROLES.map((role) => (
          <div
            key={role.id}
            onClick={() => handleRoleSelect(role.id)}
            className={`
              cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg relative overflow-hidden
              ${
                selectedRole === role.id
                  ? "border-green-500 bg-green-50 shadow-lg scale-105"
                  : "border-gray-200 bg-white hover:border-green-300"
              }
            `}
          >
            {/* Selection indicator */}
            {selectedRole === role.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <FaCheck className="w-3 h-3 text-white" />
              </div>
            )}

            {/* Role Icon and Title */}
            <div className="flex items-center mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center`}
              >
                <role.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 ml-3">
                {role.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {role.description}
            </p>

            {/* Permissions Preview */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700">
                What you can do:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                {role.permissions.map((permission, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="w-3 h-3 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{permission}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            className="text-green-600 font-bold hover:underline"
            to={"/login"}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RoleSelectionStep;