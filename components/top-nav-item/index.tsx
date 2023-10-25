import classNames from 'classnames';

interface TopNavItemProps {
  children: React.ReactNode;
  hasPadding?: boolean;
}

const TopNavItem: React.FC<TopNavItemProps> = ({ children, hasPadding = true }) => {
  return <div className="py-1 mr-4">{children}</div>;
};

export default TopNavItem;
