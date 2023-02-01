import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { enroll, login } from '../state/features/userSlice'
import { RootState } from '../state/store'
import { FillBtn } from '../Components/basic/button/Button'
import { TextInput } from '../Components/basic/InputBox'
import { Post } from '../utils/apiRequest'
export function Enroll() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [code, setCode] = useState<string>()
  const uid = useSelector((state: RootState) => state.userInfo._id)
  const email = useSelector((state: RootState) => state.userInfo.email)
  const detectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }
  const userInfo = useSelector((state: RootState) => state.userInfo)

  useEffect(() => {
    if (userInfo.classes.length > 0) {
      const cid = userInfo.classes[0]
      navigate('/' + cid)
    }
  }, [])

  const onSubmit = () => {
    Post(`${process.env.REACT_APP_BACK_END}/auth/class/join`, {
      code: code,
      _id: uid,
      userEmail: email,
    }).then((res: any) => {
      dispatch(enroll({ cid: res.cid, cType: res.cType }))
      const newInfo = { ...userInfo }
      newInfo['classes'] = [res.cid]
      dispatch(login(newInfo))
      navigate('/' + res.cid)
    })
  }
  return (
    <CodeInputBox>
      <strong>Class code</strong>
      <TextInput placeholder="Enter code" onChange={detectChange} />
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
