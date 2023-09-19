import Sidebar from '../../components/sidebar';

const menuItems = [
  { link: '/dashboard/profile', text: 'Profile' },
  { link: '/dashboard/words/a', text: 'Words' },
  { link: '/dashboard/words/add', text: 'Add words' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Sidebar menuItems={menuItems} />
      {children}
    </section>
  );
}
