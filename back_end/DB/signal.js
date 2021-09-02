const mongoose = require("mongoose");

const singalSchema = new mongoose.Schema({
  gateway: {
    type: String,
    required: true,
  },
  sample_rate: Number,
  length: Number,
  time: Date,
  real: [Number],
  imag: [Number],
});

module.exports = mongoose.model('Signal', singalSchema);