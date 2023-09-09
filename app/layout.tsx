// import ContentWrapper from '../components/content-wrapper';
// import Header from '../components/header';
import Sidebar from '../components/sidebar';
// import StyledComponentsRegistry from '../lib/registry';

const menuItems = [
  { link: '/dashboard/profile', text: 'Profile' },
  { link: '/dashboard/words', text: 'Words' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <StyledComponentsRegistry> */}
        {/* <Header /> */}
        <Sidebar menuItems={menuItems} />
        {/* <ContentWrapper>{children}</ContentWrapper> */}
        {children}
        {/* </StyledComponentsRegistry> */}
      </body>
    </html>
  );
}
