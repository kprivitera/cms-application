import Image from 'next/image'
import styled from 'styled-components'

import Bell from '../../images/bell.svg'
import Hamburger from '../../images/hamburger.svg'
import ProfileBlock from '../profile-block'

const StyledNav = styled.nav`
  background-color: rgba(47, 51, 73, 0.9);
  border-radius: 0.428rem;
  width: calc(100% - 4rem - 260px);
  margin-top: 21px;
  margin-left: 2rem;
  margin-right: 2rem;
  right: 0px;
  position: fixed;
  box-shadow: rgba(12, 16, 27, 0.15) 0px 3px 3px -2px, rgba(12, 16, 27, 0.01) 0px 3px 4px 0px,
    rgba(12, 16, 27, 0.01) 0px 1px 8px 0px;
`

const Header = () => {
  return (
    <StyledNav>
      <div className="py-4 px-3 flex justify-between">
        <ul className="flex items-center flex-row">
          <li className="w-[21px] h-[21px]">
            <Image src={Hamburger} />
          </li>
        </ul>
        <ul className="flex items-center flex-row">
          <li className="mr-1 leading-6">
            <a className="block">
              <span className="relative w-[21px] h-[21px] block">
                <Image className="text-[#b4b7bd]" src={Bell} />
                <span className="justify-center items-center w-[18px] h-[18px] flex px-1 rounded-[10rem] right-[-5px] top-[-11px] text-[11px] bg-[#ea5455] absolute">
                  6
                </span>
              </span>
            </a>
          </li>
          <li className="leading-4 relative">
            <ProfileBlock />
          </li>
        </ul>
      </div>
    </StyledNav>
  )
}

export default Header
