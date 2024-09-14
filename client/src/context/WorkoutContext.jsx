import { createContext, useReducer } from "react";
import { INITIAL_STATE, workoutsReducer } from "../workoutsReducer";



export const WorkoutsContext = createContext();

const WorkoutsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReducer, INITIAL_STATE);

    return ( 
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
     );
}
 
export default WorkoutsContextProvider;