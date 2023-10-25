import Link from 'next/link';

import SearchBar from '../search-bar';
import TopNavItem from '../top-nav-item';

const Header = ({ user }) => {
  return (
    <header className="fixed bg-[#2f3349] left-[16.25rem] header-calc mx-[1.5rem] mt-[1.5rem] rounded-md drop-shadow-xl z-10">
      <div className="flex flex-row items-center p-4 justify-between">
        <SearchBar />
        {/* <div className="mr-2">{user.username}</div> */}
        <div className="flex flex-row">
          <TopNavItem>
            <Link href="/dashboard/profile">Profile</Link>
          </TopNavItem>
          <TopNavItem>
            <Link href="/dashboard/friends">Friends</Link>
          </TopNavItem>
          <TopNavItem>
            <Link href="/api/auth">Logout</Link>
          </TopNavItem>
        </div>
      </div>
    </header>
  );
};

export default Header;
