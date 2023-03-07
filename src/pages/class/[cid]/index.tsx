import { LoadProblemListParams, LoadProblemListResults } from '@api/loadProblemList'
import { SmallPrimaryButton } from '@components/basic/button/SmallPrimary'
import { QuizListItem as QuizListItem } from '@components/QuizListItem'
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

  useEffect(() => {
    if (cid) {
      request<LoadProblemListParams, LoadProblemListResults>(`loadProblemList`, {
        cid,
      }).then(res => {
        if (res) {
          setQuestionList(res.problemList.reverse())
        }
      })
    }
  }, [cid, setQuestionList])

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

  const onCreateQuestion = useCallback(() => {
    push(`/class/${cid}/question/create`)
  }, [cid, push])

  return (
    <>
      <SmallPrimaryButton onClick={onCreateQuestion}>Create a New Question</SmallPrimaryButton>
      <BoxShadow>
        <QuizListHeader />
        {questionList.map((question, i) => (
          <QuizListItem
            key={i}
            title={JSON.parse(question.stem_text).blocks[0].text}
            options={question.options.length}
            date={question.updatedAt ? new Date(question.updatedAt) : new Date(question.createdAt)}
            onSolve={onSolve(question._id)}
            onAddOption={onAddOption(question._id)}
          />
        ))}
      </BoxShadow>
    </>
  )
}

const BoxShadow = styled.div`
  box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.12);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 40px;
`
