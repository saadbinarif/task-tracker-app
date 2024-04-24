const tasks = [
    {
        _id: "1",
        title: "task 1",
        description: "working on Frontend",
        status: "in progress",
        progress: 40,
        dueDate: "2024-04-18T08:00:36.129Z",
        creator_id: "660147a6df8c79b985d52c43",
        subtasks: [
            {
            _id: '1',
            title: "1st subtask", 
            isComplete: false
            },
            {
            _id: "2",
            title: "2nd subtask", 
            isComplete: true
            }
        ],
        "tags":[
            {_id: "1", tag_name:"Work"}, 
            {_id: "2", tag_name:"sports"},
            {_id: "3", tag_name:"football"},
            {_id: "4", tag_name:"grocery"},

        ]
    }
    ,
    {
        _id: "2",
        title: "task 2",
        description: "Domestically, Manchester United have won a record 20 top-flight league titles, 12 FA Cups, 6 League Cups and a record 21 FA Community Shields. In international football, they have won the European Cup/UEFA Champions League three times, and the UEFA Europa League, the UEFA Cup Winners' Cup, the UEFA Super Cup, the Intercontinental Cup and the FIFA Club World Cup once each.[6][7] In 1968, under the management of Matt Busby, 10 years after eight of the club's players were killed in the Munich air disaster, they became the first English club to win the European Cup. Sir Alex Ferguson is the club's longest-serving and most successful manager, winning 38 trophies, including 13 league titles, five FA Cups, and two Champions League titles between 1986 and 2013.[8][9] In the 1998–99 season, under Ferguson, the club became the first in the history of English football to achieve the continental treble of the Premier League, FA Cup and UEFA Champions League.[10] In winning the UEFA Europa League under José Mourinho in 2016–17, they became one of five clubs to have won the original three main UEFA club competitions (the Champions League, Europa League and Cup Winners' Cup).",
        status: "completed",
        dueDate: "2024-04-18T08:00:36.129Z",
        progress: 30,
        creator_id: "660147a6df8c79b985d52c42",
        subtasks: [
            {
            _id: '1',
            title: "3rd subtask", 
            isComplete: false
            },
            {
            _id: "2",
            title: "4th subtask", 
            isComplete: true
            }
        ],
        "tags":[
            {_id: "1", tag_name:"Home"}, 
            {_id: "2", tag_name:"football"},
            {_id: "3", tag_name:"education"},
            {_id: "4", tag_name:"Office"},

        ]
    }
    ,
    {
        _id:"3",
        title: "task 3",
        description: "working on UI",
        status: "overdue",
        dueDate: "2024-04-18T08:00:36.129Z",
        progress: 50,
        creator_id: "660147a6df8c79b985d52c43",
        subtasks: [
            {
            _id: '1',
            title: "5th subtask", 
            isComplete: false
            },
            {
            _id: "2",
            title: "6th subtask", 
            isComplete: true
            }
        ],
        "tags":[
            {_id: "1", tag_name:"Work"}, 
            {_id: "2", tag_name:"sports"},
            {_id: "3", tag_name:"football"},
            {_id: "4", tag_name:"grocery"},

        ]
    },
            
            
]

export default tasks;