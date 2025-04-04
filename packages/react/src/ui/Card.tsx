import React from 'react';

interface CardProps {
    children: React.ReactNode;
    header?: React.ReactNode;
}

const Card = ({ children, header }: CardProps) => {
    return <div className=" rounded-[12px] ">
        <div className="bg-[#E5EAF2] rounded-t-[12px] py-3 px-6">
            {header}
        </div>
        <div className="bg-[#F7F7F8] rounded-b-[12px] p-6">
            {children}
        </div>
    </div>;
};

export default Card;