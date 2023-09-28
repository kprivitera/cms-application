import React, { ButtonHTMLAttributes } from 'react';

export enum ButtonType {
  Submit = 'submit',
  Reset = 'reset',
  Button = 'button',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: ButtonType;
}

const Button: React.FC<ButtonProps> = ({ children, type = ButtonType.Submit, ...props }) => {
  return (
    <button className="bg-[#7367AA] hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
