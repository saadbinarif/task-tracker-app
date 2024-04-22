import React from "react";
import TextInput from "../common/ui/TextInput";
import ButtonPrimary from "../common/ui/ButtonPrimary";
import Sidebar from "../common/components/Sidebar";

export default function Signin():JSX.Element{

    return(
        <div>
            <Sidebar />
            <div className="bg-primary flex flex-col items-center justify-center h-screen ">
            <div className="bg-[#f1f1f1] w-full max-w-md rounded-lg shadow-md p-8">
            <h2 className="text-[28px] font-bold mb-6 text-center">Login</h2>
            <form className="flex flex-col">
            <TextInput placeholderProp="Email" />
            <TextInput placeholderProp="Password" />
            <ButtonPrimary>Sign up</ButtonPrimary>
            

            </form>
            
            </div>
            
        </div>

        </div>
        
    );
}