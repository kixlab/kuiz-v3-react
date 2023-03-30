import { LoadQuestionListParams, LoadQuestionListResults } from '@api/loadQuestionList'
import { LoadTopicsParams, LoadTopicsResults } from '@api/loadTopics'
import { FloatingButton } from '@components/basic/button/Floating'
import { SelectInput } from '@components/basic/input/Select'
import { QuizListHeader } from '@components/QuizListHeader'
import { QuizListItem } from '@components/QuizListItem'
import { Sheet } from '@components/Sheet'
import styled from '@emotion/styled'
import { QStem } from '@server/db/qstem'
import { request } from '@utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export default function Page() {
  const { query, push } = useRouter()
  const cid = query.cid as string | undefined
  const topic = query.topic as string | undefined
  const [questionList, setQuestionList] = useState<QStem[]>([])
  const [topics, setTopics] = useState<string[]>([])

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

  const onSelectTopic = useCallback(
    (i: number) => {
      const t = topics[i]
      push(`/class/${cid}?topic=${t}`, undefined, { shallow: true })
    },
    [cid, push, topics]
  )

  useEffect(() => {
    if (cid) {
      request<LoadQuestionListParams, LoadQuestionListResults>(`loadQuestionList`, {
        cid,
        topic,
      }).then(res => {
        if (res) {
          setQuestionList(res.problemList.reverse())
        }
      })
    }
  }, [cid, setQuestionList, topic])

  useEffect(() => {
    if (cid) {
      request<LoadTopicsParams, LoadTopicsResults>(`loadTopics`, {
        cid,
      }).then(res => {
        if (res) {
          setTopics(res.topics)
        }
      })
    }
  }, [cid])

  return (
    <>
      <FilterContainer>
        <SelectInput options={topics} value={topic ?? null} onSelect={onSelectTopic} placeholder={'Select topic'} />
      </FilterContainer>

      <Sheet padding={0} gap={8}>
        <QuizListHeader />
        {questionList.map((question, i) => (
          <QuizListItem
            key={i}
            title={question.stem_text}
            options={question.options.length}
            date={question.updatedAt ? new Date(question.updatedAt) : new Date(question.createdAt)}
            onSolve={onSolve(question._id)}
            onAddOption={onAddOption(question._id)}
          />
        ))}
      </Sheet>
      <FloatingButton onClick={onCreateQuestion}>Create a New Question</FloatingButton>
    </>
  )
}

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`
