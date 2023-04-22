import { MenuItem, SidebarWrapper } from './styles'

const SideBar = () => {
  return (
    <SidebarWrapper>
      <ul>
        <li>
          <MenuItem>Email</MenuItem>
        </li>
        <li>
          <MenuItem active={true}>Email</MenuItem>
        </li>
        <li>
          <MenuItem>Email</MenuItem>
        </li>
      </ul>
    </SidebarWrapper>
  )
}

export default SideBar
