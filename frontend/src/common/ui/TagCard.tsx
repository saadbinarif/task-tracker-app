import React from "react";
import CloseIcon from '@mui/icons-material/Close';

interface TagCardProps{
    isEditable?: boolean;
    tag?: ITag;
    taskId?: string
}

const TagCard: React.FC<TagCardProps> = ({tag, isEditable=false}) => {
    return (
        <div className="bg-[#e3e3e3] p-1 text-xs rounded-sm cursor-pointer hover:bg-[#c9c9c9]">
            <p className="p-0.5">{tag?.tag_name}
                <span className={`hover:bg-[#a3a2a2] rounded-sm ml-1 px-0.5 ${isEditable ? '' : 'hidden'}`}>
                    <CloseIcon sx={{ fontSize: 'small' }} />
                </span>
            </p>
        </div>

    )
}

export default TagCard