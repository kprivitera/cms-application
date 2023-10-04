import classNames from 'classnames';

interface ContentWrapperProps {
  children: React.ReactNode;
  hasPadding?: boolean;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children, hasPadding = true }) => {
  return (
    <div
      className={classNames('bg-[#2f3349] rounded-md mb-4', {
        'p-4': hasPadding,
      })}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
