import React, { useRef, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import TaskList from '../components/TaskList';


const ScrollBox:React.FC = ()=>{
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
    return(
        <div>
                    <div className="ps-4 pb-1 text-lg font-bold text-red-500">Overdue</div>
                    <div>
                        <div className="bg-red-400 border-b border-black shadow-lg rounded-t-lg p-1 text-center"><p onClick={handleScrollUp}><KeyboardArrowUpIcon /></p></div>
                        <div id="scrolldiv" ref={scrollDivRef} className="bg-red-600 shadow-lg p-2 overflow-hidden h-[30rem]">
                            {/* <div className="p-2">
                                <CreateTask />
                            </div> */}
                            {/* TaskList component here */}
                            <TaskList taskList={} />
                        </div>
                        <div className="bg-red-400 border-t border-black shadow-lg rounded-b-lg  p-1 text-center"><p onClick={handleScrollDown}><KeyboardArrowDownIcon /></p></div>
                    </div>
                </div>

    );
}

export default ScrollBox