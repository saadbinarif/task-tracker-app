import TextInput from "../ui/TextInput";
import ButtonPrimary from "../ui/ButtonPrimary";

export default function Signup(){

    return(
        <div>
            <div className="bg-primary flex flex-col items-center justify-center h-screen">
            <div className="bg-[#f1f1f1] w-full max-w-md rounded-lg shadow-md p-8">
            <h2 className="text-[28px] font-bold mb-6 text-center">Sign up</h2>
            <form className="flex flex-col">
            <TextInput placeholderProp="Username" />
            <TextInput placeholderProp="Email" />
            <TextInput placeholderProp="Password" />
            <ButtonPrimary>Sign up</ButtonPrimary>

            </form>

            </div>
            
        </div>

        </div>
        
    );
}