import React, { useState, ChangeEvent, useEffect, useRef } from "react"
import { Modal, Box } from "@mui/material";
import ButtonPrimary from "../ui/ButtonPrimary";
import TextInput from "../ui/TextInput";
import CloseIcon from '@mui/icons-material/Close';
import PlainTextInput from "../ui/PlainTextInput";
import ButtonSecondary from "../ui/ButtonSecondary";
import TagCard from "../ui/TagCard";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CreateTask from "./CreateTask";
import CreateSubTask from "./CreateSubTask";
import { useDispatch, useSelector } from "react-redux";
import { format, isEqual, add, sub } from 'date-fns'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TaskActions, deleteSubtaskRequest, deleteTaskRequest, fetchAllTasksRequest, updateSubtaskRequest, updateTaskRequest } from "../actions/taskActions";
import DateInput from "../ui/DateInput";
import DisplaySubtask from "./DisplaySubtask";


const schema = z.object({
  title: z.string(),
  description: z.string(),
});

export type FormValues = z.infer<typeof schema>;

const dateSchema = z.object({
  dueDate: z.string(),
  
});

export type DateValues = z.infer<typeof dateSchema>;


interface DisplayTaskProps {
  isOpen: boolean,
  onClose: () => void
  taskData: ITask

}

const DisplayTask: React.FC<DisplayTaskProps> = ({ isOpen, onClose, taskData }) => {

  const [textEdit, setTextEdit] = useState(false)
  const [dateEdit, setDateEdit] = useState(false)
  const [optionsDropDown, setOptionsDropDown] = useState<any>();
  const [deleteModal, setDeleteModal] = useState(false)

  const handleOptionsDropdown = () => {
    setOptionsDropDown((prevState: any) => !prevState)
  }

  const openDeleteModal = () => {
    setDeleteModal(true)
    setOptionsDropDown(false)
  }

  const closeDeleteModal = () => {
    setDeleteModal(false)
  }

  const { handleSubmit, control, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema)
  })

  const { handleSubmit: handleDateSubmit, control: DateControl, watch: DateWatch, formState: { errors: DateErrors } } = useForm<DateValues>({
    resolver: zodResolver(dateSchema)
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
    dispatch(updateTaskRequest(taskData._id, data))
    setTextEdit(false)
  }

  const onDateSubmit = (data:DateValues)=>{
    if (!data.dueDate) {
      data.dueDate = format(new Date(1970, 0, 1), 'yyyy/MM/dd')
      console.log('input dueDate', data.dueDate)
  }
    console.log(data)
    dispatch(updateTaskRequest(taskData._id, data))
  }

  const dispatch = useDispatch();
  const loading = useSelector((s: any) => s.tasks.loading);
  const error = useSelector((s: any) => s.tasks.error);
  const taskdt = useSelector((s: any) => s.tasks.tasks);

  // useEffect(()=>{
  //   if(error) {setTextEdit(true)}
  // }, [onSubmit])

  // useEffect(()=>{
  //   dispatch(fetchAllTasksRequest())
  // },[taskdt])
  
  // console.log('Displaytask component rendered')
  const [localTask, setLocalTAsk] = (taskdt)

  const handleDeleteTask = (taskId: string) => {
    // dispatch({type:TaskActions.CREATE_TASK_REQUEST, payload: taskId})
    dispatch({ type: TaskActions.DELETE_TASK_REQUEST, payload: taskData._id })

    onClose();
    // dispatch(deleteTaskRequest(taskData._id))
    // console.log('loading dt:', loading)
    // console.log('error dt:', error)
    // console.log('taskdt dt:', taskdt)
  }

  const handleDeleteSubtask = (taskId: string, subtaskId: string)=>{

    dispatch(deleteSubtaskRequest(taskId, subtaskId));
    // dispatch({ type: TaskActions.DELETE_SUBTASK_REQUEST, payload: {taskId:taskData._id, subtaskId:subtaskId} })
    // // dispatch(fetchAllTasksRequest())
  }

  const handleCheckboxChange = (e:any, taskId:any, subtaskId:any )=>{

    const isComplete = e.target.checked;

    dispatch(updateSubtaskRequest(taskId, subtaskId, {isComplete}))
    console.log('checkbox', isComplete)

  }

 



  // console.log('loading dt after click:', loading)
  // console.log('error dt after click:', error)
  // console.log('taskdt dt after click:', taskdt)

  let iconColor = ''
  const formatDate = (date: any) => {
    const currentDate = format(new Date(), 'yyyy/MM/dd')
    const dueDate = format(new Date(date), 'yyyy/MM/dd')
    // console.log('duedate!!!!!', dueDate)
    const tomorrow = add(new Date(currentDate), { days: 1 })
    //   const tomorrow= format(new Date(tomorrowf), 'dd/MM/yyyy')
    // console.log('tomorrow#######', tomorrow)
    const yesterday = sub(currentDate, { days: 1 })
    //   const yesterday= format(new Date(yesterdayf), 'dd/MM/yyyy')
    const nullDate = format(new Date(1970, 0, 1), 'yyyy/MM/dd')
    // console.log('nullDate', nullDate)

    if (isEqual(dueDate, currentDate)) {
      iconColor = 'text-yellow-600'
      return 'Today'

    }
    else if (isEqual(tomorrow, dueDate)) {
      iconColor = 'text-green-600'
      return 'Tommorow'
    }
    else if (isEqual(dueDate, yesterday)) {
      iconColor = 'text-red-500'
      return 'Yesterday'
    }
    else if (dueDate === nullDate) {
      return 'not set'
    }
    else {
      iconColor = 'text-green-600'
      return format(new Date(date), 'dd MMMM yyyy')
    }

  }
  const dueDate = formatDate(taskData.dueDate)


  //styles
  const rightDivHeadings = "text-[#999999] text-xs"
  const rightDivValues = "ms-6 mt-2 text-xs"





  return (

    <Modal
      open={isOpen}
    >
      <>
        <Box className="bg-white absolute top-1/2 left-90 transform -translate-x-1/2 -translate-y-1/2  border-1 border-black shadow-lg rounded-xl w-7/12 m-auto mx-[40rem]">

          {/* top div with close and options button */}
          <div className="container shadow-sm shadow-grey-500 bg-white rounded-t-xl border-b border-grey-100 p-2 text-right relative flex justify-end">
            {/* options button */}
            <div className={`relative bg-opacity-50 p-0.5 ${optionsDropDown && 'bg-[#c9c9c9]'}  hover:bg-[#c9c9c9]`} onClick={handleOptionsDropdown} >
              <MoreHorizIcon />

            </div>
            {/* options dropdown div */}
            <div className={`container absolute rounded-lg shadow-sm border border-grey-100 bg-[#ffffff] text-left px-1 py-2 w-auto top-10 right-8 ${!optionsDropDown && 'hidden'}`}>
              <div className="flex items-center gap-2 p-2 cursor-pointer" onClick={openDeleteModal}>
                <div><DeleteIcon sx={{ color: 'red', fontSize: 'sm' }} /></div>
                <p>Delete task</p>
              </div>
            </div >
            {/* <DeleteIcon sx={{color: 'red'}} /> */}
            <CloseIcon onClick={onClose} sx={{ mr: '4px', p: "1px" }} />
          </div>
          {/* main grid */}
          <div className="bg-[#fffff] grid grid-cols-3">
            {/* column-left */}
            <div className="col-span-2 m-3 rounded-xl pb-60 overflow-scroll ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={textEdit ? "border border-black rounded-xl py-1 px-2" : ''} onClick={() => setTextEdit(true)}>

                  <PlainTextInput placeHolderProp="Title" fontSizeProp="xl" nameProp="title" valueProp={taskData.title} controlProp={control} changingVal={watch('title')} />
                  <PlainTextInput placeHolderProp="Description" fontSizeProp="sm" nameProp="description" valueProp={taskData.description} controlProp={control} changingVal={watch('title')} />
                </div>
                {textEdit &&
                  <div className="container p-2 text-right">
                    <span className="mr-1">
                      <ButtonSecondary paddingProp={2} onClickProp={() => setTextEdit(false)}>Cancel</ButtonSecondary>
                    </span>
                    <ButtonPrimary paddingProp={2}>Save</ButtonPrimary>
                  </div>}
              </form>
              {/* subtask-main-div */}

              <div className="mt-4 ms-2 pb-2 mb-1 border-b border-black-500">
                <p className="text-sm">Subtasks</p>

              </div>
              <div className="p-2">
                {/* {
                  taskData.subtasks.map((sTask: any) => (
                    <>
                      <div id="outers" className="container relative flex items-center" key={sTask._id}>
                        <input 
                        type="checkbox" 
                        className="w-4 h-4 bg-green-400  border-green-400 rounded-full focus:ring-green-500 " 
                        checked={sTask.isComplete ? true : false} 
                        onChange={(e) => handleCheckboxChange(e, taskData._id, sTask._id)}
                        />
                        <label className="ms-2 text-sm font-medium ">{sTask.title}</label>
                        <div id='inners' className=" bg-white drop-shadow-md shadow-inner absolute ms-14 left-3/4 ps-12 " onClick = {()=>handleDeleteSubtask(taskData._id, sTask._id)}>
                          <DeleteIcon className="text-red-600"/>

                        </div>
                      </div>
                      <hr className="my-2" />
                    </>
                  ))

                } */}
                <DisplaySubtask taskData={taskData} />
              </div>
              <div>
                <CreateSubTask taskIdProp={taskData._id}/>
              </div>

            </div>
            {/* column-right */}
            <div className="bg-[#FCFAF8] p-4  pb-60">
              <div>
                <p className={rightDivHeadings}>Status</p>
                <p className={rightDivValues}>{taskData.status}</p>
              </div>
              <br />
              <div>
                <p className={rightDivHeadings}>Progress</p>
                <p className={rightDivValues}>{taskData.progress}%</p>
              </div>
              <br />
              
              <div >
              <div className="flex justify-between">
                  <p className={rightDivHeadings}>Due date</p>
                  {
                    dateEdit ?
                    (
                      
                      <div>
                      <CloseIcon fontSize="small" style={{ color: 'red', marginRight: '2px' }} onClick={()=>setDateEdit(false) } />
                      {/* <DoneIcon fontSize="small" style={{ color: 'green', marginRight: '6px'}} type="submit" /> */}
                      </div>
                    ):
                    (
                      <EditIcon fontSize="small" style={{ color: '#999999', marginRight: '6px' }} onClick={()=>setDateEdit(true)} />

                    )
                  }
                </div>
                {
                  dateEdit?
                  (
                    <form onSubmit={handleDateSubmit(onDateSubmit)}>
                      <DateInput placeholderProp="dueDate" nameProp="dueDate" controlProp={DateControl}/>
                      <button type="submit">
                      <DoneIcon fontSize="small" style={{ color: 'green', marginRight: '6px'}} type="submit" />
                      </button>
                    </form>
                  ):
                  (
                    
                    <p className={rightDivValues}>{ dueDate}</p>
                    
                  )
                }
              </div>
              
              <br />
              <div >
                <div className="flex justify-between">
                  <p className={rightDivHeadings}>Tags</p>
                  <AddIcon fontSize="small" style={{ color: '#999999', marginRight: '6px' }} />
                </div>
                <div className=" bg-red-200 flex flex-wrap gap-1 p-2 container">
                  <TagCard isEditable={true} />
                  <TagCard isEditable={true} />
                  <TagCard isEditable={true} />
                  <TagCard isEditable={true} />
                </div>
              </div>
            </div>
          </div>

        </Box>

        {/* delete Modal */}
        <Modal
          open={deleteModal}
        >

          <Box className="absolute bg-white top-1/2 left-80 transform -translate-x-1/2 -translate-y-1/2  border-1 border-black shadow-lg rounded-lg  m-auto mx-96 p-4 ">
            <div className="container py-4">
              <p>Are you sure that you want to delete this task?</p>
            </div>
            <div className="container text-right">
              <span className="mr-2">

                <ButtonSecondary onClickProp={closeDeleteModal}>Cancel</ButtonSecondary>
              </span>
              <ButtonPrimary onClickProp={() => handleDeleteTask(taskData._id)}>{loading ? 'loading' : 'Yes'}</ButtonPrimary>
            </div>
          </Box>
        </Modal>
      </>
    </Modal>

  );
}

export default DisplayTask;
