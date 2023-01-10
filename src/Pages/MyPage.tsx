import styled from '@emotion/styled'
import { MadeOption } from '../Components/MadeOption'
import { MadeStem } from '../Components/MadeStem'
import { googleLogout } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
export function MyPage(props: { stemNum: number; optionNum: number; logout: (state: boolean) => void }) {
  const navigate = useNavigate()

  const logout = useCallback(() => {
    googleLogout()
    props.logout(false)
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
      <button onClick={logout}>Log Out</button>
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
