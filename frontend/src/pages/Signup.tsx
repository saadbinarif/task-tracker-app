import React, {useState} from "react"
import TextInput from "../common/ui/TextInput";
import ButtonPrimary from "../common/ui/ButtonPrimary";

import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import PrimaryButton from "../common/ui/ButtonPrimary";

export default function Signup(): JSX.Element{

    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

    return(
        <div>
            <div className="bg-primary flex flex-col items-center justify-center h-screen ">
            <div className="bg-[#f1f1f1] w-full max-w-md rounded-lg shadow-md p-8">
            <h2 className="text-[28px] font-bold mb-6 text-center">Sign up</h2>
            <form className="flex flex-col">
            <TextInput placeholderProp="Username" />
            <TextInput placeholderProp="Email" />
            <TextInput placeholderProp="Password" />
            <ButtonPrimary onClickProp = {handleOpen}>Sign up</ButtonPrimary>
            
             <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"

            > 
           
                <Box className="bg-[#f1f1f1] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-500 border-1 border-black shadow-lg p-10 rounded-lg flex flex-col items-center">
                    <p>Please verify your email through the link sent to your email.<br />Haven't received a link yet?</p>
                    <div className="mt-4">
                    <PrimaryButton>Resend Link</PrimaryButton>    
                    </div>
                </Box>
            </Modal>

            </form>
                      
            </div>
           
        </div>
        
        </div>
        
    );
}