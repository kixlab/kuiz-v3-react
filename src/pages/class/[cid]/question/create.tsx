import { CreateOptionParams, CreateOptionResults } from '@api/createOption'
import { CreateQStemParams, CreateQStemResults } from '@api/createQuestion'
import {
  GetGPTQuestionTopicSuggestionParams,
  GetGPTQuestionTopicSuggestionResults,
} from '@api/LLM/getGPTQuestionTopicSuggestion'
import { GetGPTRephrasedQuestionParams, GetGPTRephrasedQuestionResults } from '@api/LLM/getGPTRephrasedQuestion'
import { GetGPTSyntaxCheckerParams, GetGPTSyntaxCheckerResults } from '@api/LLM/getGPTSyntaxChecker'
import { LoadClassInfoParams, LoadClassInfoResults } from '@api/loadClassInfo'
import { FillButton } from '@components/basic/button/Fill'
import { OptionButton } from '@components/basic/button/Option'
import { StrokeButton } from '@components/basic/button/Stroke'
import { SelectInput } from '@components/basic/input/Select'
import { TextInput } from '@components/basic/input/Text'
import { Label } from '@components/basic/Label'
import { Required } from '@components/Required'
import { Sheet } from '@components/Sheet'
import styled from '@emotion/styled'
import { RootState } from '@redux/store'
import { request } from '@utils/api'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useButton } from 'src/hooks/useButton'

const BLOOMS_TAXONOMY = ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create']

export default function Page() {
  const { isLoading, handleClick } = useButton()
  const { push, query } = useRouter()
  const cid = query.cid as string | undefined
  const [answer, setAnswer] = useState('')
  const [topics, setTopics] = useState<string[]>([])
  const [topic, setTopic] = useState((query.topic as string | undefined) ?? '')
  const [method, setMethod] = useState(BLOOMS_TAXONOMY[0])
  const [explanation, setExplanation] = useState('')
  const [question, setQuestion] = useState('')
  const className = useSelector((state: RootState) => state.userInfo.classes.find(c => c.cid === cid)?.name)
  const [questionStarter, setQuestionStarter] = useState<string | undefined>(undefined)
  const [questionTopicSuggestion, setQuestionTopicSuggestion] = useState<string[]>([])
  const [syntaxCheckedQuestion, setSyntaxCheckedQuestion] = useState<string | undefined>(undefined)
  const [rephrasedQuestion, setRephrasedQuestion] = useState<string | undefined>()

  const submitStem = useCallback(async () => {
    const fields = [topic, explanation, question, answer]
    const fieldNames = ['topic', 'explanation', 'question', 'answer']
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i]
      const fieldName = fieldNames[i]
      if (field.trim().length === 0) {
        alert(`Please enter ${fieldName}.`)
        return
      }
    }
    await handleClick<void>(async () => {
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
              class: cid,
              qstem: res.data,
              keywords: [],
            },
            similarOptions: [],
          })

          push(`/class/${cid}?topic=${topic}`)
        }
      }
    })
  }, [question, answer, cid, explanation, method, topic, push, handleClick])

  const onSelectTopic = useCallback(
    (i: number) => {
      setTopic(topics[i])
    },
    [topics]
  )

  const onSelectMethod = useCallback((i: number) => {
    setMethod(BLOOMS_TAXONOMY[i])
  }, [])

  const onQuestionStarter = useCallback(() => {
    //question stem template Question Stem Templates (Converted from King 1990 & Yu 2009)
    const questionStarters = [
      'What might occur if … ?',
      'What is the difference between … and … ?',
      'How are … and … similar?',
      '… is a problem because …. . What is a possible solution for this?',
      'How does … affect …?',
      'What is the meaning of … ?',
      'Why is …. important?',
      'How is … related to …. ? ',
      'What causes …. ?',
      'What is an example of … ?',
    ]
    setQuestionStarter(questionStarters[Math.floor(Math.random() * questionStarters.length)])
  }, [])

  const onQuestionTopic = useCallback(async () => {
    if (cid) {
      const GPTTopicSuggestions = await request<
        GetGPTQuestionTopicSuggestionParams,
        GetGPTQuestionTopicSuggestionResults
      >(`LLM/getGPTQuestionTopicSuggestion`, {
        topic,
        cid,
        method,
      })
      if (GPTTopicSuggestions) {
        setQuestionTopicSuggestion(GPTTopicSuggestions.topics)
      }
    }
  }, [cid, method, topic])

  const onSyntaxCheck = useCallback(async () => {
    if (question && question.length > 0) {
      const GPTSyntaxCheckedQuestion = await request<GetGPTSyntaxCheckerParams, GetGPTSyntaxCheckerResults>(
        `LLM/getGPTSyntaxChecker`,
        {
          question,
        }
      )
      setSyntaxCheckedQuestion(GPTSyntaxCheckedQuestion?.syntaxCheckedQuestion)
    }
  }, [question])

  const onRephraseQuestion = useCallback(async () => {
    if (cid && question && question.length > 0) {
      const GPTRephrasedQuestion = await request<GetGPTRephrasedQuestionParams, GetGPTRephrasedQuestionResults>(
        `LLM/getGPTRephrasedQuestion`,
        {
          topic,
          cid,
          method,
          question,
        }
      )
      setRephrasedQuestion(GPTRephrasedQuestion?.rephrasedQuestion)
    }
  }, [question, cid, topic, method])

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
          marginBottom={20}
        />
        {questionTopicSuggestion && questionTopicSuggestion.length !== 0 ? (
          <>
            <Label color={'primaryMain'} size={0} marginTop={5}>
              Suggested Question Topics
            </Label>
            <RowContainer>
              {questionTopicSuggestion.map((item, i) => (
                <OptionButton key={i} state={true} selected={false} marginBottom={5}>
                  {item}
                </OptionButton>
              ))}
            </RowContainer>
          </>
        ) : null}
        {questionStarter && (
          <>
            <Label color={'primaryMain'} size={0} marginBottom={10}>
              Suggested Question Starters
            </Label>
            <OptionButton state={true} selected={false} marginBottom={5}>
              {questionStarter}
            </OptionButton>
          </>
        )}
        {rephrasedQuestion && (
          <>
            <Label color={'primaryMain'} size={0} marginTop={10} marginBottom={10}>
              Rephrased Question
            </Label>
            <OptionButton state={true} selected={false} marginBottom={5}>
              {rephrasedQuestion}
            </OptionButton>
          </>
        )}

        {syntaxCheckedQuestion && (
          <>
            <Label color={'primaryMain'} size={0} marginTop={10} marginBottom={10}>
              Syntax Checked Question
            </Label>
            <OptionButton state={true} selected={false} marginBottom={5}>
              {syntaxCheckedQuestion}
            </OptionButton>
          </>
        )}

        <RowContainer>
          <div>Suggest: </div>
          <FillButton onClick={onQuestionStarter}>A question Starter</FillButton>
          <FillButton onClick={onQuestionTopic}>A question topic</FillButton>
        </RowContainer>
        <Label color={'primaryMain'} size={0} marginBottom={8}>
          Explanation <Required />
        </Label>
        <TextInput
          placeholder="Provide an explanation for the question and the intent behind the question."
          value={explanation}
          onChange={setExplanation}
          marginBottom={20}
        />

        <Label color={'primaryMain'} size={0} marginBottom={8}>
          Answer <Required />
        </Label>
        <TextInput
          placeholder="Suggest one correct answer for the question"
          value={answer}
          onChange={setAnswer}
          marginBottom={20}
        />

        <FillButton onClick={submitStem} disabled={isLoading}>
          Submit
        </FillButton>
        <RowContainer>
          <StrokeButton onClick={onSyntaxCheck}>Syntax Check Question</StrokeButton>
          <StrokeButton onClick={onRephraseQuestion}>Rephrase Question</StrokeButton>
        </RowContainer>
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
const RowContainer = styled.div`
  align-items: baseline;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  margin: 10px 0;
`
