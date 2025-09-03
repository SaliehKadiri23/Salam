const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["article", "video", "podcast", "course"],
    trim: true,
  },
  duration: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  views: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  publishedDate: {
    type: Date,
    required: true,
  },
  estimatedTime: {
    type: Number,
    default: 0,
  },
  contentSections: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
    },
    media: [{
      id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      type: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
      alt: {
        type: String,
        trim: true,
      },
    }],
    order: {
      type: Number,
    },
  }],
  usefulResources: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    fileName: {
      type: String,
      trim: true,
    },
  }],
}, {
  timestamps: true,
});

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;