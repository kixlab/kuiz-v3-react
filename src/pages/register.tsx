import { PutStudentIDParams, PutStudentIDResults } from '@api/insertStudentID'
import { FillButton } from '@components/basic/button/Fill'
import { TextInput } from '@components/basic/input/Text'
import { Sheet } from '@components/Sheet'
import styled from '@emotion/styled'
import { updateStudentID } from '@redux/features/userSlice'
import { typography } from '@styles/theme'
import { request } from '@utils/api'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function StudentID() {
  const [insertedStudentID, setInsertedStudentID] = useState('')
  const dispatch = useDispatch()
  const { push } = useRouter()

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInsertedStudentID(e.target.value)
  }

  const onSubmit = async () => {
    const res = await request<PutStudentIDParams, PutStudentIDResults>(`insertStudentID`, {
      studentID: insertedStudentID,
    })
    if (res) {
      dispatch(updateStudentID(insertedStudentID))
      push('/my-page')
    }
  }
  return (
    <Sheet>
      <Header>Please Enter Your Student ID</Header>
      <InputSection>
        <TextInput placeholder="Enter Student ID" onChange={inputChange} />
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
