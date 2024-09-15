import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";
// date dns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import useAuthContext from "../hooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useContext(WorkoutsContext);
  const { user } = useAuthContext();

  const handleClick = async () => {
    const response = await fetch(`https://workout-buddy-backend-6l0x.onrender.com/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data._id });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick}>
        <i className="fa fa-trash" aria-hidden="true"></i>
      </span>
    </div>
  );
};

export default WorkoutDetails;
