import { CreateMCQParams, CreateMCQResults } from '@api/createMCQ'
import { LoadClassInfoParams, LoadClassInfoResults } from '@api/loadClassInfo'
import { Divider } from '@components/Divider'
import { OptionHelperMCQ } from '@components/OptionHelperMCQ'
import { Required } from '@components/Required'
import { Sheet } from '@components/Sheet'
import { StarterHelper } from '@components/StarterHelper'
import { StemHelper } from '@components/StemHelper'
import { Label } from '@components/basic/Label'
import { FillButton } from '@components/basic/button/Fill'
import { OptionButton } from '@components/basic/button/Option'
import { StrokeButton } from '@components/basic/button/Stroke'
import { RadioInput } from '@components/basic/input/Radio'
import { SelectInput } from '@components/basic/input/Select'
import { TextInput } from '@components/basic/input/Text'
import styled from '@emotion/styled'
import { RootState } from '@redux/store'
import { palette } from '@styles/theme'
import { request } from '@utils/api'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BLOOMS_TAXONOMY } from 'src/constants/bloomsTaxonomy'
import { CONDITION } from 'src/constants/conditions'
import { useAPILoading } from 'src/hooks/useButton'
import { useQueryParam } from 'src/hooks/useQueryParam'

export default function Page() {
  const { isLoading: submitStemLoading, callAPI: submitStemHandleClick } = useAPILoading()
  const { push, query } = useRouter()
  const cid = query.cid as string | undefined
  const [topics, setTopics] = useState<string[]>([])
  const [topic, setTopic] = useState((query.topic as string | undefined) ?? '')
  const [method, setMethod] = useState(BLOOMS_TAXONOMY[0])
  const [explanation, setExplanation] = useState('')
  const [question, setQuestion] = useState('')
  const className = useSelector((state: RootState) => state.userInfo.classes.find(c => c.cid === cid)?.name)
  const [condition] = useQueryParam('c')
  const [isAnswer, setIsAnswer] = useState(false)
  const [option, setOption] = useState('')
  const [ansList, setAnsList] = useState<string[]>([])
  const [disList, setDistList] = useState<string[]>([])

  const submitStem = useCallback(async () => {
    const fields = [topic, explanation, question]
    const fieldNames = ['topic', 'explanation', 'question']
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i]
      const fieldName = fieldNames[i]
      if (field.trim().length === 0) {
        alert(`Please enter ${fieldName}.`)
        return
      }
    }
    if (ansList.length === 0 || disList.length === 0) {
      alert('Please add at least one answer and one distractor.')
      return
    }
    if (ansList.length + disList.length < 4) {
      alert('Please add at least 4 options.')
      return
    }
    await submitStemHandleClick<void>(async () => {
      if (cid) {
        await request<CreateMCQParams, CreateMCQResults>(`createMCQ`, {
          stem_text: question,
          explanation,
          keyword: [],
          cid,
          options: [],
          optionSets: [],
          learningObjective: `To ${method} the concept of ${topic}`,
          ansList,
          disList,
        })
        push(`/class/${cid}?topic=${topic}&c=${condition}`)
      }
    })
  }, [topic, explanation, question, submitStemHandleClick, cid, method, ansList, disList, push, condition])

  const onSelectTopic = useCallback(
    (i: number) => {
      setTopic(topics[i])
    },
    [topics]
  )

  const onSelectMethod = useCallback((i: number) => {
    setMethod(BLOOMS_TAXONOMY[i])
  }, [])

  const addOption = useCallback(async () => {
    if (option.trim().length === 0) {
      alert('Please enter option.')
      return
    }
    if (isAnswer) {
      setAnsList(ansList => [...ansList, option])
    } else {
      setDistList(disList => [...disList, option])
    }
    setOption('')
  }, [isAnswer, option])

  useEffect(() => {
    if (cid) {
      request<LoadClassInfoParams, LoadClassInfoResults>(`loadClassInfo`, { cid }).then(res => {
        if (res) {
          setTopics(res.topics.map(t => t.label))
        }
      })
    }
  }, [cid])

  return (
    <>
      <Head>
        <title>{`Create Question | ${className}`}</title>
      </Head>
      <Sheet gap={0}>
        <Label color={'primaryMain'} size={0} marginBottom={8}>
          Learning Objective <Required />
        </Label>
        <TopicContainer>
          To <SelectInput options={BLOOMS_TAXONOMY} value={method} onSelect={onSelectMethod} />
          the concept of
          <SelectInput options={topics} value={topic} onSelect={onSelectTopic} placeholder="topic" />
        </TopicContainer>

        <Label color={'primaryMain'} size={0} marginBottom={8}>
          Question <Required />
        </Label>
        <TextInput
          placeholder="E.g. What benefits do keyboard shortcuts provide users?"
          value={question}
          onChange={setQuestion}
          marginBottom={8}
        />

        {[CONDITION.AIOnly, CONDITION.ModularAI].some(c => c === condition) && (
          <StarterHelper cid={cid} topic={topic} />
        )}

        {[CONDITION.AIOnly, CONDITION.ModularAI].some(c => c === condition) && (
          <StemHelper cid={cid} question={question} method={method} topic={topic} explanation={explanation} />
        )}

        <Label color={'primaryMain'} size={0} marginBottom={8} marginTop={12}>
          Explanation <Required />
        </Label>
        <TextInput
          placeholder="Provide an explanation for the question and the intent behind the question."
          value={explanation}
          onChange={setExplanation}
        />

        <Divider marginVertical={24} />

        <Label color={'primaryMain'} size={0} marginBottom={12}>
          Options <Required />
        </Label>

        <Label size={0} marginBottom={8}>
          ✅ Answers
        </Label>
        {ansList.map((item, i) => (
          <OptionButton key={i} state={true} selected={false} marginBottom={8}>
            {item}
          </OptionButton>
        ))}
        {ansList.length === 0 && <Placeholder>No answers yet. Add some!</Placeholder>}

        <Label marginBottom={8} marginTop={16}>
          ❌ Distractors
        </Label>
        {disList.map((item, i) => (
          <OptionButton key={i} state={true} selected={false} marginBottom={i < disList.length - 1 ? 8 : 0}>
            {item}
          </OptionButton>
        ))}
        {disList.length === 0 && <Placeholder>No distractors yet. Add some!</Placeholder>}

        <Divider marginVertical={24} />

        <RadioInput options={['Answer', 'Distractor']} value={isAnswer ? 0 : 1} onSelect={i => setIsAnswer(i === 0)} />

        <TextInput
          placeholder={`Suggest ${isAnswer ? 'an answer' : 'a distractor'} for this question`}
          onChange={setOption}
          value={option}
          marginTop={8}
        />

        {[CONDITION.AIOnly, CONDITION.ModularAI].some(c => c === condition) && (
          <OptionHelperMCQ
            cid={cid}
            learningObjective={`To ${method} the concept of ${topic}`}
            explanation={explanation}
            stem={question}
            isAnswer={isAnswer}
            disList={disList}
            ansList={ansList}
            option={option}
          />
        )}

        <StrokeButton onClick={addOption} marginTop={8}>
          Add to the list
        </StrokeButton>

        <FillButton onClick={submitStem} disabled={submitStemLoading} marginTop={16}>
          Submit
        </FillButton>
      </Sheet>
    </>
  )
}

const TopicContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1ch;
  margin-bottom: 24px;
  font-size: 16px;
`

const Placeholder = styled.div`
  color: ${palette.grey500};
`
