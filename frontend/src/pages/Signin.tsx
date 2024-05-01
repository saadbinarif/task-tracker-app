import React from "react";
import TextInput from "../common/ui/TextInput";
import ButtonPrimary from "../common/ui/ButtonPrimary";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoginRequest } from "../common/actions/AuthActions";

const schema = z.object({
    email: z.string().email('Invalid email format').min(3),
    password: z.string().min(8, {message: 'minimum 8 chracters required'}),
});

export type FormValues = z.infer<typeof schema>;

export default function Signin(): JSX.Element {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.auth?.loading);
    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    })

    const handleSignin = (data: FormValues) => {
        
        dispatch(LoginRequest(data));

    };
  
    return (
        <div>

            <div className="bg-primary flex flex-col items-center justify-center h-screen ">
                <div className="bg-[#f1f1f1] w-full max-w-md rounded-lg shadow-md p-8">
                    <h2 className="text-[28px] font-bold mb-6 text-center">Login</h2>
                    <form className="flex flex-col" onSubmit={handleSubmit(handleSignin)}>
                        <TextInput placeholderProp="Email" nameProp="email" controlProp={control} errorProp={errors.email?.message} />
                        <TextInput placeholderProp="Password" nameProp="password" controlProp={control} errorProp={errors.password?.message} />

                        <ButtonPrimary type="submit">Sign in</ButtonPrimary>


                    </form>

                </div>

            </div>

        </div>

    );
}

