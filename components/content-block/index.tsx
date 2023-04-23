import styled from 'styled-components'

type Props = {
  children: React.ReactNode
}

const StyledContentBlock = styled.div`
  background-color: rgb(40 48 70 / 1);
  border-radius: 0.428rem;
  color: rgb(17 24 39 / 1);
  padding: 2rem;
`

const ContentBlock = ({ children }: Props): JSX.Element => {
  return <StyledContentBlock>{children}</StyledContentBlock>
}

export default ContentBlock
