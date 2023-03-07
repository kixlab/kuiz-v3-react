import styled from '@emotion/styled'
import { TextInput } from '@components/basic/InputBox'
import { FillBtn } from '@components/basic/button/Button'
import { ChangeEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { request } from '@utils/api'
import { PutStudentIDParams, PutStudentIDResults } from '@api/insertStudentID'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { addStudentID } from '@redux/features/userSlice'
import { MOBILE_WIDTH_THRESHOLD } from 'src/constants/ui'
import { palette, typography } from '@styles/theme'

export default function StudentID() {
  const studentID = useSelector((state: RootState) => state.userInfo.studentID)
  const [insertedStudentID, setInsertedStudentID] = useState('')
  const dispatch = useDispatch()
  const { push } = useRouter()

  useEffect(() => {
    if (studentID !== '') {
      push('/')
    }
  }, [studentID, push])

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInsertedStudentID(e.target.value)
  }

  const onSubmit = async () => {
    const res = await request<PutStudentIDParams, PutStudentIDResults>(`insertStudentID`, {
      studentID: insertedStudentID,
    })
    if (res) {
      dispatch(addStudentID(insertedStudentID))
      push('/')
    }
  }
  return (
    <CodeInputBox>
      <Header>Please Enter Your Student ID</Header>
      <InputSection>
        <TextInput placeholder="Enter Student ID" onChange={inputChange} />
        <FillBtn onClick={onSubmit}>Submit</FillBtn>
      </InputSection>
    </CodeInputBox>
  )
}

const CodeInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 100px 60px 30px 60px;
  box-sizing: border-box;
  font-size: 18px;
`

const ClassButton = styled.button`
  font-family: 'inter-r';
  font-size: 15px;
  padding: 16px;
  border-radius: 6px;
  background: ${palette.primary.light};
  width: 100%;
  box-sizing: border-box;
  border: 2px solid transparent;
  cursor: pointer;
  &:hover {
    border-color: ${palette.primary.main};
  }
`

const IntroBox = styled.div`
  border-radius: 8px;
  background-color: white;
  padding: 30px;
  box-sizing: border-box;
  margin: 24px 0;
  @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
    box-sizing: border-box;
  }
  ${typography.b02};
`

const Header = styled.div`
  ${typography.hLabel};
`

const InputSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 12px;
`
