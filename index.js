const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = {
  email: String,
  query: String,
};

//create a new URL Schema
const ExerciseIdLog = new mongoose.Schema({
  username: { type: String, required: true },
  _id: { type: String, required: true },
});

const ExerciseId = mongoose.model("ExerciseId", ExerciseIdLog);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

function generateRandomString(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}

app.post("/api/users", async function (req, res) {
  const userid = generateRandomString(10);
  res.json({
    username: req.body.username,
    _id: userid,
  });
  const ExerciseIdDoc = new ExerciseId({
    username: req.body.username,
    _id: userid,
  });
  await ExerciseIdDoc.save();
});

app.post("/api/users/:_id/exercises", async function (req, res) {
  const _id = req.params._id;
  const username = await ExerciseId.findById;
  const exercise = {
    _id: _id,
    username: username,
    date: req.body.date,
    duration: req.body.duration,
    description: req.body.description,
  };
  res.json({
    ...exercise,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
