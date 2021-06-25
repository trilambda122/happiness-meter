const mongoose = require('mongoose');

const happySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: { type: Date, required: true },
  happyScore: { type: Number, required: true },
  sleepHours: { type: Number, required: true },
  exercise: { type: Boolean, required: true },
  kindness: { type: Boolean, required: true },
  exerciseLevel: String,
  kindnessNote: String,
  gratitudeNote: String,
});

module.exports = mongoose.model('Happy', happySchema);
