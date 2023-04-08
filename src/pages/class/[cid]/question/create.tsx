import { CreateOptionParams, CreateOptionResults } from '@api/createOption'
import { CreateQStemParams, CreateQStemResults } from '@api/createQuestion'
import { LoadTopicsParams, LoadTopicsResults } from '@api/loadTopics'
import { FillButton } from '@components/basic/button/Fill'
import { SelectInput } from '@components/basic/input/Select'
import { Label } from '@components/basic/Label'
import { Sheet } from '@components/Sheet'
import { TextEditor } from '@components/TextEditor'
import styled from '@emotion/styled'
import { RootState } from '@redux/store'
import { request } from '@utils/api'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const BLOOMS_TAXONOMY = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create']

export default function Page() {
  const { push, query } = useRouter()
  const cid = query.cid as string | undefined
  const [answer, setAnswer] = useState('')
  const [topics, setTopics] = useState<string[]>([])
  const [topic, setTopic] = useState(topics[0] ?? '')
  const [method, setMethod] = useState(BLOOMS_TAXONOMY[0])
  const [explanation, setExplanation] = useState('')
  const [question, setQuestion] = useState('')
  const className = useSelector((state: RootState) => state.userInfo.classes.find(c => c.cid === cid)?.name)

  const submitStem = useCallback(async () => {
    if (question.trim().length === 0) {
      alert('Please enter a question.')
      return
    }
    if (answer.trim().length === 0) {
      alert('Please enter an answer.')
      return
    }

    if (cid) {
      const res = await request<CreateQStemParams, CreateQStemResults>(`createQuestion`, {
        qstemObj: {
          stem_text: question,
          explanation,
          keyword: [],
          cid,
          options: [],
          optionSets: [],
          learningObjective: `To ${method} the concept of ${topic}`,
        },
      })
      if (res) {
        await request<CreateOptionParams, CreateOptionResults>(`createOption`, {
          optionData: {
            option_text: answer,
            is_answer: true,
            explanation,
            class: cid,
            qstem: res.data,
            learningObjective: `To ${method} the concept of ${topic}`,
            keywords: [],
          },
          similarOptions: [],
        })

        push('/class/' + cid + '/question/' + res.data + '/create-option')
      }
    }
  }, [question, answer, cid, explanation, method, topic, push])

  const onSelectTopic = useCallback(
    (i: number) => {
      setTopic(topics[i])
    },
    [topics]
  )

  const onSelectMethod = useCallback((i: number) => {
    setMethod(BLOOMS_TAXONOMY[i])
  }, [])

  useEffect(() => {
    if (cid) {
      request<LoadTopicsParams, LoadTopicsResults>(`loadTopics`, { cid }).then(res => {
        if (res) {
          setTopics(res.topics.map(t => t.label))
        }
      })
    }
  }, [cid])

  return (
    <>
      <Head>
        <title>Create Question | {className}</title>
      </Head>
      <Sheet gap={0}>
        <Label color="blue" size={0} marginBottom={8}>
          Learning Objective
        </Label>
        <TopicContainer>
          To <SelectInput options={BLOOMS_TAXONOMY} value={method} onSelect={onSelectMethod} />
          the concept of
          <SelectInput options={topics} value={topic} onSelect={onSelectTopic} placeholder="topic" />
        </TopicContainer>

        <Label color="blue" size={0} marginBottom={8}>
          Question
        </Label>
        <TextEditor placeholder="(e.g., )" value={question} onChange={setQuestion} marginBottom={20} />

        <Label color="blue" size={0} marginBottom={8}>
          Explanation
        </Label>
        <TextEditor
          placeholder="Explanation of your answer"
          value={explanation}
          onChange={setExplanation}
          marginBottom={20}
        />

        <Label color="blue" size={0} marginBottom={8}>
          Answer
        </Label>
        <TextEditor placeholder="Answer of your question" value={answer} onChange={setAnswer} marginBottom={20} />
        <FillButton onClick={submitStem}>Submit</FillButton>
      </Sheet>
    </>
  )
}

const TopicContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1ch;
  margin-bottom: 20px;
`
