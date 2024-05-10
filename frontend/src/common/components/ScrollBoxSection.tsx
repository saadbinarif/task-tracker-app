import React from "react";
import ScrollBox from "../ui/ScrollBox";
import task from "../../tasks";
import { useDispatch, useSelector } from "react-redux";
import {format, isEqual, add } from 'date-fns'

const ScrollBoxSection: React.FC = () => {
    const backendTasks = useSelector((state: any) => state.tasks.tasks)
    const tomorrowTasks = backendTasks.filter(
        (t: any) => {          
            const formatDueDate = format(new Date(t.dueDate), 'yyyy/MM/dd')
            console.log('formDate-+-=-=-=', formatDueDate)
            const tommorow = add(formatDueDate, {days:1})
            console.log('tom=-+_+_+_', tommorow)
            const dueDate = isEqual(formatDueDate, tommorow)
            console.log('dueDate=-+_+_+_', dueDate)
            return t.dueDate == dueDate
        }
    )
    console.log('Tomorrow Tasks.....', tomorrowTasks)
    const dispatch = useDispatch()

    return (
        <div className="grid grid-cols-3 px-6 pb-11  gap-3">
            {/* overdue grid */}
            <div>
                <div className="ps-4 pb-1 text-lg font-bold text-red-500">Overdue</div>
                <ScrollBox
                    scrollButtonColor='bg-red-600'
                    scrollBoxColor='bg-red-400'
                    createTaskOption={false}
                    taskList={task}
                />
            </div>

            {/* today grid */}
            <div>
                <div className="ps-4 pb-1 text-lg font-bold text-yellow-500">Today</div>
                <ScrollBox
                    scrollButtonColor='bg-yellow-400'
                    scrollBoxColor='bg-yellow-600'
                    taskList={task}
                />
            </div>

            {/* tommorow Grid */}
            <div>
                <div className="ps-4 pb-1 text-lg font-bold text-blue-500">Tommorow</div>
                <ScrollBox
                    scrollButtonColor='bg-blue-600'
                    scrollBoxColor='bg-blue-400'
                    taskList={task}
                />
            </div>

        </div>


    );
}

export default ScrollBoxSection