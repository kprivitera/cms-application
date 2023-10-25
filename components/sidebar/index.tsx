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
    <aside className="bg-[#2f3349] h-full w-[16.25rem] fixed top-0 left-0 right-0 p-4">
      <div className="text-[1.25rem] p-4">Book database</div>
      <ul className="flex flex-col">
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
    </aside>
  );
};

export default SideBar;
