import { ApolloWrapper } from '../apollo-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <Header /> */}
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
