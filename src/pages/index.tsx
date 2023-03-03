import { LoadUserInfoParams, LoadUserInfoResults } from '@api/loadUserInfo'
import styled from '@emotion/styled'
import { request } from '@utils/api'
import { ClientSafeProvider, getProviders, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FillBtn } from '@components/basic/button/Button'
import { TextInput } from '@components/basic/InputBox'
import { enroll, login } from '@redux/features/userSlice'
import { RootState } from '@redux/store'
import { JoinClassParams, JoinClassResults } from './api/joinClass'
import { AsyncReturnType } from 'src/types/utils'

interface Props {
  providers: AsyncReturnType<typeof getProviders>
}

export default function Page({ providers }: Props) {
  const { data: session } = useSession()
  const { push, query } = useRouter()
  const dispatch = useDispatch()
  const classes = useSelector((state: RootState) => state.userInfo.classes)
  const [code, setCode] = useState('')

  const detectChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value)
    },
    [setCode]
  )

  useEffect(() => {
    if (session) {
      request<LoadUserInfoParams, LoadUserInfoResults>('/loadUserInfo', {}).then(res => {
        if (res) {
          const { user, classes } = res
          dispatch(
            login({
              name: user.name,
              email: user.email,
              img: user.imageUrl,
              classes,
              isLoggedIn: true,
              isAdmin: user.isAdmin,
              made: user.made.map(c => c.toString()),
              madeOptions: user.madeOptions.map(c => c.toString()),
              solved: user.solved.map(c => c.toString()),
            })
          )
        }
      })
    }
  }, [dispatch, session])

  const onSubmit = useCallback(async () => {
    const res = await request<JoinClassParams, JoinClassResults>(`joinClass`, {
      code: code,
    })
    if (res?.cid) {
      dispatch(enroll({ name: res.name, cid: res.cid }))
    }
  }, [code, dispatch])

  const onClassEnter = useCallback(
    (cid: string) => async () => {
      push(`/class/${cid}`)
    },
    [push]
  )

  const signInCallback = useCallback(
    (provider: ClientSafeProvider) => async () => {
      const callbackUrl = (query.callbackUrl ?? '/') as string
      await signIn(provider.id, { callbackUrl })
    },
    [query.callbackUrl]
  )

  return (
    <>
      {session ? (
        <CodeInputBox>
          <strong>Choose Your Class</strong>
          {classes.map(({ cid, name }, i) => (
            <Class key={i} onClick={onClassEnter(cid)}>
              {name}
            </Class>
          ))}
          <TextInput placeholder="Enter new class" onChange={detectChange} />
          <FillBtn onClick={onSubmit}>Enter</FillBtn>
        </CodeInputBox>
      ) : (
        <>
          {providers &&
            Object.values(providers).map(provider => (
              <FillBtn key={provider.id} onClick={signInCallback(provider)}>
                Sign In With {provider.name}
              </FillBtn>
            ))}
        </>
      )}
    </>
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

const Class = styled.button`
  font-family: 'inter-r';
  font-size: 15px;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #bdbdbd;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
`

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
