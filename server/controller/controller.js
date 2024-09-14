const Workout = require("../models/workoutModels");
const mongoose = require("mongoose");

// get all workouts
async function getWorkouts(req, res) {
  try {
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({ createdAt: -1 });
    return res.status(200).json(workouts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// post a workout
async function postWorkouts(req, res) {
  
  const { title, reps, load } = req.body;
  let emptyFields = [];
  if(!title) {
    emptyFields.push("title")
  }
  if(!reps) {
    emptyFields.push("reps")
  }
  if(!load) {
    emptyFields.push("load")
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: "Please fill in all the fields", emptyFields})
  }

  try {
    const user_id = req.user._id
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
    emptyFields = [];
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// get a particular workout
async function getWorkout(req, res) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" })
  }
  res.status(200).json(workout);
}

// update an existing workout
async function patchWorkout(req, res) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findByIdAndUpdate(id, {
    ...req.body
  })
  if (!workout) {
    return res.status(404).json({ error: "No such workout" })
  }
  res.status(200).json({ workout })
}

// delete a workout
async function deleteWorkout(req, res) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findByIdAndDelete(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" })
  }
  res.status(200).json(workout);
}

module.exports = {
  getWorkouts,
  postWorkouts,
  getWorkout,
  patchWorkout,
  deleteWorkout,
};
