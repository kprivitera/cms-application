'use client';

import { map } from 'lodash/fp';
import { usePathname } from 'next/navigation';

import MenuItem from '../menu-item';

type MenuItem = {
  link: string;
  text: string;
};

type SidebarProps = {
  menuItems: MenuItem[];
};

const SideBar = ({ menuItems }: SidebarProps) => {
  const pathName = usePathname();
  return (
    <ul>
      {map(({ link, text }) => {
        const isActive = pathName === link;
        return (
          <li key={link}>
            <MenuItem active={isActive} href={link}>
              {text}
            </MenuItem>
          </li>
        );
      }, menuItems)}
    </ul>
  );
};

export default SideBar;
