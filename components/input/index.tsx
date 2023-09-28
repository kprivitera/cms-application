import Link from 'next/link';

const Input: React.FC = ({ ...props }) => {
  return (
    <input
      className="mb-4 bg-[#2f3349] border border-[#434968] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      {...props}
    />
  );
};

export default Input;
