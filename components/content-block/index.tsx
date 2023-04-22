type Props = {
  children: React.ReactNode
}

const ContentBlock = ({ children }: Props): JSX.Element => {
  return <div className="rounded-[0.428rem] bg-[#283046] text-gray-900 p-8">{children}</div>
}

export default ContentBlock
