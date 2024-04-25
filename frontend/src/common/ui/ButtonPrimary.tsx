import React, {ReactNode, MouseEvent} from 'react'


interface PrimaryButtonProps {
    children:ReactNode;
    onClickProp?: ()=>void;

}

const PrimaryButton:React.FC<PrimaryButtonProps> = ({children, onClickProp})=>{
    const handleClick = (e: MouseEvent<HTMLButtonElement>): void =>{
        e.preventDefault();
        onClickProp && onClickProp();
    }
    return(
        <button className="bg-primary text-white p-2.5 rounded-sm " onClick={handleClick}>{children}</button>
    )
}

export default PrimaryButton;