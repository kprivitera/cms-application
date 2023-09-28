interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return <div className="bg-[#2f3349] p-4 rounded-md mb-4">{children}</div>;
};

export default ContentWrapper;
