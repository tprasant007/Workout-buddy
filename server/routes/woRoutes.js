const express = require("express");

const requireAuth = require("../middleware/requireAuth");

const {
  getWorkouts,
  postWorkouts,
  getWorkout,
  patchWorkout,
  deleteWorkout,
} = require("../controller/controller");

const router = express.Router();

// use middleware to protect routes
router.use(requireAuth);

router.route("/").get(getWorkouts).post(postWorkouts);
router.route("/:id").get(getWorkout).patch(patchWorkout).delete(deleteWorkout);

module.exports = router;
