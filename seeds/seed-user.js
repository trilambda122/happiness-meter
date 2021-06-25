const mongoose = require('mongoose');
const faker = require('faker');
const Happy = require('../api/models/happy')
require('dotenv').config();


function getRandomBoolean() {
    return Math.random() < 0.5;
  }

  function getExerciseLevel(){
    const number = Math.floor(Math.random() * (1 + 3 - 1)) + 1
    switch(true){
        case (number <= 1):
            return 'low'
        case (number <=2):
            return 'med'
        case (number >=3):
            return 'high'
        default:
            return "none"
    }
  }
mongoose
  .connect('mongodb+srv://trilambda122:' +
  process.env.MONGO_DB_PW +
  '@cluster0.jlxfk.mongodb.net/happiness?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('CONNECTED TO MONGO DATABASE');
  })
  .catch((err) => {
    console.log(err);
  });

  const Happies = [...Array(100)].map((happy) => ({
    _id: new mongoose.Types.ObjectId(),
    date: Date.now(),
    happyScore: Math.floor(Math.random() * (1 + 5 - 1)) + 1,
    sleepHours: Math.floor(Math.random() * (1 + 15 - 1)) + 1,
    exercise: getRandomBoolean(),
    kindness: getRandomBoolean(),
    exerciseLevel: getExerciseLevel(),
    kindnessNote: faker.lorem.sentence(),
    gratitudeNote: faker.lorem.sentence()
  }));
  
  Happies.forEach((happy) => {
    const newHappy = new Happy({ ...happy })
      .save()
      .then((happy) => {
        console.log('--------------RECORDED INSERTED------------');
        console.log(happy);
      })
      .catch((err) => {
        console.log(err);
      });
  });