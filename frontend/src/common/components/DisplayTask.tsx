import React, {useState} from "react"
import { Modal, Box } from "@mui/material";
import PrimaryButton from "../ui/ButtonPrimary";
import TextInput from "../ui/TextInput";
import CloseIcon from '@mui/icons-material/Close';


interface DisplayTaskProps {
    isOpen: boolean,
    onClose: ()=>void
    
}

const DisplayTask: React.FC<DisplayTaskProps> = ({isOpen, onClose}) => {
    
    
    return(
        <Modal
              open={isOpen}
              
             

            > 
        
                <Box className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-1 border-black shadow-lg rounded-xl">
                    <div className="container bg-white rounded-t-xl p-2 text-right">
                        <CloseIcon onClick={onClose}/>
                    </div>
                    <div className="bg-red-200 grid grid-cols-2 ">
                        <div className="bg-red-500 w-52 p-3">
                            <p className="w-9">asdasd</p>
                            <TextInput placeholderProp="sadsad"/>
                        </div>
                        <div className="bg-[#f1f1f1] p-1">
                            <p>asdsad</p>
                        </div>
                    </div>
                </Box>
            </Modal>

    )
}

export default DisplayTask;
