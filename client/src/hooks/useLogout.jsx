import { useContext } from "react";
import useAuthContext from "./useAuthContext";
import { WorkoutsContext } from "../context/WorkoutContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const {dispatch: workoutsDispatch} = useContext(WorkoutsContext);
  const logout = () => {
    // remove user from localstorage
    localStorage.clear("user");

    // update the state
    dispatch({ type: "LOGOUT" });

    // updating workout state
    workoutsDispatch({type: "SET_WORKOUTS", payload: null})
  };
  return {logout};
};

export default useLogout;
