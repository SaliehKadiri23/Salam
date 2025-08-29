const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
  profileInfo: {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
      minLength: 3,
      maxLength: 20,
      default: "",
    },
    role: {
      type: String,
      required: true,
      enum: ["community", "imam", "chief-imam"],
    },
    selectedLanguage: {
      type: String,
      default: "en",
      enum: ["en", "ar", "ur", "fr"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 40,
    },
    phone: {
      type: String,
      required: false,
      minLength: 5,
      maxLength: 17,
    },
    joinDate: {
      type: Date,
      required: true,
    },
    lastLogin: {
      type: Date,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    digitalTasbih: {
      type: Number,
      default: 0,
      min: 0,
    },
    isPrayerAlertsEnabled: {
      type: Boolean,
      default: false,
    },
    isAdhanAudioEnabled: {
      type: Boolean,
      default: false,
    },
    isSubscribedToNewsLetter: {
      type: Boolean,
      default: false,
    },
  },

  registeredEvents: {
    type: [ObjectId],
    default: [],
    ref: "Event",
  },

  roleSpecificData: {
    mosque: {
      type: String,
      trim: true,
    },
    certification: {
      type: String,
      trim: true,
    },
    experience: {
      type: Number,
      min: [0, "Years of experience must be greater than 0"],
      max: [150, "Years of experience can not be more than 150"],
    },
    specialization: {
      type: String,
      trim: true,
    },
    references: {
      type: String,
      trim: true,
    },
    adminExperience: {
      type: String,
      trim: true,
    },
  },

  userProgress: {
    bookmarkedItems: {
      resources: {
        type: [ObjectId],
        default: [],
        ref: "Resource"
      },
      articles: {
        type: [ObjectId],
        default: [],
        ref: "Article"
      },
    },
    completedItems: {
      resources: {
        type: [ObjectId],
        default: [],
        ref: "Resource"
      },
    },
    progressItems: {
      resources: {
        // e.g
        // 3: 45,
        // 4: 78,
        type: [Object], // Array of Objects
        default: [],
      },
    },
  },
});

// Get Full Name Virtual function below

let User = mongoose.model("User", userSchema);
module.exports = User;
