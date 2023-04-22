type Props = {
  children: React.ReactNode
}

const ContentWrapper = ({ children }: Props): JSX.Element => {
  return <div className="pt-[7.25rem] px-8 ml-[260px]">{children}</div>
}

export default ContentWrapper
