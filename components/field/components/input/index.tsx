import { InputProps } from '../../types';

const Input: React.FC<InputProps> = ({ id, ...props }) => {
  return (
    <>
      <input
        className="mb-4 bg-[#2f3349] border border-[#434968] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        id={id}
        {...props}
      />
    </>
  );
};

export default Input;
