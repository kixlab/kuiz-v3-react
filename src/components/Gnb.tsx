import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export const Gnb = () => {
  const { push } = useRouter()
  const { data } = useSession()
  const userImg = useSelector((state: RootState) => state.userInfo).img
  const [isDisplay, setIsDisplay] = useState(false)

  const onClickMenu = useCallback(
    (path: string) => () => {
      push(`${path}`)
      setIsDisplay(!isDisplay)
    },
    [isDisplay, push]
  )

  return (
    <SideTab>
      <Logo>
        <LogoIcon src={'/logo.svg'} />
        KUIZ
      </Logo>
      {data && (
        <Menu isDisplay={isDisplay}>
          <MenuBtn onClick={onClickMenu('/')}>Switch Class</MenuBtn>
          <MenuBtn onClick={onClickMenu('/my-page')}>My Page</MenuBtn>
          <ProfileImg onClick={() => setIsDisplay(!isDisplay)} src={userImg}></ProfileImg>
        </Menu>
      )}
    </SideTab>
  )
}

const SideTab = styled.div`
  width: 100vw;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  background-color: ${palette.background.light};
  box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.16);
  box-sizing: border-box;
  z-index: 100;
`

const Logo = styled.div`
  ${typography.logo};
  display: flex;
  align-items: center;
  gap: 8px;
`

const LogoIcon = styled.img`
  width: 22px;
  height: 22px;
`

const ProfileImg = styled.img`
  border-radius: 50%;
  display: flex;
  width: 28px;
  height: 28px;
`

const Menu = styled.div<{ isDisplay: boolean }>`
  ${typography.b03b};
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  color: ${palette.grey[200]};
`

const MenuBtn = styled.button`
  vertical-align: middle;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  height: 48px;
  cursor: pointer;

  &:hover {
    color: ${palette.primary.main};
    border-color: ${palette.primary.main};
  }
`

const Content = styled.div``
