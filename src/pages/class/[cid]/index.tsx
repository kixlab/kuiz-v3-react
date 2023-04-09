import { LoadQuestionListParams, LoadQuestionListResults } from '@api/loadQuestionList'
import { LoadTopicsParams, LoadTopicsResults } from '@api/loadTopics'
import { LoadUserActivityParams, LoadUserActivityResults } from '@api/loadUserActivity'
import { FloatingButton } from '@components/basic/button/Floating'
import { SelectInput } from '@components/basic/input/Select'
import { Label } from '@components/basic/Label'
import { ProgressBar } from '@components/ProgressBar'
import { QuizListHeader } from '@components/QuizListHeader'
import { QuizListItem } from '@components/QuizListItem'
import { Sheet } from '@components/Sheet'
import styled from '@emotion/styled'
import { RootState } from '@redux/store'
import { QStem } from '@server/db/qstem'
import { Topic } from '@server/db/topic'
import { palette } from '@styles/theme'
import { request } from '@utils/api'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CONTENT_MAX_WIDTH } from 'src/constants/ui'

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
        <div>
          <Label color="white" marginBottom={8}>
            Topic
          </Label>
          <SelectInput
            options={topics.map(t => t.label)}
            value={topic ?? null}
            onSelect={onSelectTopic}
            placeholder={'Select topic'}
          />
        </div>
        <div>
          <Label color="white" marginBottom={8}>
            Progress
          </Label>
          <Progress>
            {userMadeQuestions} Questions{' '}
            <ProgressBar percentage={(100 * userMadeQuestions) / (selectedTopic?.requiredQuestionNumber ?? 100)}>
              {selectedTopic?.requiredQuestionNumber ?? '-'}
            </ProgressBar>
          </Progress>
          <Progress>
            {userMadeOptions} Options{' '}
            <ProgressBar percentage={(100 * userMadeOptions) / (selectedTopic?.requiredOptionNumber ?? 100)}>
              {selectedTopic?.requiredOptionNumber ?? '-'}
            </ProgressBar>
          </Progress>
        </div>
      </InformationContainer>

      <Sheet padding={0} gap={0} marginTop={20}>
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
      <FloatingButton onClick={onCreateQuestion} right={`calc((100vw - ${CONTENT_MAX_WIDTH}px) / 2)`} bottom={40}>
        Create a New Question
      </FloatingButton>
    </>
  )
}

const InformationContainer = styled.div`
  width: calc(100% - 40px);
  display: grid;
  padding: 12px 20px;
  background-color: ${palette.primaryMain};
  color: ${palette.common.white};
  border-radius: 8px;
  grid-template-columns: auto 1fr;
  gap: 20px;
`

const Progress = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;

  :not(:last-child) {
    margin-bottom: 8px;
  }
`
