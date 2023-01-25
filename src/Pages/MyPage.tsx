import styled from '@emotion/styled'
import { MadeOption } from '../Components/MadeOption'
import { MadeStem } from '../Components/MadeStem'
import { googleLogout } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../state/features/userSlice'
import { StrokeBtn } from '../Components/basic/button/Button'
import { Label } from '../Components/basic/Label'
import { palette, typography } from '../styles/theme'

export function MyPage(props: { stemNum: number; optionNum: number }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signOut = useCallback(() => {
    googleLogout()
    dispatch(logout())
    navigate('/login')
  }, [])

  return (
    <div>
      <div>
        <DataLabel>
          <Label text="Created Question Stems" color="black" size={0} />
          {props.stemNum}
        </DataLabel>
        <MadeLists>
          <MadeStem />
          <MadeStem />
          <MadeStem />
        </MadeLists>
      </div>
      <div>
        <DataLabel>
          <Label text="Created Options" color="black" size={0} />
          {props.stemNum}
        </DataLabel>
        <MadeLists>
          <MadeOption optionType="Distractor" />
          <MadeOption optionType="Answer" />
          <MadeOption optionType="Distractor" />
          <MadeOption optionType="Distractor" />
        </MadeLists>
      </div>
      <StrokeBtn onClick={signOut}>Log out</StrokeBtn>
    </div>
  )
}

const MadeLists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
`

const DataLabel = styled.div`
  ${typography.hLabel};
  color: ${palette.primary.main};
  padding: 30px 0 12px;
  display: flex;
  gap: 10px;
`
