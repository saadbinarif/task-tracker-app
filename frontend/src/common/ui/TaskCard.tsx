
import React from "react";

const TaskCard:React.FC = ()=>{
    return (
        <>
        <div className="bg-white w-3/5 min-w-60 p-4">
            <p className="font-semibold text-xl">Title</p>
            <p className="font-light text-sm truncate-3-lines">Domestically, Manchester United have won a record 20 top-flight league titles, 12 FA Cups, 6 League Cups and a record 21 FA Community Shields. In international football, they have won the European Cup/UEFA Champions League three times, and the UEFA Europa League, the UEFA Cup Winners' Cup, the UEFA Super Cup, the Intercontinental Cup and the FIFA Club World Cup once each.[6][7] In 1968, under the management of Matt Busby, 10 years after eight of the club's players were killed in the Munich air disaster, they became the first English club to win the European Cup. Sir Alex Ferguson is the club's longest-serving and most successful manager, winning 38 trophies, including 13 league titles, five FA Cups, and two Champions League titles between 1986 and 2013.[8][9] In the 1998–99 season, under Ferguson, the club became the first in the history of English football to achieve the continental treble of the Premier League, FA Cup and UEFA Champions League.[10] In winning the UEFA Europa League under José Mourinho in 2016–17, they became one of five clubs to have won the original three main UEFA club competitions (the Champions League, Europa League and Cup Winners' Cup).</p>
            <div className="p-2">
            <hr />
            </div>
            <div className="text-[#9ca3af] text-xs">
                <p>Status</p>
                <p>Due date</p>
                <p>Progress</p>
            </div>
        </div>
        </>

        
    )

}

export default TaskCard