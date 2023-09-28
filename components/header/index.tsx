import Link from 'next/link';

const Header = ({ user }) => {
  return (
    <header className="fixed bg-[#2f3349] left-[16.25rem] header-calc mx-[1.5rem] mt-[1.5rem] rounded-md drop-shadow-xl">
      <div className="p-4">
        <div>User: {user.username}</div>
        <div>
          <Link href="/api/auth">Logout</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
