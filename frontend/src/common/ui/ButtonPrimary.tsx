import React, {ReactNode} from 'react'


interface PrimaryButtonProps {
    children:ReactNode;
    paddingProp?: number
    type?: "submit" 
    onClickProp?: ()=>void;

}

const PrimaryButton:React.FC<PrimaryButtonProps> = ({children, type, paddingProp=2.5, onClickProp})=>{
    const handleClick = (): void =>{
        
        onClickProp && onClickProp();
    }
    return(
        <button 
        className={`bg-primary text-white p-${paddingProp} text-sm rounded-sm `} 
        type ={type} 
        onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default PrimaryButton;