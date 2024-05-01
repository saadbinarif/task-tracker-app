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

                            <div className="container p-2 text-right border-t border-black">
                                <span className="mr-1">
                                    <ButtonSecondary paddingProp={2} onClickProp={() => setEditMode(false)}>Cancel</ButtonSecondary>
                                </span>
                                <ButtonPrimary paddingProp={2}>Save</ButtonPrimary>
                            </div>
                        </div>
                    ) :
                    (
                        <p className='text-sm font-medium cursor-pointer hover:text-primary' onClick={() => setEditMode(true)}>
                            <span className='text-lg mr-1 hover:bg-white rounded-xl'>+</span> Add Subtask
                        </p>
                    )
            }
        </>
    )

}

export default CreateSubTask;