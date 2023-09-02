import { map } from 'lodash/fp';
import { useRouter } from 'next/router';

import { MenuItem, SidebarWrapper } from './styles';

const menuItems = [
  { link: '/profile', text: 'Profile' },
  { link: '/words', text: 'Words' },
];

const SideBar = () => {
  const router = useRouter();
  return (
    <SidebarWrapper>
      <ul>
        {map(({ link, text }) => {
          const isActive = router.asPath === link;
          return (
            <li>
              <MenuItem active={isActive} href={link}>
                {text}
              </MenuItem>
            </li>
          );
        }, menuItems)}
      </ul>
    </SidebarWrapper>
  );
};

export default SideBar;
