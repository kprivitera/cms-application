import Image from 'next/image'
import styled from 'styled-components'

export const ProfileBlockWrapper = styled.a`
  align-items: center;
  display: flex;
  position: relative;
`
export const TextWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`
export const UserName = styled.p`
  display: inline-block;
  line-height: 21px;
`
export const AdminTitle = styled.span`
  font-size: 11px;
  line-height: 17px;
`
export const ImageWrapper = styled.span`
  display: inline-flex;
  height: 40px;
  position: relative;
  width: 40px;
`
export const StyledImage = styled(Image)`
  border-radius: 9999px;
  height: 100%;
  width: 100%;
`
export const StatusIndicator = styled.span`
  background-color: #28c76f;
  border-radius: 10rem;
  border-width: 1px;
  bottom: 0;
  min-height: 11px;
  min-width: 11px;
  position: absolute;
  right: 0;
`
