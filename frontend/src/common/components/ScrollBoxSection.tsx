import React from "react";
import ScrollBox from "../ui/ScrollBox";
import task from "../../tasks";
import { useDispatch, useSelector } from "react-redux";
import {format, isEqual, add, sub } from 'date-fns'

const ScrollBoxSection: React.FC = () => {

    const backendTasks = useSelector((state: any) => state.tasks.tasks)
    const tomorrowTasks = backendTasks.filter(
        (t: any) => {        
            console.log(t.dueDate)  
            const formatDueDate = format(new Date(t.dueDate), 'yyyy/MM/dd')
            console.log('formDate-+-=-=-=', formatDueDate)
            const tommorowDate = add(new Date(), {days:1})
            const tommorow = format(tommorowDate, 'yyyy/MM/dd')
            console.log('tom=-+_+_+_', tommorow)
            const dueDate = isEqual(formatDueDate, tommorow)
            console.log('dueDate=-+_+_+_', dueDate)
            return formatDueDate == tommorow
        }
    )

    const overdueTasks = backendTasks.filter(
        (t: any) => {        
            console.log(t.dueDate)  
            const formatDueDate = format(new Date(t.dueDate), 'yyyy/MM/dd')
            console.log('formDate-+-=-=-=', formatDueDate)
            const yesterdayDate = sub(new Date(), {days:1})
            const yesterday = format(yesterdayDate, 'yyyy/MM/dd')
            console.log('tom=-+_+_+_', yesterday)
            const dueDate = isEqual(formatDueDate, yesterday)
            console.log('dueDate=-+_+_+_', dueDate)
            return formatDueDate == yesterday
        }
    )

    const todayTasks = backendTasks.filter(
        (t:any)=>{
            const formatDueDate = format(new Date(t.dueDate), 'yyyy/MM/dd')
            const today = format(new Date(), 'yyyy/MM/dd')
            return formatDueDate == today
        }
    )
    console.log('today Tasks.....', todayTasks)
    const dispatch = useDispatch()

    //current date to pass to createTask for today section
    const todayDate = new Date()
    const tommorowDate = add(todayDate, {days:1})

    return (
        <div className="grid grid-cols-3 px-6 pb-11  gap-3">
            {/* overdue grid */}
            <div>
                <div className="ps-4 pb-1 text-lg font-bold text-red-500">Overdue</div>
                <ScrollBox
                    scrollButtonColor='bg-red-600'
                    scrollBoxColor='bg-red-400'
                    createTaskOption={false}
                    taskList={overdueTasks}
                />
            </div>

            {/* today grid */}
            <div>
                <div className="ps-4 pb-1 text-lg font-bold text-yellow-500">Today</div>
                <ScrollBox
                    scrollButtonColor='bg-yellow-400'
                    scrollBoxColor='bg-yellow-600'
                    taskList={todayTasks}
                    dateValue={todayDate}
                />
            </div>

            {/* tommorow Grid */}
            <div>
                <div className="ps-4 pb-1 text-lg font-bold text-blue-500">Tommorow</div>
                <ScrollBox
                    scrollButtonColor='bg-blue-600'
                    scrollBoxColor='bg-blue-400'
                    taskList={tomorrowTasks}
                    dateValue={tommorowDate}
                />
            </div>

        </div>


    );
}

export default ScrollBoxSection