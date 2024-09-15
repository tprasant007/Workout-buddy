import { useState } from "react";
import useAuthContext from "./UseAuthContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("https://workout-buddy-backend-6l0x.onrender.com/api/user/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);

      // update state
      dispatch({ type: "LOGIN", payload: json });

      // save to a localstorage
      localStorage.setItem("user", JSON.stringify(json));
    }
  };
  return { error, isLoading, login };
};

export default useLogin;
