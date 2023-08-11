import { PutStudentIDParams, PutStudentIDResults } from '@api/insertStudentID'
import {
  UpdateDataCollectionConsentStateParams,
  UpdateDataCollectionConsentStateResults,
} from '@api/updateDataCollectionConsentState'
import { Required } from '@components/Required'
import { Sheet } from '@components/Sheet'
import { Label } from '@components/basic/Label'
import { FillButton } from '@components/basic/button/Fill'
import { TextInput } from '@components/basic/input/Text'
import styled from '@emotion/styled'
import { enroll, updateDataCollectionConsentState, updateStudentID } from '@redux/features/userSlice'
import { RootState } from '@redux/store'
import { palette, typography } from '@styles/theme'
import { request } from '@utils/api'
import { ClientSafeProvider, getProviders, signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AsyncReturnType } from 'src/types/utils'
import { JoinClassParams, JoinClassResults } from './api/joinClass'
import { useAPILoading } from 'src/hooks/useButton'
import { useQueryParam } from 'src/hooks/useQueryParam'

interface Props {
  providers: AsyncReturnType<typeof getProviders>
}

export default function Page({ providers }: Props) {
  const { isLoading: onSubmitLoading, callAPI: onSubmitHandleClick } = useAPILoading()
  const { isLoading: singInLoading, callAPI: singInHandleClick } = useAPILoading()
  const { isLoading: onDataCollectionConsentIsLoading, callAPI: onDataCollectionConsentHandleClick } = useAPILoading()
  const { isLoading: onRegisterIsLoading, callAPI: onRegisterHandleClick } = useAPILoading()
  const { data: session } = useSession()
  const { push, query } = useRouter()
  const dispatch = useDispatch()
  const classes = useSelector((state: RootState) => state.userInfo.classes)
  const [code, setCode] = useState('')
  const showConsent = useSelector((state: RootState) => !state.userInfo.dataCollectionConsentState)
  const showStudentId = useSelector((state: RootState) => !state.userInfo.studentID)
  const [studentID, setStudentID] = useState('')
  const [condition] = useQueryParam('c')

  const onCodeChange = useCallback(
    (v: string) => {
      setCode(v.toLowerCase())
    },
    [setCode]
  )

  const onSubmit = useCallback(async () => {
    const res = await onSubmitHandleClick<JoinClassResults>(async () => {
      return await request<JoinClassParams, JoinClassResults>(`joinClass`, {
        code,
      })
    })
    if (res?.cid) {
      dispatch(enroll({ name: res.name, cid: res.cid, code }))
    }
  }, [code, dispatch, onSubmitHandleClick])

  const onClassEnter = useCallback(
    (cid: string) => async () => {
      push(`/class/${cid}?c=${condition}`)
    },
    [condition, push]
  )

  const signInCallback = useCallback(
    (provider: ClientSafeProvider) => async () => {
      singInHandleClick(async () => {
        return await signIn(provider.id)
      })
    },
    [singInHandleClick]
  )

  const onUpdateDataCollectionConsentState = useCallback(
    async (dataCollectionConsentState: boolean) => {
      const res = await onDataCollectionConsentHandleClick<UpdateDataCollectionConsentStateResults>(async () => {
        return await request<UpdateDataCollectionConsentStateParams, UpdateDataCollectionConsentStateResults>(
          `updateDataCollectionConsentState`,
          {
            dataCollectionConsentState,
          }
        )
      })
      if (res) {
        dispatch(updateDataCollectionConsentState(dataCollectionConsentState))
      }
    },
    [dispatch, onDataCollectionConsentHandleClick]
  )

  const onRegister = async () => {
    const res = await onRegisterHandleClick<PutStudentIDResults>(async () => {
      return await request<PutStudentIDParams, PutStudentIDResults>(`insertStudentID`, {
        studentID,
      })
    })

    if (res) {
      dispatch(updateStudentID(studentID))
    }
  }

  return (
    <>
      <Head>
        <title>KUIZ</title>
      </Head>
      {session ? (
        <>
          <OnBoardingBox>
            {showConsent && (
              <Sheet gap={0} marginBottom={20}>
                <Label color="primaryMain" marginBottom={8}>
                  Research Consent
                </Label>
                We would like to use and analyze your system use data for research purposes.
                <FillButton
                  onClick={() => onUpdateDataCollectionConsentState(true)}
                  marginTop={20}
                  disabled={onDataCollectionConsentIsLoading}
                >
                  I give my consent
                </FillButton>
              </Sheet>
            )}
            {showStudentId && (
              <Sheet gap={0} marginBottom={20}>
                <Label color="primaryMain" marginBottom={8}>
                  Register Your ID <Required />
                </Label>
                Please register your student ID for class activity and evaluation.
                <InputSection>
                  <TextInput placeholder="Student ID" onChange={setStudentID} value={studentID} />
                  <FillButton onClick={onRegister} disabled={onRegisterIsLoading}>
                    Register
                  </FillButton>
                </InputSection>
              </Sheet>
            )}
          </OnBoardingBox>
          <Sheet gap={0}>
            <Label marginBottom={8}>
              Choose a Class or Enroll in a New Class <Required />
            </Label>
            {classes.map(({ cid, name, code }, i) => (
              <ClassButton key={i} onClick={onClassEnter(cid)}>
                {name} ({code.toUpperCase()})
              </ClassButton>
            ))}
            <InputSection>
              <TextInput placeholder="Enter class code" onChange={onCodeChange} value={code} />
              <FillButton onClick={onSubmit} disabled={onSubmitLoading}>
                Enter
              </FillButton>
            </InputSection>
          </Sheet>
        </>
      ) : (
        <>
          <IntroBox>
            Hello, we are a research team from KAIST Interaction Lab (KIXLAB). We are currently examining the effects of
            learnersourcing in Multiple-choice question (MCQ) generation tasks.
            <br />
            <br />
            To reduce the burden caused by question generation tasks, as well as allowing for training in question
            generation, we developed KUIZ, a system facilitating modular learnersourcing for multiple-choice questions.
            <br />
            <br />
            Learnersourcing is a method of crowdsourcing that allows learners to contribute to the learning process.
            <br />
            <br />
            If you participate in this study, you will be given a task to create MCQ stems and options based on your
            lecture materials.
            <br />
            <br />
            The system is currently on its pilot version, and we are currently running usability tests while validating
            the learnersourcing approach.
            <br />
            Please be understanding if you find limitations or errors within our system.
            <br />
            <br />
            We are collecting Google sign-in information for account connection. This information is used solely for
            identifying individual data and log-in, and other personal information is not used or accessed in the
            process. After the experiment ends, private information and account information will be all deleted.
            <br />
            <br />
            If you have any questions, please contact the research team (haesoo1108@gmail.com).
            <br />
            <br />
            Thank you.
          </IntroBox>
          {providers &&
            Object.values(providers).map(provider => (
              <FillButton key={provider.id} onClick={signInCallback(provider)} disabled={singInLoading}>
                Sign In With {provider.name}
              </FillButton>
            ))}
        </>
      )}
    </>
  )
}

const ClassButton = styled.button`
  font-family: 'inter-r';
  font-size: 15px;
  padding: 16px;
  border-radius: 6px;
  background: ${palette.primaryLight};
  width: 100%;
  box-sizing: border-box;
  border: 2px solid transparent;
  cursor: pointer;
  &:hover {
    border-color: ${palette.primaryMain};
  }
  :not(:last-of-type) {
    margin-bottom: 8px;
  }
`

const IntroBox = styled.div`
  border-radius: 8px;
  background-color: white;
  padding: 28px;
  box-sizing: border-box;
  margin-bottom: 24px;
  ${typography.b02};
`

const OnBoardingBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

const InputSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 100px;
  column-gap: 12px;
  margin-top: 20px;
`

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
