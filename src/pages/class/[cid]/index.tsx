import { LoadQuestionListParams, LoadQuestionListResults } from '@api/loadQuestionList'
import { LoadTopicsParams, LoadTopicsResults } from '@api/loadTopics'
import { LoadTopicsWithGoalsParams, LoadTopicsWithGoalsResults } from '@api/loadTopicsWithGoals'
import { LoadUserActivityParams, LoadUserActivityResults } from '@api/loadUserActivity'
import { FloatingButton } from '@components/basic/button/Floating'
import { SelectInput } from '@components/basic/input/Select'
import { QuizListHeader } from '@components/QuizListHeader'
import { QuizListItem } from '@components/QuizListItem'
import { Sheet } from '@components/Sheet'
import styled from '@emotion/styled'
import { QStem } from '@server/db/qstem'
import { palette, typography } from '@styles/theme'
import { request } from '@utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export default function Page() {
  const { query, push } = useRouter()
  const cid = query.cid as string | undefined
  const topic = query.topic as string | undefined
  const [questionList, setQuestionList] = useState<QStem[]>([])
  const [topics, setTopics] = useState<string[]>([])
  const [userMadeOptions, setUserMadeOptions] = useState(0)
  const [userMadeQuestions, setUserMadeQuestions] = useState(0)
  const [optionsGoal, setOptionsGoal] = useState<number[]>()
  const [questionsGoal, setQuestionsGoal] = useState<number[]>()
  const [currentTopic, setCurrentTopic] = useState(-1)

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
      if (topic) {
        const index = topics.indexOf(topic)
        setCurrentTopic(index)
      }
      request<LoadQuestionListParams, LoadQuestionListResults>(`loadQuestionList`, {
        cid,
        topic,
      }).then(res => {
        if (res) {
          setQuestionList(res.problemList.reverse())
        }
      })

      request<LoadUserActivityParams, LoadUserActivityResults>(`loadUserActivity`, {
        cid,
        topic,
      }).then(res => {
        if (res) {
          setUserMadeQuestions(res.numberOfStems)
          setUserMadeOptions(res.numberOfOptions)
        }
      })
    }
  }, [cid, setQuestionList, topic, topics])

  useEffect(() => {
    if (cid) {
      request<LoadTopicsWithGoalsParams, LoadTopicsWithGoalsResults>(`loadTopicsWithGoals`, {
        cid,
      }).then(res => {
        if (res) {
          const topics: string[] = []
          const optionsGoal: number[] = []
          const questionsGoal: number[] = []
          res.topics.forEach(topic => {
            topics.push(topic.topic)
            optionsGoal.push(topic.optionsGoal)
            questionsGoal.push(topic.questionsGoal)
          })
          setTopics(topics)
          setOptionsGoal(optionsGoal)
          setQuestionsGoal(questionsGoal)
        }
      })
    }
  }, [cid])

  return (
    <>
      <InformationContainer>
        <UserInfoContainer>
          <InfoText>
            You have generated {userMadeQuestions}
            {optionsGoal && optionsGoal[currentTopic] >= 0 ? `/${optionsGoal[currentTopic]}` : null} Questions
          </InfoText>
          <InfoText>
            You have generated {userMadeOptions}
            {questionsGoal && questionsGoal[currentTopic] >= 0 ? `/${questionsGoal[currentTopic]}` : null} Options
          </InfoText>
        </UserInfoContainer>
        <FilterContainer>
          <SelectInput options={topics} value={topic ?? null} onSelect={onSelectTopic} placeholder={'Select topic'} />
        </FilterContainer>
      </InformationContainer>
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

const InformationContainer = styled.div`
  ${typography.b02b};
  width: calc(100% - 40px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  background-color: ${palette.primary.dark};
  color: ${palette.common.white};
  border-radius: 8px;
  margin: 10px 0;
`

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-around;
`

const InfoText = styled.div`
  color: ${palette.common.white};
  margin: 5px;
`
