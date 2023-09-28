interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
  return <div className="pt-32 ml-[17.75rem] header-calc">{children}</div>;
};

export default MainWrapper;
