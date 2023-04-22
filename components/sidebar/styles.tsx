import styled, { css } from 'styled-components'

type MenuProps = {
  active?: boolean
}

const SidebarWrapper = styled.div`
  background-color: #283046;
  height: 100%;
  position: fixed;
  width: 16rem;
`

const MenuItem = styled.a`
  border-radius: 0.4rem;
  box-shadow: rgba(12, 16, 27, 0.15) 0px 3px 1px -2px, rgba(12, 16, 27, 0.01) 0px 2px 2px 0px,
    rgba(12, 16, 27, 0.01) 0px 1px 5px 0px;
  display: block;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 15px;
  padding-inline: 1.75rem;

  ${(props: MenuProps) =>
    props.active &&
    css`
      background-color: rgb(115, 103, 240);
      margin-block: 0;
      margin-inline: 0.875rem;
      padding-inline: 0.75rem;
      white-space: nowrap;
    `}
`

export { MenuItem, SidebarWrapper }
