import { useContext, useState } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";
import useAuthContext from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    title: "",
    reps: "",
    load: "",
  });

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useContext(WorkoutsContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const workout = formData;

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      console.log(json.emptyFields);
    }

    if (response.ok) {
      setError(null);
      setFormData({
        title: "",
        reps: "",
        load: "",
      });
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      console.log("new workout added", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <label>Exercise title</label>
      <input
        className={emptyFields.includes("title") ? "error" : ""}
        type="text"
        name="title"
        onChange={handleChange}
        value={formData.title}
      />
      <label>Load (in Kg):</label>
      <input
        className={emptyFields.includes("load") ? "error" : ""}
        type="number"
        name="load"
        onChange={handleChange}
        value={formData.load}
      />
      <label>Number of Reps:</label>
      <input
        className={emptyFields.includes("reps") ? "error" : ""}
        type="number"
        name="reps"
        onChange={handleChange}
        value={formData.reps}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
