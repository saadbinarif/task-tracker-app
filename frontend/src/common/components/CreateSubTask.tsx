import React, { useState, ChangeEvent, useEffect, useRef } from 'react'
import PlainTextInput from "../ui/PlainTextInput";
import ButtonPrimary from "../ui/ButtonPrimary";    
import ButtonSecondary from "../ui/ButtonSecondary";

const CreateSubTask: React.FC = () => {
    const [editMode, setEditMode] = useState(false)
    return (
        <>  
        {
            editMode ? 
            (
            <div className={"border border-black rounded-xl py-1 px-2"}>
                <PlainTextInput placeHolderProp="Title" fontSizeProp="xl" />

                <div className="container p-2 text-right">
                    <span className="mr-1">
                        <ButtonSecondary paddingProp={2} onClickProp={() => setEditMode(false)}>Cancel</ButtonSecondary>
                    </span>
                    <ButtonPrimary paddingProp={2}>Save</ButtonPrimary>
                </div> 
            </div>
            ) :
            (
                <p onClick={()=>setEditMode(true)}>+ Add Subtask</p>
            )
        }        
        </>
    )

}

export default CreateSubTask;