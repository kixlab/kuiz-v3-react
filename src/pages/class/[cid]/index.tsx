import { LoadQuestionListParams, LoadQuestionListResults } from '@api/loadQuestionList'
import { LoadTopicsParams, LoadTopicsResults } from '@api/loadTopics'
import { LoadUserActivityParams, LoadUserActivityResults } from '@api/loadUserActivity'
import { FloatingButton } from '@components/basic/button/Floating'
import { SelectInput } from '@components/basic/input/Select'
import { QuizListHeader } from '@components/QuizListHeader'
import { QuizListItem } from '@components/QuizListItem'
import { Sheet } from '@components/Sheet'
import styled from '@emotion/styled'
import { RootState } from '@redux/store'
import { QStem } from '@server/db/qstem'
import { Topic } from '@server/db/topic'
import { palette, typography } from '@styles/theme'
import { request } from '@utils/api'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Page() {
  const { query, push } = useRouter()
  const cid = query.cid as string | undefined
  const topic = query.topic as string | undefined
  const [questionList, setQuestionList] = useState<QStem[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [userMadeOptions, setUserMadeOptions] = useState(0)
  const [userMadeQuestions, setUserMadeQuestions] = useState(0)
  const className = useSelector((state: RootState) => state.userInfo.classes.find(c => c.cid === cid)?.name)
  const selectedTopic = topics.find(t => t.label === topic)

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
      push(`/class/${cid}?topic=${t.label}`, undefined, { shallow: true })
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
  }, [cid, setQuestionList, topic, topics])

  useEffect(() => {
    if (cid) {
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
  }, [cid, topic])

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
      <Head>
        <title>Questions | {className}</title>
      </Head>
      <InformationContainer>
        <UserInfoContainer>
          <InfoText>
            You have generated {userMadeQuestions} / {selectedTopic?.requiredQuestionNumber} Questions
          </InfoText>
          <InfoText>
            You have generated {userMadeOptions} / {selectedTopic?.requiredOptionNumber} Options
          </InfoText>
        </UserInfoContainer>
        <FilterContainer>
          <SelectInput
            options={topics.map(t => t.label)}
            value={topic ?? null}
            onSelect={onSelectTopic}
            placeholder={'Select topic'}
          />
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
