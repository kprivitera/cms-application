import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href: string;
}

const LinkButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Link className="inline-flex bg-[#7367AA] hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" {...props}>
      {children}
    </Link>
  );
};

export default LinkButton;
