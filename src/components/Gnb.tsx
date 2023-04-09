import { LoadUserInfoParams, LoadUserInfoResults } from '@api/loadUserInfo'
import styled from '@emotion/styled'
import { login, updateStudentID, updateDocumentation } from '@redux/features/userSlice'
import { palette, typography } from '@styles/theme'
import { request } from '@utils/api'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { MOBILE_WIDTH_THRESHOLD } from 'src/constants/ui'

export const Gnb = () => {
  const { push, query } = useRouter()
  const { data } = useSession()
  const isAdmin = useSelector((state: RootState) => state.userInfo.isAdmin)
  const cid = query.cid
  const userImg = useSelector((state: RootState) => state.userInfo).img
  const dispatch = useDispatch()

  const onClickSwitchClass = useCallback(() => {
    push('/')
  }, [push])

  const onClickMyPage = useCallback(() => {
    push('/my-page')
  }, [push])

  const onClickAdmin = useCallback(() => {
    push(`/admin/${cid}`)
  }, [push, cid])

  useEffect(() => {
    if (data) {
      request<LoadUserInfoParams, LoadUserInfoResults>('loadUserInfo', {}).then(res => {
        if (res) {
          const { user, classes } = res
          dispatch(
            login({
              name: user.name,
              email: user.email,
              img: user.imageUrl,
              classes,
              isLoggedIn: true,
              isAdmin: user.isAdmin,
              made: user.made.map(c => c.toString()),
              madeOptions: user.madeOptions.map(c => c.toString()),
              solved: user.solved.map(c => c.toString()),
            })
          )
          if (user.studentID) {
            dispatch(updateStudentID(user.studentID))
          }
          if (user.allowDocumentation !== undefined) {
            dispatch(updateDocumentation(user.allowDocumentation))
          }
        }
      })
    }
  }, [push, dispatch, data])

  return (
    <SideTab>
      <Logo>
        <LogoIcon src={'/logo.svg'} />
        KUIZ
      </Logo>
      {data && (
        <Menu>
          <MenuBtn onClick={onClickSwitchClass}>Classes</MenuBtn>
          <MenuBtn onClick={onClickMyPage}>My Page</MenuBtn>
          {cid && <MenuBtn onClick={onClickAdmin}>Admin</MenuBtn>}
          <ProfileImg src={userImg}></ProfileImg>
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

  @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
    padding: 0 8px;
  }
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

const Menu = styled.div`
  ${typography.b03b};
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  color: ${palette.grey200};
`

const MenuBtn = styled.button`
  background: none;
  border: none;
  vertical-align: middle;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  height: 32px;
  cursor: pointer;

  &:hover {
    color: ${palette.primaryMain};
    border-color: ${palette.primaryMain};
  }
`
