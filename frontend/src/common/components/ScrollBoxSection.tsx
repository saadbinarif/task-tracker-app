import React from "react";
import ScrollBox from "../ui/ScrollBox";
import tasks from "../../tasks";

const ScrollBoxSection:React.FC = ()=>{
    return(
    <div className="grid grid-cols-3 px-6 pb-11  gap-3">
                {/* overdue grid */}
                <div>
                    <div className="ps-4 pb-1 text-lg font-bold text-red-500">Overdue</div>
                    <ScrollBox
                scrollButtonColor='red-600'
                scrollBoxColor='red-400'
                createTaskOption={false}
                taskList={tasks}
            />
                </div>

                {/* today grid */}
                <div>
                    <div className="ps-4 pb-1 text-lg font-bold text-yellow-500">Today</div>
                    <ScrollBox
                scrollButtonColor='yellow-400'
                scrollBoxColor='yellow-600'
                taskList={tasks}
            />
                </div>

                {/* tommorow Grid */}
                <div>
                    <div className="ps-4 pb-1 text-lg font-bold text-blue-500">Tommorow</div>
                    <ScrollBox
                scrollButtonColor='blue-600'
                scrollBoxColor='blue-400'
                taskList={tasks}
            />
                </div>

            </div>
    

    );
}

export default ScrollBoxSection