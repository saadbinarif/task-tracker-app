import React, { useState, ChangeEvent, useEffect, useRef } from 'react'
import PlainTextInput from "../ui/PlainTextInput";
import ButtonPrimary from "../ui/ButtonPrimary";
import ButtonSecondary from "../ui/ButtonSecondary";

const CreateTask: React.FC = () => {
    const [editMode, setEditMode] = useState(false)
    return (
        <>
            {
                editMode ?
                    (
                        <div className={"border border-black rounded-xl py-1 px-2 bg-white w-3/6"}>
                            <PlainTextInput placeHolderProp="Title" fontSizeProp="xl" />
                            <PlainTextInput placeHolderProp="Description" fontSizeProp="sm" />

                            <div className='flex gap-4 ps-2'>
                                <input type='date' className='border border-black rounded-sm text-sm' />
                                <p className='border-2 border-black rounded-sm p-1 text-sm'>+ add tags </p>
                            </div>
                            <div className="container p-2 mt-4 text-right border-t border-black">
                                <span className="mr-1">
                                    <ButtonSecondary paddingProp={2} onClickProp={() => setEditMode(false)}>Cancel</ButtonSecondary>
                                </span>
                                <ButtonPrimary paddingProp={2}>Save</ButtonPrimary>
                            </div>
                        </div>
                    ) :
                    (
                        <p className='text-sm font-medium cursor-pointer hover:text-primary' onClick={() => setEditMode(true)}><span className='text-lg mr-1 hover:bg-white rounded-xl'>+</span> Add Task</p>
                    )
            }
        </>
    )

}

export default CreateTask;