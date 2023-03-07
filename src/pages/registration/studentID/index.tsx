import styled from '@emotion/styled'
import { TextInput } from '@components/basic/InputBox'
import { FillBtn } from '@components/basic/button/Button'
import { ChangeEvent, useState, useEffect } from 'react'
import { withRouter, NextRouter, useRouter } from 'next/router'
import { request } from '@utils/api'
import { PutStudentIDParams, PutStudentIDResults } from '@api/insertStudentID'
import { LoadUserInfoParams, LoadUserInfoResults } from '@api/loadUserInfo'
interface Props {
  router: NextRouter
}

export default withRouter(function StudentID({ router }: Props) {
  const [studentID, setStudentID] = useState('')
  const [disabled, setDisabled] = useState(true)
  const { push } = useRouter()

  useEffect(() => {
    request<LoadUserInfoParams, LoadUserInfoResults>('/loadUserInfo', {}).then(res => {
      if (res) {
        const { user, classes } = res
        if (user.studentID) {
          push('/')
        }
      }
    })
  }, [push])

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStudentID(e.target.value)
    if (Number(e.target.value) && e.target.value.length === 8) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  const onSubmit = async () => {
    const res = await request<PutStudentIDParams, PutStudentIDResults>(`insertStudentID`, {
      studentID: parseInt(studentID),
    })
    if (res) {
      push('/')
    }
  }
  return (
    <CodeInputBox>
      <strong>Please enter Your Student ID</strong>
      <TextInput placeholder="Enter new class" onChange={inputChange} />
      <FillBtn onClick={onSubmit} disabled={disabled}>
        Enter
      </FillBtn>
    </CodeInputBox>
  )
})

const CodeInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 100px 60px 30px 60px;
  box-sizing: border-box;
  font-size: 18px;
`
