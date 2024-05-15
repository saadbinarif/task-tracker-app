import React, { useState, ChangeEvent, useEffect, useRef } from 'react'
import PlainTextInput from "../ui/PlainTextInput";
import ButtonPrimary from "../ui/ButtonPrimary";
import ButtonSecondary from "../ui/ButtonSecondary";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { TaskActions, createSubtaskRequest, fetchAllTasksRequest } from '../actions/taskActions';

const schema = z.object({
    title: z.string().min(1),
    // isComplete: z.boolean()
})

export type FormValues = z.infer<typeof schema>;

interface ICreateSubTaskProps{
taskIdProp?: any
}



const CreateSubTask: React.FC<ICreateSubTaskProps> = ({taskIdProp}) => {

    const [editMode, setEditMode] = useState(false)
    const { handleSubmit, control, watch} = useForm<FormValues>({
        resolver: zodResolver(schema)
    })
const dispatch = useDispatch()

    const onSubmit = (data: FormValues)=>{
       dispatch(createSubtaskRequest(taskIdProp, data))
        // dispatch({ type: TaskActions.CREATE_SUBTASK_REQUEST, payload: {taskId: taskIdProp, subTask: data} })
        console.log('subtask form values', data)
        setEditMode(false)
    }

    return (
        <>
            {
                editMode ?
                    (
                        <div className={"border border-black rounded-xl py-1 px-2"}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <PlainTextInput placeHolderProp="Title" fontSizeProp="xl" nameProp='title' controlProp={control} changingVal={watch('title')} />

                            <div className="container p-2 text-right border-t border-black">
                                <span className="mr-1">
                                    <ButtonSecondary paddingProp={2} onClickProp={() => setEditMode(false)}>Cancel</ButtonSecondary>
                                </span>
                                <ButtonPrimary paddingProp={2} type='submit'>Save</ButtonPrimary>
                               
                            </div>
                        </form>
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