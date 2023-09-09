'use client';

import { map } from 'lodash/fp';
import { useRouter } from 'next/navigation';

import { MenuItem, SidebarWrapper } from './styles';

type MenuItem = {
  link: string;
  text: string;
};

type SidebarProps = {
  menuItems: MenuItem[];
};

const SideBar = ({ menuItems }: SidebarProps) => {
  const router = useRouter();
  // console.log(router);
  return (
    // <SidebarWrapper>
    <ul>
      {map(({ link, text }) => {
        const isActive = router.asPath === link;
        return (
          <li key={link}>
            <MenuItem active={isActive} href={link}>
              {text}
            </MenuItem>
          </li>
        );
      }, menuItems)}
    </ul>
    // </SidebarWrapper>
  );
};

export default SideBar;
