import { LoadQuestionListParams, LoadQuestionListResults } from '@api/loadQuestionList'
import { LoadClassInfoParams, LoadClassInfoResults } from '@api/loadClassInfo'
import { LoadUserActivityParams, LoadUserActivityResults } from '@api/loadUserActivity'
import { FillButton } from '@components/basic/button/Fill'
import { SelectInput } from '@components/basic/input/Select'
import { Label } from '@components/basic/Label'
import { Pagination } from '@components/pagination'
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
import { MOBILE_WIDTH_THRESHOLD } from 'src/constants/ui'

export default function Page() {
  const { query, push } = useRouter()
  const cid = query.cid as string | undefined
  const topic = query.topic as string | undefined
  const currentPage = query.page as string | undefined
  const page = currentPage === undefined ? 1 : parseInt(currentPage)
  const [questionList, setQuestionList] = useState<QStem[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [userMadeOptions, setUserMadeOptions] = useState(0)
  const [userMadeQuestions, setUserMadeQuestions] = useState(0)
  const [maxNumberOfPages, setMaxNumberOfPages] = useState(1)
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
      push(`/class/${cid}/question/${qid}/create-option?callbackUrl=${location.href}`)
    },
    [cid, push]
  )

  const onCreateQuestion = useCallback(() => {
    if (topic) {
      push(`/class/${cid}/question/create?topic=${topic}`)
    } else {
      push(`/class/${cid}/question/create`)
    }
  }, [cid, push, topic])

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
        page,
        questionsPerPage: 10,
      }).then(res => {
        if (res) {
          setQuestionList(res.problemList.reverse())
          setMaxNumberOfPages(res.maxPages)
        }
      })
    }
  }, [cid, setQuestionList, topic, topics, page])

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
      request<LoadClassInfoParams, LoadClassInfoResults>(`loadClassInfo`, {
        cid,
      }).then(res => {
        if (res) {
          setTopics(res.topics)
          if (topic === undefined) {
            if (res.currentTopic) {
              const indexOfTopic = res.topics.findIndex(topic => topic._id === res.currentTopic)
              if (indexOfTopic != -1) {
                push(`/class/${cid}?topic=${res.topics[indexOfTopic].label}`, undefined, { shallow: true })
              }
            }
          }
        }
      })
    }
  }, [cid, push, topic])

  return (
    <>
      <Head>
        <title>{`Questions | ${className}`}</title>
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
              🎯 {selectedTopic?.requiredQuestionNumber ?? '-'}
            </ProgressBar>
          </Progress>
          <Progress>
            {userMadeOptions} Options{' '}
            <ProgressBar percentage={(100 * userMadeOptions) / (selectedTopic?.requiredOptionNumber ?? 100)}>
              🎯 {selectedTopic?.requiredOptionNumber ?? '-'}
            </ProgressBar>
          </Progress>
        </div>
        <div>
          <Label color="white" marginBottom={8}>
            Activity
          </Label>
          <FillButton onClick={onCreateQuestion} fill={'primaryDark'}>
            Create a Question
          </FillButton>
        </div>
      </InformationContainer>

      <Sheet padding={0} gap={0} marginTop={24}>
        <QuizListHeader />
        {questionList.map((question, i) => (
          <QuizListItem
            key={i}
            title={question.stem_text}
            options={question.options.length}
            onSolve={onSolve(question._id)}
            onAddOption={onAddOption(question._id)}
          />
        ))}
        {questionList.length === 0 && <Empty>No questions yet. Please create one!</Empty>}
      </Sheet>

      {maxNumberOfPages > 1 && (
        <Pagination
          numberOfPages={maxNumberOfPages + 8}
          currentPage={page}
          URL={`${cid}?topic=${topic}`}
          marginTop={24}
        />
      )}
    </>
  )
}

const InformationContainer = styled.div`
  width: calc(100% - 40px);
  display: grid;
  padding: 20px;
  background-color: ${palette.primaryMain};
  color: ${palette.common.white};
  border-radius: 8px;
  grid-template-columns: auto 1fr auto;
  gap: 40px;
  box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.12);
  @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`

const Progress = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;

  :not(:last-child) {
    margin-bottom: 8px;
  }
`

const Empty = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: grey;
`
