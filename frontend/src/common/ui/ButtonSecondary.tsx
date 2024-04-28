import React, {ReactNode, MouseEvent} from "react";

interface ButtonSecondaryProps{
    children:ReactNode;
    paddingProp?: number
    onClickProp?: ()=>void; 
}
const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({children, paddingProp=2.5, onClickProp})=>{

    const handleClick = (e: MouseEvent<HTMLButtonElement>): void =>{
        e.preventDefault();
        onClickProp && onClickProp();
    }
    return(
        <button className={`bg-transparent border-2 border-primary text-primary p-${paddingProp} text-sm rounded-sm `} onClick={handleClick}>{children}</button>
    )
}

export default ButtonSecondary;