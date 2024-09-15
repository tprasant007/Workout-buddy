import { useState } from "react";
import useAuthContext from "./UseAuthContext";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-type": "https://workout-buddy-backend-6l0x.onrender.com/application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (response.ok) {
      setError(null);
      setIsLoading(false);
      // save the user to localstorage
      localStorage.setItem("user", JSON.stringify(json));

      // updating state
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return { error, isLoading, signup };
};

export default useSignup;
