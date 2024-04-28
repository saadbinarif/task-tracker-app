import React, {ReactNode, MouseEvent} from 'react'


interface PrimaryButtonProps {
    children:ReactNode;
    paddingProp?: number
    onClickProp?: ()=>void;

}

const PrimaryButton:React.FC<PrimaryButtonProps> = ({children, paddingProp=2.5, onClickProp})=>{
    const handleClick = (e: MouseEvent<HTMLButtonElement>): void =>{
        e.preventDefault();
        onClickProp && onClickProp();
    }
    return(
        <button className={`bg-primary text-white p-${paddingProp} text-sm rounded-sm `} onClick={handleClick}>{children}</button>
    )
}

export default PrimaryButton;