import Image from 'next/image'

import { StyledNav } from './styles'
import Bell from '../../images/bell.svg'
import Hamburger from '../../images/hamburger.svg'
import ProfileBlock from '../profile-block'

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
