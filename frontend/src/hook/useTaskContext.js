import { taskContext } from "../context/taskContext";
import { useContext } from "react";

export const useTaskContext = ()=>{
    const context = useContext(taskContext);

    if(!context){
        throw Error("UseTaskContext, must be used inside a useTaskContextProvider")
    }

    return context
}