import styled from '@emotion/styled'
import { request } from '@utils/api'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FillBtn } from '../components/basic/button/Button'
import { TextInput } from '../components/basic/InputBox'
import { enroll, login } from '../redux/features/userSlice'
import { RootState } from '../redux/store'
import { JoinClassParams, JoinClassResults } from './api/auth/joinClass'

export default function Page() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [code, setCode] = useState<string>('')
  const uid = useSelector((state: RootState) => state.userInfo._id)
  const email = useSelector((state: RootState) => state.userInfo.email)
  const userInfo = useSelector((state: RootState) => state.userInfo)

  const detectChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value)
    },
    [setCode]
  )

  useEffect(() => {
    if (userInfo.classes.length > 0) {
      const cid = userInfo.classes[0]
      navigate('/' + cid)
    }
  }, [navigate, userInfo.classes])

  const onSubmit = useCallback(() => {
    email &&
      request<JoinClassParams, JoinClassResults>(`auth/class/join`, {
        code: code,
        _id: uid,
      }).then(res => {
        if (res && res.cid && res.cType) {
          dispatch(enroll({ cid: res.cid, cType: res.cType }))
          const newInfo = { ...userInfo }
          newInfo['classes'] = [{ cid: res.cid, cType: res.cType }]
          dispatch(login(newInfo))
          navigate('/' + res.cid)
        }
      })
  }, [email, uid, code, userInfo, dispatch, navigate])

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
