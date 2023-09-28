import '../styles/globals.css';

import { ApolloWrapper } from '../apollo-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#161d31] text-[#b6bee3] font-Public text-white text-[#B6BEE3]">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
