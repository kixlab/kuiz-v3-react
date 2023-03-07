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
      <strong>Please enter Your Student ID</strong>
      <TextInput placeholder="Enter your student ID" onChange={inputChange} />
      <FillBtn onClick={onSubmit}>Enter</FillBtn>
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
