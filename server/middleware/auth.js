const User = require('../models/user');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() && req.user) {
    return next();
  }
  
  return res.status(401).json({ 
    success: false, 
    message: 'Access denied. Please log in to continue.' 
  });
};

// Middleware to check if user is authenticated and get user info
const authenticateUser = async (req, res, next) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. Please log in to continue.' 
    });
  }
  
  // Attach the user object to the request for later use
  req.userDoc = req.user;
  next();
};

// Middleware to check user role
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Please log in to continue.' 
      });
    }
    
    const userRole = req.user.profileInfo.role;
    
    // Convert roles to array if it's a single string
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    // Check if user's role is in the allowed roles array
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. You do not have permission to perform this action.' 
      });
    }
    
    next();
  };
};

// Middleware to check if user is admin (chief-imam)
const isAdmin = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. Please log in to continue.' 
    });
  }
  
  const userRole = req.user.profileInfo.role;
  
  if (userRole !== 'chief-imam') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Only administrators can perform this action.' 
    });
  }
  
  next();
};

// Middleware to check if user is imam or admin
const isImamOrAdmin = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. Please log in to continue.' 
    });
  }
  
  const userRole = req.user.profileInfo.role;
  
  if (userRole !== 'imam' && userRole !== 'chief-imam') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Only imams or administrators can perform this action.' 
    });
  }
  
  next();
};

// Middleware to check if user owns a resource or is admin
const isOwnerOrAdmin = (model, idField = 'author') => {
  return async (req, res, next) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Please log in to continue.' 
      });
    }
    
    const resourceId = req.params.id || req.params.id;
    const userId = req.user._id;
    const userRole = req.user.profileInfo.role;
    
    try {
      // Check if user is admin (chief-imam) - they can access anything
      if (userRole === 'chief-imam') {
        return next();
      }
      
      // Find the resource
      const resource = await model.findById(resourceId);
      if (!resource) {
        return res.status(404).json({ 
          success: false, 
          message: 'Resource not found.' 
        });
      }
      
      // Check if user is the owner of the resource
      if (resource[idField] && resource[idField].toString() === userId.toString()) {
        return next();
      }
      
      // Check if user is imam and trying to edit a resource that was asked by someone else
      // For example, in Q&A, imams can answer questions
      if (userRole === 'imam' && model.modelName === 'QuestionAndAnswer') {
        // Imams can answer questions, but can't edit questions asked by other users
        // unless they're adding/updating an answer
        if (req.method === 'PATCH' && req.body.answer !== undefined) {
          return next();
        }
      }
      
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. You do not have permission to access this resource.' 
      });
    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'An error occurred while checking permissions.' 
      });
    }
  };
};

// Middleware to check if user can edit their own account or is admin
const isOwnProfileOrAdmin = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. Please log in to continue.' 
    });
  }
  
  const userIdFromRoute = req.params.id;
  const currentUserId = req.user._id;
  const userRole = req.user.profileInfo.role;
  
  // Check if user is admin (chief-imam) or if they're editing their own profile
  if (userRole === 'chief-imam' || currentUserId.toString() === userIdFromRoute) {
    return next();
  }
  
  return res.status(403).json({ 
    success: false, 
    message: 'Access denied. You can only edit your own profile.' 
  });
};

module.exports = {
  isAuthenticated,
  authenticateUser,
  checkRole,
  isAdmin,
  isImamOrAdmin,
  isOwnerOrAdmin,
  isOwnProfileOrAdmin
};