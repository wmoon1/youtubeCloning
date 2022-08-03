"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 80
  },
  fileUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 20
  },
  createdAt: {
    type: Date,
    required: true,
    "default": Date.now
  },
  hashtags: [{
    type: String,
    trim: true
  }],
  meta: {
    views: {
      type: Number,
      "default": 0,
      required: true
    },
    rating: {
      type: Number,
      "default": 0,
      required: true
    }
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    requried: true,
    ref: "Comment"
  }],
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});
videoSchema["static"]("formatHashtags", function (hashtags) {
  return hashtags.split(",").map(function (word) {
    return word.startsWith('#') ? word : "#".concat(word);
  });
});

var movieModel = _mongoose["default"].model("Video", videoSchema);

var _default = movieModel;
exports["default"] = _default;