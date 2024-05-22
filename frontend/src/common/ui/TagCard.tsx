import React, { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { fetchAllTasksRequest, removeTagRequest } from "../actions/taskActions";

interface TagCardProps{
    isEditable?: boolean;
    tag?: ITag;
    taskId?: string
}

const TagCard: React.FC<TagCardProps> = ({tag, taskId, isEditable=false}) => {
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch(fetchAllTasksRequest())
    // },[])

const handleDelete = (tagId:any)=>{
    dispatch(removeTagRequest(taskId, tagId))

}

    return (
        <div className="bg-[#e3e3e3] p-1 text-xs rounded-sm cursor-pointer hover:bg-[#c9c9c9]">
            <p className="p-0.5">{tag?.tag_name}
                <span className={`hover:bg-[#a3a2a2] rounded-sm ml-1 px-0.5 ${isEditable ? '' : 'hidden'}`}>
                    <CloseIcon sx={{ fontSize: 'small' }} onClick={()=>handleDelete(tag?._id)} />
                </span>
            </p>
        </div>

    )
}

export default TagCard