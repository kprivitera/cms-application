import { ReactNode } from 'react';
import classNames from 'classnames';

type MenuItemProps = {
  active: boolean;
  children: ReactNode;
  href: string;
};

const menuItem = ({ active, children, ...restOfProps }: MenuItemProps) => {
  return (
    <a
      className={classNames('p-4 block rounded', {
        'bg-[#7367AA]': active,
      })}
      {...restOfProps}
    >
      {children}
    </a>
  );
};

export default menuItem;
