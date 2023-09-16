import { ReactNode } from 'react';

type MenuItemProps = {
  active: boolean;
  children: ReactNode;
  href: string;
};

const menuItem = ({ active, children, ...restOfProps }: MenuItemProps) => {
  return (
    <a {...restOfProps}>
      {active && '> '}
      {children}
    </a>
  );
};

export default menuItem;
