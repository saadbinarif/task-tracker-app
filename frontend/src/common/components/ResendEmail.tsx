import React, { useEffect } from "react";

import TextInput from "../ui/TextInput";
import ButtonPrimary from "../ui/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ToastContainer, toast } from "react-toastify";



const schema = z.object({
    email: z.string().email('Invalid email format').min(3),
    
});

export type FormValues = z.infer<typeof schema>;

export default function ResendEmail(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    })
    

    const handleResendEmail = (data: FormValues) => {
        
          
    };
  
    return (
        <div>

            <div className="bg-primary flex flex-col items-center justify-center h-screen ">
                <div className="bg-[#f1f1f1] w-full max-w-md rounded-lg shadow-md p-8">
                    <h2 className="text-[28px] font-bold mb-6 text-center">Resend Email Link</h2>
                    <form className="flex flex-col" onSubmit={handleSubmit(handleResendEmail)}>
                        <TextInput placeholderProp="Email" nameProp="email" controlProp={control} errorProp={errors.email?.message} />
                
                        <ButtonPrimary type="submit">Send Email</ButtonPrimary>


                    </form>

                </div>

            </div>
            
        </div>

    );
}

