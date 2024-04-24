import React, {useState} from "react"
import { Modal, Box } from "@mui/material";
import PrimaryButton from "../ui/ButtonPrimary";

interface DisplayTaskProps {
    isOpen: boolean,
    onClose: ()=>void
    
}

const DisplayTask: React.FC<DisplayTaskProps> = ({isOpen, onClose}) => {
    
   
    return(
        <Modal
              open={isOpen}
              onClose={onClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"

            > 
        
                <Box className="bg-[#f1f1f1] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-500 border-1 border-black shadow-lg p-10 rounded-lg flex flex-col items-center">
                    <p>Please verify your email through the link sent to your email.<br />Haven't received a link yet?</p>
                    <div className="mt-4">
                    <PrimaryButton onClickProp={()=>onClose}>Resend Link</PrimaryButton>    
                    </div>
                </Box>
            </Modal>

    )
}

export default DisplayTask;
