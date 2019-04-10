const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

FileSchema.virtual('url').get(function virtual() {
  return `http://localhost:3001/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('File', FileSchema);
