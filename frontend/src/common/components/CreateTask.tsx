import React, { useState, } from 'react'
import PlainTextInput from "../ui/PlainTextInput";
import ButtonPrimary from "../ui/ButtonPrimary";
import ButtonSecondary from "../ui/ButtonSecondary";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DateInput from '../ui/DateInput';
import { useDispatch } from 'react-redux';
import { TaskActions, createTaskRequest, } from '../actions/taskActions';
import { format } from 'date-fns'

const schema = z.object({
    title: z.string().min(1),
    description: z.string(),
    // dueDate: z.coerce.date().optional()
    dueDate: z.string().optional()
});

export type FormValues = z.infer<typeof schema>;

interface CreateTaskProps {
    valueProp ?: any
}

const CreateTask: React.FC<CreateTaskProps> = ({valueProp}) => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)

    const { handleSubmit, control, watch, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    })


    const onSubmit = (data: FormValues) => {

        if (!data.dueDate) {
            data.dueDate = format(new Date(1970, 0, 1), 'yyyy/MM/dd')
            console.log('input dueDate', data.dueDate)
        }
        if(valueProp){
            data.dueDate = format(new Date(valueProp), 'yyyy/MM/dd')
        }
        dispatch({ type: TaskActions.CREATE_TASK_REQUEST, payload: data })
        setEditMode(false)
    }

    return (
        <>
            {
                editMode ?
                    (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={"border border-black rounded-xl py-1 px-2 bg-white "}>
                                <PlainTextInput placeHolderProp="Title" fontSizeProp="xl" nameProp='title' controlProp={control} changingVal={watch('title')} />
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