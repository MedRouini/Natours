const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModels');
const ReviewModel = require('../../models/reviewModel');
const UserModel = require('../../models/userModel');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Db connection succesfull');
  });
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
// );

//Import data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    // await UserModel.create(users, { validateBeforeSave: false });
    // await ReviewModel.create(reviews);
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    // await UserModel.deleteMany();
    // await ReviewModel.deleteMany();
    console.log('Data deleted succesfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
