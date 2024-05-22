
import React, { useEffect, useState } from "react";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TagCard from "./TagCard";
import DisplayTask from "../components/DisplayTask";
import { useDispatch } from "react-redux";
import { fetchAllTasksRequest } from "../actions/taskActions";
import { format, isEqual, add, sub } from 'date-fns'



interface TaskCardProps {
    taskData: ITask

}

const TaskCard: React.FC<TaskCardProps> = ({ taskData }) => {
    console.log("taskcard======",taskData)

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        console.log('onHandleOpen', open)
    }
    const handleClose = () => {
        setOpen(false);
        console.log('onHandleClose', open)
    }

    // useEffect(() => {
    //     dispatch(fetchAllTasksRequest())
    // }, [open])

    let iconColor=''
    const formatDate = (date: any) => {
        const currentDate = format(new Date(), 'yyyy/MM/dd')
        const dueDate = format(new Date(date), 'yyyy/MM/dd')
        // console.log('duedate!!!!!', dueDate)
        const tomorrow = add(new Date(currentDate), { days: 1 })
        //   const tomorrow= format(new Date(tomorrowf), 'dd/MM/yyyy')
        // console.log('tomorrow#######', tomorrow)
        const yesterday = sub(currentDate, { days: 1 })
        //   const yesterday= format(new Date(yesterdayf), 'dd/MM/yyyy')
        const nullDate = format(new Date(1970, 0, 1), 'yyyy/MM/dd')
        // console.log('nullDate', nullDate)

        if (isEqual(dueDate, currentDate)) {
            iconColor = 'text-yellow-600'
            return 'Today'
        
        }
        else if (isEqual(tomorrow, dueDate)) {
            iconColor = 'text-green-600'
            return 'Tommorow'
        }
        else if (isEqual(dueDate, yesterday)) {
            iconColor = 'text-red-500'
            return 'Yesterday'
        }
        else if(dueDate === nullDate ){
            return 'not set'
        }
        else {
            iconColor = 'text-green-600'
            return format(new Date(date), 'dd MMMM yyyy')
        }

    }
    const dueDate = formatDate(taskData?.dueDate)
    //   const displayDate = (
    //     if(isEqual(currentDate, dueDate)){

    //     }
    // )
    //   console.log('curentdate##########', currentDate)
    // console.log('dueDate:', dueDate)

    return (
        <>
            <div className="bg-white shadow-lg min-w-60 p-4 rounded-xl mb-4" onClick={handleOpen} key={taskData._id}>
                <p className="font-semibold text-xl">{taskData.title}</p>

                <p className="font-light text-sm truncate-3-lines">{taskData.description}</p>
                <div className="flex gap-2 p-1">
                    {
                        taskData.tags.map((tag) => (
                            <TagCard
                                key={tag._id}
                                tag={tag}
                            />
                        ))
                    }
                </div>
                <div className="p-2">
                    <hr />
                </div>
                <div className="text-[#999999] text-xs">
                    <p className="mb-1">Status: <span className={`${taskData.status === 'completed' ? 'text-primary':
                taskData.status  === 'in progress'?'text-yellow-400': 'text-red-700'}`}>{taskData.status}</span></p>
                    <p className={`mb-1  `}>
                        Due date: <span className={`text-black`}>
                            <CalendarTodayIcon sx={{ fontSize: "14px", mr: '4px' }} className={`${iconColor}`}/>
                            {dueDate}
                        </span>
                    </p>
                    <p>Progress: <span className="text-black">{taskData.progress}%</span></p>
                </div>

            </div>

            <DisplayTask isOpen={open} onClose={handleClose} taskData={taskData} />
        </>


    )

}

export default TaskCard