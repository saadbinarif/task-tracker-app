import React, { useState, ChangeEvent, useEffect, useRef } from "react"
import { Modal, Box } from "@mui/material";
import ButtonPrimary from "../ui/ButtonPrimary";
import TextInput from "../ui/TextInput";
import CloseIcon from '@mui/icons-material/Close';
import PlainTextInput from "../ui/PlainTextInput";
import ButtonSecondary from "../ui/ButtonSecondary";
import TagCard from "../ui/TagCard";
import AddIcon from '@mui/icons-material/Add';
import CreateTask from "./CreateTask";
import CreateSubTask from "./CreateSubTask";


interface DisplayTaskProps {
  isOpen: boolean,
  onClose: () => void

}

const DisplayTask: React.FC<DisplayTaskProps> = ({ isOpen, onClose }) => {

  const [textEdit, setTextEdit] = useState(false)


  const rightDivHeadings = "text-[#999999] text-xs"
  const rightDivValues = "ms-6 mt-2 text-xs"

  return (
    <Modal
      open={isOpen}
    >

      <Box className="bg-white absolute top-1/2 left-80 transform -translate-x-1/2 -translate-y-1/2  border-1 border-black shadow-lg rounded-xl w-7/12 m-auto mx-96">
        <div className="container shadow-sm shadow-grey-500 bg-white rounded-t-xl border-b border-grey-100 p-2 text-right ">
          <CloseIcon onClick={onClose} />
        </div>
        {/* main grid */}
        <div className="bg-[#fffff] grid grid-cols-3 ">
          {/* column-left */}
          <div className="col-span-2 m-3  rounded-xl">

            <div className={textEdit ? "border border-black rounded-xl py-1 px-2" : ''} onClick={() => setTextEdit(true)}>
              <PlainTextInput placeHolderProp="Title" fontSizeProp="xl" />
              <PlainTextInput placeHolderProp="Description" fontSizeProp="sm" />
            </div>
            {textEdit &&
              <div className="container p-2 text-right">
                <span className="mr-1">
                  <ButtonSecondary paddingProp={2} onClickProp={() => setTextEdit(false)}>Cancel</ButtonSecondary>
                </span>
                <ButtonPrimary paddingProp={2}>Save</ButtonPrimary>
              </div>}

            {/* subtask-main-div */}

            <div className="mt-4 ms-2 pb-2 mb-1 border-b border-black-500">
              <p className="text-sm">Subtasks</p>
             
            </div>
            <div className="p-2">
                <div className="container flex items-center">
                  <input  type="checkbox" className="w-4 h-4 bg-green-400  border-green-400 rounded-full focus:ring-green-500 " />
                    <label className="ms-2 text-sm font-medium ">subtask 1</label>
                </div>
                <hr className="my-2" />
                <div className="container flex items-center ">
                  <input  type="checkbox" className="w-4 h-4 bg-green-400  border-green-400 rounded-full focus:ring-green-500 " />
                    <label className="ms-2 text-sm font-medium ">subtask 2</label>
                </div>
                <hr className="my-2" />
                <div className="container flex items-center ">
                  <input  type="checkbox" className="w-4 h-4 bg-green-400  border-green-400 rounded-full focus:ring-green-500 " />
                    <label className="ms-2 text-sm font-medium ">subtask 2</label>
                </div>
                <hr className="my-2" />
              </div>
              <div>
                <CreateSubTask />
              </div>

          </div>
          {/* column-right */}
          <div className="bg-[#FCFAF8] p-4">
            <div>
              <p className={rightDivHeadings}>status</p>
              <p className={rightDivValues}>in progress</p>
            </div>
            <br />
            <div>
              <p className={rightDivHeadings}>Progress</p>
              <p className={rightDivValues}>50%</p>
            </div>
            <br />
            <div >
              <p className={rightDivHeadings}>Duedate</p>
              <p className={rightDivValues}>today</p>
            </div>
            <br />
            <div >
             <div className="flex justify-between">
               <p className={rightDivHeadings}>Tags</p> 
               <AddIcon fontSize="small" style={{color:'#999999', marginRight: '6px'}} /> 
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
    </Modal>

  )
}

export default DisplayTask;
