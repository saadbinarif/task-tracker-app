import React, { useState, ChangeEvent, useEffect, useRef } from 'react'
import PlainTextInput from "../ui/PlainTextInput";
import ButtonPrimary from "../ui/ButtonPrimary";
import ButtonSecondary from "../ui/ButtonSecondary";

import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DateInput from '../ui/DateInput';
import { useDispatch } from 'react-redux';
import { TaskActions, createTaskRequest } from '../actions/taskActions';

const schema = z.object({
    title: z.string(),
    description: z.string(),
    dueDate: z.coerce.date()
  });

  export type FormValues = z.infer<typeof schema>;
  

const CreateTask: React.FC = () => {
    const [editMode, setEditMode] = useState(false)

    const { handleSubmit, control, watch, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
      })
      
      const dispatch = useDispatch()
      const onSubmit = (data: FormValues)=>{
        // dispatch(createTaskRequest(data))
        // createTaskRequest(data)
        dispatch({type:TaskActions.CREATE_TASK_REQUEST, payload:data})
        // dispatch({type:TaskActions.CREATE_TASK_REQUEST, payload:{title: data.title, descrption:data.description, dueDate: data.dueDate, status: 'isComplete', progress:50, subTasks:[{}], tags:[] }})
        // console.log(data)    
      }

    return (
        <>
            {
                editMode ?
                    (
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={"border border-black rounded-xl py-1 px-2 bg-white w-3/6"}>
                            <PlainTextInput placeHolderProp="Title" fontSizeProp="xl" nameProp='title' controlProp={control} changingVal={watch('title')}  />
                            <PlainTextInput placeHolderProp="Description" fontSizeProp="sm" nameProp='description' controlProp={control} changingVal={watch('description')} />

                            <div className='flex gap-4 ps-2'>
                                {/* <input type='date' className='border border-black rounded-sm text-sm' /> */}
                                <DateInput placeholderProp='dueDate' nameProp='dueDate' controlProp={control} />
                                <p className='border-2 border-black rounded-sm p-1 text-sm'>+ add tags </p>
                            </div>
                            <div className="container p-2 mt-4 text-right border-t border-black">
                                <span className="mr-1">
                                    <ButtonSecondary paddingProp={2} onClickProp={() => setEditMode(false)}>Cancel</ButtonSecondary>
                                </span>
                                <ButtonPrimary paddingProp={2} type='submit'>Save</ButtonPrimary>
                            </div>
                        </div>
                        </form>
                    ) :
                    (
                        <p className='text-sm font-medium cursor-pointer hover:text-primary' onClick={() => setEditMode(true)}><span className='text-lg mr-1 hover:bg-white rounded-xl'>+</span> Add Task</p>
                    )
            }
        </>
    )

}

export default CreateTask;