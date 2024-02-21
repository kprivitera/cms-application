import { TextareaProps } from '../../types';

const Textarea: React.FC<TextareaProps> = ({ id, ...props }) => {
  return (
    <>
      <textarea
        className="mb-4 bg-[#2f3349] border border-[#434968] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        id={id}
        {...props}
      />
    </>
  );
};

export default Textarea;
