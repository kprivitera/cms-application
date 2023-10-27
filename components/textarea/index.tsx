import React, { FC, TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea: FC<TextAreaProps> = ({ label, ...props }) => (
  <div>
    <label>
      {label}
      <textarea
        className="mb-4 bg-[#2f3349] border border-[#434968] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...props}
      />
    </label>
  </div>
);

export default TextArea;
