const mongoose = require("mongoose");
const validator = require("validator")
const newsSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, "Heading is required"],
    minlength: [10, "Heading must be at least 10 characters long"],
    unique: false, 
    validate: {
      validator: function (value) {
        return /^[A-Za-z\s\-.]+$/.test(value);
      },
      message: "Heading should contain only letters, spaces, hyphens, or periods",
    },
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [50, "Description must be at least 3 characters long"],
    unique: false, 
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    validate: {
        validator: function (value) {
          return /^[A-Za-z\s]+$/.test(value);
        },
        message: "Country should contain only letters or spaces",
      },
  },
  city: {
    type: String,
    required: [true, "City is required"],
    validate: {
        validator: function (value) {
          return /^[A-Za-z\s]+$/.test(value);
        },
        message: "City should contain only letters or spaces",
      },
  },
  tags: {
    type: [String],
    required: [true, "Tags are required"],
    set: function(value) {
      return value.split(',').map(tag => tag.trim());
    },
    validate: {
      validator: function(value) {
        return value.every(tag => /^[A-Za-z\s]+$/.test(tag));
      },
      message: "Each tag should contain only letters and spaces",
    },
  },
  
  category: {
    type: String,
    required: [true, "City is required"],
    validate: {
        validator: function (value) {
          return /^[A-Za-z\s]+$/.test(value);
        },
        message: "Category should contain only letters or spaces",
      },
  },
  image: {
    
      type: String,
      required: [true, "Image URL is required"],
      validate: {
        validator: function(value) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))(\?.*)?$/i.test(value);
        },
        message: "Please provide a valid image URL",
     
    },
}
});
const News = mongoose.model("News", newsSchema);
module.exports = News;
