import { LoadProblemListParams, LoadProblemListResults } from '@api/loadProblemList'
import { QuizListContent } from '@components/QuizListContent'
import { QuizListHeader } from '@components/QuizListHeader'
import styled from '@emotion/styled'
import { QStem } from '@server/db/qstem'
import { request } from '@utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export default function Page() {
  const { query, push } = useRouter()
  const cid = query.cid as string | undefined
  const [questionList, setQuestionList] = useState<QStem[]>([])

  const getQuestionList = useCallback(async () => {
    if (cid) {
      const res = await request<LoadProblemListParams, LoadProblemListResults>(`loadProblemList`, {
        cid,
      })
      if (res) {
        setQuestionList(res.problemList.reverse())
      }
    }
  }, [cid])

  useEffect(() => {
    getQuestionList()
  }, [getQuestionList])

  const onSolve = useCallback(
    (qid: string) => () => {
      push(`/class/${cid}/question/${qid}/solve`)
    },
    [cid, push]
  )

  const onAddOption = useCallback(
    (qid: string) => () => {
      push(`/class/${cid}/question/${qid}/create-option`)
    },
    [cid, push]
  )

  return (
    <BoxShadow>
      <QuizListHeader />
      {questionList.map((question, i) => (
        <QuizListContent
          key={i}
          title={JSON.parse(question.stem_text).blocks[0].text}
          options={question.options.length}
          date={question.updatedAt ? new Date(question.updatedAt) : new Date(question.createdAt)}
          type={i + 1 === questionList.length ? 'End' : 'Content'}
          onSolve={onSolve(question._id)}
          onAddOption={onAddOption(question._id)}
        />
      ))}
    </BoxShadow>
  )
}

const BoxShadow = styled.div`
  box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.12);
  border-radius: 8px;
`
