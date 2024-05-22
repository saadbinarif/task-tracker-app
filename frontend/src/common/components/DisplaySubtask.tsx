import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { deleteSubtaskRequest, fetchAllTasksRequest, updateSubtaskRequest } from "../actions/taskActions";


interface DisplaySubtaskProps {
    taskData: ITask,
}

const DisplaySubtask: React.FC<DisplaySubtaskProps> = ({taskData})=>{

    const dispatch = useDispatch();

    const handleCheckboxChange = (e:any, taskId:any, subtaskId:any )=>{

        const isComplete = e.target.checked;
    
        dispatch(updateSubtaskRequest(taskId, subtaskId, {isComplete}))
        
        // dispatch(fetchAllTasksRequest())
        // dispatch(fetchAllTasksRequest())
        
      
      }

    const handleDeleteSubtask = (taskId: string, subtaskId: string)=>{

        dispatch(deleteSubtaskRequest(taskId, subtaskId));
        // dispatch({ type: TaskActions.DELETE_SUBTASK_REQUEST, payload: {taskId:taskData._id, subtaskId:subtaskId} })
        // dispatch(fetchAllTasksRequest())
        // dispatch(fetchAllTasksRequest())
     
      }

    return(
        <>
        {
            taskData?.subtasks?.map((sTask: any) => (
              <>
                <div id="outer" className="container relative flex items-center" key={sTask._id}>
                  <input 
                  type="checkbox" 
                  className="w-4 h-4 bg-green-400  border-green-400 rounded-full focus:ring-green-500 " 
                  checked={sTask.isComplete ? true : false} 
                  onChange={(e) => handleCheckboxChange(e, taskData._id, sTask._id)}
                  />
                  <label className="ms-2 text-sm font-medium ">{sTask.title}</label>
                  <div id='inner' className=" bg-white drop-shadow-md shadow-inner absolute ms-14 left-[82%] hidden" onClick = {()=>handleDeleteSubtask(taskData?._id, sTask?._id)}>
                    <DeleteIcon className="text-red-600"/>

                  </div>
                </div>
                <hr className="my-2" />
              </>
            ))

          }
        </>
    );

}

export default DisplaySubtask