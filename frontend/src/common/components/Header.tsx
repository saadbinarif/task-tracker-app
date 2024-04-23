import React from "react";

interface HeaderProps{
    title: string
}

const Header: React.FC<HeaderProps> = ({title})=>{
    return(
        <div className="bg-[#fafafa] p-5">
            <h1 className="font-medium">{title}</h1>

        </div>
    )

}

export default Header