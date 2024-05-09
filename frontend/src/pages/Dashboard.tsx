import React, { useEffect, useRef, useState } from "react";
import Header from "../common/components/Header";
// import TaskCard from "../common/ui/TaskCard";
import TaskList from "../common/components/TaskList"
import tasks from "../tasks";
import CreateTask from "../common/components/CreateTask";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasksRequest } from "../common/actions/taskActions";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';






const Dashboard: React.FC = () => {

    const [scrollTop, setScrollTop] = useState(0);
    const scrollDivRef = useRef<HTMLDivElement>(null);

    const handleScrollUp = () => {
        if (scrollDivRef.current) {
            const scrollHeight = scrollDivRef.current.scrollHeight;
            setScrollTop(prevScrollTop => Math.max(prevScrollTop - 100, 0));
            scrollDivRef.current.scrollTop -= 100;
        }
    };

    const handleScrollDown = () => {
        if (scrollDivRef.current) {
            const scrollHeight = scrollDivRef.current.scrollHeight;
            setScrollTop(prevScrollTop => Math.min(prevScrollTop + 100, scrollHeight));
            scrollDivRef.current.scrollTop += 100;
        }
    };

    const backendtasks = useSelector((state: any) => state.tasks.tasks)
    const pendingTasks = backendtasks.filter((t: any) => t.status == "in progress")
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllTasksRequest())

    }, [])





    const statsBoxStyles = "bg-primary rounded-sm p-6 text-white text-center min-w-60"
    const statsBoxNumber = "text-6xl mb-4"


    return (
        <div>
            <Header title="Dashboard" />

            <div className="grid grid-cols-3 justify-items-center p-20 ">
                <div className={statsBoxStyles}>
                    <h1 className={statsBoxNumber}>{backendtasks.length}</h1>
                    <p>Total</p>
                </div>
                <div className={statsBoxStyles}>
                    <h2 className={statsBoxNumber}>0</h2>
                    <p>Completed</p>
                </div>
                <div className={statsBoxStyles}>
                    <h2 className={statsBoxNumber}>{pendingTasks.length}</h2>
                    <p>Pending</p>
                </div>

            </div>

            <div className="grid grid-cols-3 px-6 pb-11  gap-3">
                {/* overdue grid */}
                <div>
                    <div className="ps-4 pb-1 text-lg font-bold text-red-500">Overdue</div>
                    <div>
                        <div className="bg-red-400 border-b border-black shadow-lg rounded-t-lg p-1 text-center"><p onClick={handleScrollUp}><KeyboardArrowUpIcon /></p></div>
                        <div id="scrolldiv" ref={scrollDivRef} className="bg-red-600 shadow-lg p-2 overflow-hidden h-[30rem]">
                            {/* <div className="p-2">
                                <CreateTask />
                            </div> */}
                            {/* TaskList component here */}
                            <TaskList taskList={tasks} />
                        </div>
                        <div className="bg-red-400 border-t border-black shadow-lg rounded-b-lg  p-1 text-center"><p onClick={handleScrollDown}><KeyboardArrowDownIcon /></p></div>
                    </div>
                </div>

                {/* today grid */}
                <div>
                    <div className="ps-4 pb-1 text-lg font-bold text-yellow-500">Today</div>
                    <div>
                        <div className="bg-yellow-400 border-b border-black shadow-lg rounded-t-lg p-1 text-center"><p onClick={handleScrollUp}><KeyboardArrowUpIcon /></p></div>
                        <div id="scrolldiv" ref={scrollDivRef} className="bg-yellow-600 shadow-lg p-2 overflow-hidden h-[30rem]">
                            <div className="p-2">
                                <CreateTask />
                            </div>
                            {/* TaskList component here */}
                            <TaskList taskList={tasks} />
                        </div>
                        <div className="bg-yellow-400 border-t border-black shadow-lg rounded-b-lg  p-1 text-center"><p onClick={handleScrollDown}><KeyboardArrowDownIcon /></p></div>
                    </div>
                </div>

                {/* tommorow Grid */}
                <div>
                    <div className="ps-4 pb-1 text-lg font-bold text-blue-500">Tommorow</div>
                    <div>
                        <div className="bg-blue-400 border-b border-black shadow-lg rounded-t-lg p-1 text-center"><p onClick={handleScrollUp}><KeyboardArrowUpIcon /></p></div>
                        <div id="scrolldiv" ref={scrollDivRef} className="bg-blue-600 shadow-lg p-2 overflow-hidden h-[30rem]">
                            <div className="p-2">
                                <CreateTask />
                            </div>
                            {/* TaskList component here */}
                            <TaskList taskList={tasks} />
                        </div>
                        <div className="bg-blue-400 border-t border-black shadow-lg rounded-b-lg  p-1 text-center"><p onClick={handleScrollDown}><KeyboardArrowDownIcon /></p></div>
                    </div>
                </div>

            </div>

            {/* <div className="p-10">
                <div className="w-3/5">
                    <TaskList taskList={backendtasks} />
                </div>
                <div className="p-2 border-t border-black-500">
                    <CreateTask />
                </div>
            </div> */}



        </div>
    )
}

export default Dashboard