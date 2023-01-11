import styled from '@emotion/styled'
import { MadeOption } from '../Components/MadeOption'
import { MadeStem } from '../Components/MadeStem'
import { googleLogout } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../state/features/userSlice'

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
          <div style={{ color: '#212121' }}>Created Question Stems</div>
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
          <div style={{ color: '#212121' }}>Created Options</div>
          {props.optionNum}
        </DataLabel>
        <MadeLists>
          <MadeOption optionType="Distractor" />
          <MadeOption optionType="Answer" />
          <MadeOption optionType="Distractor" />
          <MadeOption optionType="Distractor" />
        </MadeLists>
      </div>
      <StrokeBtn onClick={signOut}>Log Out</StrokeBtn>
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
  color: #1f74ce;
  font-weight: 700;
  padding: 30px 0 16px;
  display: flex;
  gap: 10px;
`

const StrokeBtn = styled.button`
  width: 200px;
  color: #212121;
  background-color: #fff;
  border: 1px solid #bdbdbd;
  margin-bottom: 30px;
  :hover {
    background-color: #e9eef4;
  }
  @media (max-width: 599px) {
    font-size: 14px;
  }
`
