"use client";

import React from "react";
import { Button } from "../ui/button";
import { LucideProps } from "lucide-react";

interface AuthButtonProps {
    onClickHandler : ()=> void;
    icon: React.ComponentType<LucideProps>;
    buttonText: string;
}

const AuthButton = ({
    onClickHandler,
    icon: Icon,
    buttonText
}: Readonly<AuthButtonProps>) => {
    return <Button variant='outline' className='w-full' onClick={onClickHandler}>
        <Icon className='mr-2 h-4 w-4' />
        {buttonText}
    </Button>;
};

export default AuthButton;
