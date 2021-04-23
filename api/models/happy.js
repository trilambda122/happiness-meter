const mongoose = require('mongoose');

const happySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: Date,
  happyScore: Number,
  sleepHours: Number,
  exercise: Boolean,
  kindness: Boolean,
  exerciseLevel: String,
  kindnessNote: String,
  gratitudeNote: String,
});

module.exports = mongoose.model('Happy', happySchema);
