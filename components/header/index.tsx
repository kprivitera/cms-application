import Link from 'next/link';

const Header = ({ user }) => {
  return (
    <header>
      <div>User: {user.username}</div>
      <div>
        <Link href="/api/auth">Logout</Link>
      </div>
    </header>
  );
};

export default Header;
