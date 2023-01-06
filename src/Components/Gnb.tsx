import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import iconImg from '../Asset/logoIcon.png'

export const Gnb = (props: { loginState: boolean }) => {
  const navigate = useNavigate()

  return (
    <SideTab className="SideTab">
      <Logo onClick={() => props.loginState && navigate('/')}>
        <LogoIcon src={iconImg} />
        KUIZ
      </Logo>
      {props.loginState == true && (
        <>
          <Menu>
            <MenuBtn onClick={() => navigate('/solve')}>Solve Problem</MenuBtn>
            <MenuBtn onClick={() => navigate('/createQuestion')}>Create Question</MenuBtn>
            <MenuBtn onClick={() => navigate('/question/createOption')}>Create Options</MenuBtn>
            <MenuBtn onClick={() => navigate('/mypage')}>My Page</MenuBtn>
          </Menu>
          <ProfileImg onClick={() => navigate('/login')}></ProfileImg>
        </>
      )}
    </SideTab>
  )
}

const SideTab = styled.div`
  width: 100vw;
  height: 60px;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px 0px 30px;
  background-color: #f7fafd;
  box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.16);
  box-sizing: border-box;
  z-index: 5;
  @media (max-width: 599px) {
    padding: 12px;
    height: auto;
    align-items: start;
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: #3d8add;
  cursor: pointer;
  &:hover {
    color: #346191;
  }
  @media (max-width: 599px) {
    font-size: 16px;
  }
`

const LogoIcon = styled.img`
  width: 22px;
  height: 22px;
  background-color: rgba(0, 0, 0, 0);
`

const ProfileImg = styled.div`
  display: none;
  background-image: '';
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background-color: #346191;
  cursor: pointer;
  @media (max-width: 599px) {
    width: 28px;
    height: 28px;
    display: flex;
  }
`

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  color: #212121;
  font-size: 14px;
  font-weight: 500;
  @media (max-width: 599px) {
    display: none;
    flex-direction: column;
    font-size: 14px;
    padding-top: 48px;
    padding-bottom: 20px;
  }
`

const MenuBtn = styled.div`
  line-height: 60px;
  vertical-align: middle;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  &:hover {
    color: #3d8add;
    border-color: #3d8add;
    cursor: pointer;
  }
  @media (max-width: 599px) {
    line-height: initial;
    text-align: center;
    padding: 4px 0 4px 0;
    border: none;
  }
`
