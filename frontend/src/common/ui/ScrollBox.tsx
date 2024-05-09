import React, { useRef, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';

interface ScrollBoxProps {
    scrollButtonColor?: string,
    scrollBoxColor?: string,
    createTaskOption?: Boolean
    taskList?:any
}

const ScrollBox: React.FC<ScrollBoxProps> = ({scrollBoxColor, scrollButtonColor, taskList, createTaskOption = true}) => {

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
    return (

        <div>
            <div className={`bg-${scrollButtonColor} border-b border-black shadow-lg rounded-t-lg p-1 text-center`}><p onClick={handleScrollUp}><KeyboardArrowUpIcon /></p></div>
            <div id="scrolldiv" ref={scrollDivRef} className={`bg-${scrollBoxColor} shadow-lg p-2 overflow-hidden h-[30rem]`}>
                {
                   createTaskOption && <div className="p-2">
                        <CreateTask />
                    </div>
                }
                {/* TaskList component here */}
                <TaskList taskList={taskList} />
            </div>
            <div className={`bg-${scrollButtonColor} border-t border-black shadow-lg rounded-b-lg  p-1 text-center`}><p onClick={handleScrollDown}><KeyboardArrowDownIcon /></p></div>
        </div>


    );
}

export default ScrollBox