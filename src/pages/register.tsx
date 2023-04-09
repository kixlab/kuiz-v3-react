import { PutStudentIDParams, PutStudentIDResults } from '@api/insertStudentID'
import { FillButton } from '@components/basic/button/Fill'
import { TextInput } from '@components/basic/input/Text'
import { Sheet } from '@components/Sheet'
import styled from '@emotion/styled'
import { updateStudentID } from '@redux/features/userSlice'
import { typography } from '@styles/theme'
import { request } from '@utils/api'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function StudentID() {
  const [sid, setSid] = useState('')
  const dispatch = useDispatch()
  const { push } = useRouter()

  const onSubmit = async () => {
    const res = await request<PutStudentIDParams, PutStudentIDResults>(`insertStudentID`, {
      studentID: sid,
    })
    if (res) {
      dispatch(updateStudentID(sid))
      push('/my-page')
    }
  }

  return (
    <Sheet>
      <Header>Please Enter Your Student ID</Header>
      <InputSection>
        <TextInput placeholder="Enter Student ID" value={sid} onChange={setSid} />
        <FillButton onClick={onSubmit}>Submit</FillButton>
      </InputSection>
    </Sheet>
  )
}

const Header = styled.div`
  ${typography.hLabel};
`

const InputSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 12px;
`
