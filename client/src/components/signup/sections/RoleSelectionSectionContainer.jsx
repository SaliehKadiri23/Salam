import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectRole,
  selectSelectedRole,
  selectShowRoleSelection
} from '../../../redux/signupSlice';
import RoleSelectionSection from './RoleSelectionSection';

const RoleSelectionSectionContainer = ({ authSectionRef }) => {
  const dispatch = useDispatch();
  
  // Redux state
  const selectedRole = useSelector(selectSelectedRole);
  const showRoleSelection = useSelector(selectShowRoleSelection);

  // Handler with scrolling logic
  const handleRoleSelect = (role) => {
    dispatch(selectRole(role));
    
    // Smooth scroll to authentication section after element is rendered
    setTimeout(() => {
      if (authSectionRef?.current) {
        authSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        
        // Additional scroll up by 120px for better positioning
        setTimeout(() => {
          window.scrollBy({
            top: -120,
            behavior: 'smooth'
          });
        }, 100);
      }
    }, 600); // Wait longer for animation to complete
  };

  return (
    <RoleSelectionSection
      selectedRole={selectedRole}
      onRoleSelect={handleRoleSelect}
      showRoleSelection={showRoleSelection}
    />
  );
};

export default RoleSelectionSectionContainer;