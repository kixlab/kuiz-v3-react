import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import logoIcon from '../Asset/logo.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { palette, typography } from '../styles/theme'
import { useCallback, useState } from 'react'

interface Props {
  loginState: boolean
}

export const Gnb = (props: Props) => {
  const navigate = useNavigate()
  const cid = useSelector((state: RootState) => state.userInfo.classes[0])
  const userImg = useSelector((state: RootState) => state.userInfo).img
  const [isDisplay, setIsDisplay] = useState(false)

  const onClickMenu = useCallback(
    (path: string) => () => {
      navigate(`${path}`)
      setIsDisplay(!isDisplay)
    },
    [isDisplay]
  )

  return (
    <SideTab className="SideTab">
      <Logo onClick={() => props.loginState && navigate('/' + cid)}>
        <LogoIcon src={logoIcon} />
        KUIZ
      </Logo>
      {props.loginState == true && (
        <>
          <Menu isDisplay={isDisplay}>
            <MenuBtn onClick={onClickMenu('/' + cid)}>Solve Problem</MenuBtn>
            <MenuBtn onClick={onClickMenu('/' + cid + '/createQuestion')}>Create Question</MenuBtn>
            <MenuBtn onClick={onClickMenu('/' + cid + '/qlist')}>Create Options</MenuBtn>
            <MenuBtn onClick={onClickMenu('/' + cid + '/mypage')}>My Page</MenuBtn>
          </Menu>
          <ProfileImg onClick={() => setIsDisplay(!isDisplay)} src={userImg}></ProfileImg>
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
  background-color: ${palette.background.light};
  box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.16);
  box-sizing: border-box;
  z-index: 100;
  @media (max-width: 599px) {
    padding: 12px;
    height: auto;
    align-items: start;
  }
`

const Logo = styled.div`
  ${typography.logo};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  &:hover {
    color: ${palette.primary.main};
  }
`

const LogoIcon = styled.img`
  width: 22px;
  height: 22px;
`

const ProfileImg = styled.img`
  display: none;
  border-radius: 50%;
  cursor: pointer;
  @media (max-width: 599px) {
    display: flex;
    width: 28px;
    height: 28px;
  }
`

const Menu = styled.div<{ isDisplay: boolean }>`
  ${typography.b03b};
  display: flex;
  flex-direction: row;
  gap: 16px;
  color: ${palette.grey[200]};
  @media (max-width: 599px) {
    ${props =>
      props.isDisplay
        ? `
      display: flex;
    `
        : `display: none;`}
    flex-direction: column;
    padding-top: 48px;
    padding-bottom: 20px;
  }
`

const MenuBtn = styled.div`
  line-height: 60px;
  vertical-align: middle;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  &:hover {
    color: ${palette.primary.main};
    border-color: ${palette.primary.main};
    cursor: pointer;
  }
  @media (max-width: 599px) {
    line-height: initial;
    text-align: center;
    padding: 4px 0 4px 0;
    border: none;
  }
`
