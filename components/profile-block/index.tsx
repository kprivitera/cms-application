import { AdminTitle, ImageWrapper, ProfileBlockWrapper, StyledImage, TextWrapper, UserName } from './styles'
import ProfileImage from '../../images/profile.png'

const ProfileBlock = () => {
  return (
    <ProfileBlockWrapper>
      <TextWrapper>
        <UserName>John Doe</UserName>
        <AdminTitle>admin</AdminTitle>
      </TextWrapper>
      <ImageWrapper>
        <span className="rounded-full flex">
          <StyledImage src={ProfileImage} alt="Picture of the author" />
        </span>
      </ImageWrapper>
    </ProfileBlockWrapper>
  )
}

export default ProfileBlock
