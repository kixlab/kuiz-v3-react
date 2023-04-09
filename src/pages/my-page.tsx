import { StrokeButton } from '@components/basic/button/Stroke'
import { Label } from '@components/basic/Label'
import { MadeOption } from '@components/MadeOption'
import { MadeStem } from '@components/MadeStem'
import { Sheet } from '@components/Sheet'
import { logout } from '@redux/features/userSlice'
import { RootState } from '@redux/store'
import { QStem } from '@server/db/qstem'
import { request } from '@utils/api'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetQstemByOptionParams, GetQstemByOptionResults } from './api/getQstemByOption'
import { LoadCreatedOptionParams, LoadCreatedOptionResults } from './api/loadCreatedOption'
import { LoadCreatedStemDataParams, LoadCreatedStemDataResults } from './api/loadCreatedStemData'
import Head from 'next/head'
import { DeleteQstemParams, DeleteQstemResults } from '@api/deleteQstem'
import { DeleteOptionParams, DeleteOptionResults } from '@api/deleteOption'
import { Required } from '@components/Required'

export default function Page() {
  const studentID = useSelector((state: RootState) => state.userInfo.studentID)
  const { push } = useRouter()
  const dispatch = useDispatch()
  const [myQuestions, setMyQuestions] = useState<QStem[]>([])
  const [myOptions, setMyOptions] = useState<
    { oid: string; qid: string; stemText: string; optionText: string; isAnswer: boolean; cid: string }[]
  >([])

  const getMadeStem = useCallback(() => {
    request<LoadCreatedStemDataParams, LoadCreatedStemDataResults>(`loadCreatedStemData`, {}).then(res => {
      if (res) {
        setMyQuestions(res.madeStem.reverse())
      }
    })
  }, [])

  const getMadeOption = useCallback(async () => {
    const res = await request<LoadCreatedOptionParams, LoadCreatedOptionResults>(`loadCreatedOption`, {})
    if (res) {
      const res2 = await request<GetQstemByOptionParams, GetQstemByOptionResults>(`getQstemByOption`, {
        qstems: res.madeOption.map(o => o.qstem.toString()),
      })
      if (res2) {
        const optionList = res.madeOption
        const qlist = res2.qstems
        const newOptionList = optionList.map((option, index) => ({
          oid: option._id,
          qid: qlist[index]._id,
          stemText: qlist[index].stem_text,
          optionText: option.option_text,
          isAnswer: option.is_answer,
          cid: qlist[index].class.toString(),
        }))
        setMyOptions(newOptionList.reverse())
      }
    }
  }, [])

  const onDeleteQuestion = useCallback(
    async (qid: string) => {
      await request<DeleteQstemParams, DeleteQstemResults>(`deleteQstem`, { qid })
      getMadeStem()
      getMadeOption()
    },
    [getMadeOption, getMadeStem]
  )

  const onDeleteOption = useCallback(
    async (optionID: string) => {
      await request<DeleteOptionParams, DeleteOptionResults>(`deleteOption`, { optionID })
      getMadeOption()
    },
    [getMadeOption]
  )

  const onInsertStudentID = useCallback(() => {
    push('/register')
  }, [push])

  const logOut = useCallback(() => {
    signOut()
    dispatch(logout())
    push('/')
  }, [dispatch, push])

  useEffect(() => {
    getMadeStem()
    getMadeOption()
  }, [getMadeOption, getMadeStem])

  return (
    <>
      <Head>
        <title>My Page</title>
      </Head>
      <Sheet>
        <Label>
          Student ID <Required />
        </Label>
        {studentID ?? 'Not registered'}
        <StrokeButton onClick={onInsertStudentID}>{studentID ? 'Update Student ID' : 'Add Student ID'}</StrokeButton>

        {0 < myQuestions.length && <Label size={0}>My Questions</Label>}
        {myQuestions.map(stem => {
          return (
            <MadeStem
              key={stem._id}
              qid={stem._id}
              question={stem.stem_text}
              cid={stem.class.toString()}
              onDelete={onDeleteQuestion}
            />
          )
        })}
        {0 < myOptions.length && <Label size={0}>My Options</Label>}
        {myOptions.map((option, i) => {
          return (
            <MadeOption
              key={i}
              oid={option.oid}
              optionType={option.isAnswer ? 'Answer' : 'Distractor'}
              qid={option.qid}
              cid={option.cid}
              question={option.stemText}
              option={option.optionText}
              onDelete={onDeleteOption}
            />
          )
        })}
        <StrokeButton onClick={logOut}>Log out</StrokeButton>
      </Sheet>
    </>
  )
}
