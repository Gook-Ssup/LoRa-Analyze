const mongoose = require("mongoose");

const singalSchema = new mongoose.Schema({
  gateway: {
    type: String,
    required: true,
  },
  sample_rate: Number,
  length: Number,
  time: Date,
  bin_num: Number,
  mag_max: Number,
  real: [Number],
  imag: [Number],
});

module.exports = mongoose.model('Signal', singalSchema);