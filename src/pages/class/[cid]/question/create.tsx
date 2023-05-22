import { GetGrammarCheckParams, GetGrammarCheckResults } from '@api/LLM/getGrammarCheck'
import { GetQuestionIdeasParams, GetQuestionIdeasResults } from '@api/LLM/getQuestionIdeas'
import { GetQuestionTemplatesParams, GetQuestionTemplatesResults } from '@api/LLM/getQuestionTemplates'
import { GetRephrasedQuestionParams, GetRephrasedQuestionResults } from '@api/LLM/getRephrasedQuestion'
import { CreateOptionParams, CreateOptionResults } from '@api/createOption'
import { CreateQStemParams, CreateQStemResults } from '@api/createQuestion'
import { LoadClassInfoParams, LoadClassInfoResults } from '@api/loadClassInfo'
import { Required } from '@components/Required'
import { Sheet } from '@components/Sheet'
import { Item } from '@components/basic/Item'
import { Label } from '@components/basic/Label'
import { FillButton } from '@components/basic/button/Fill'
import { SmallSecondaryButton } from '@components/basic/button/SmallSecondary'
import { SelectInput } from '@components/basic/input/Select'
import { TextInput } from '@components/basic/input/Text'
import { CaptionText } from '@components/basic/text/Caption'
import styled from '@emotion/styled'
import { RootState } from '@redux/store'
import { palette, typography } from '@styles/theme'
import { request } from '@utils/api'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BLOOMS_TAXONOMY } from 'src/constants/bloomsTaxonomy'
import { useAPILoading } from 'src/hooks/useButton'

export default function Page() {
  const { isLoading: onTemplateLoading, callAPI: onTemplateClick } = useAPILoading()
  const { isLoading: onQuestionTopicLoading, callAPI: onQuestionTopicHandleClick } = useAPILoading()
  const { isLoading: submitStemLoading, callAPI: submitStemHandleClick } = useAPILoading()
  const { isLoading: onSyntaxCheckLoading, callAPI: onSyntaxCheckHandleClick } = useAPILoading()
  const { isLoading: onRephraseQuestionLoading, callAPI: onRephraseQuestionHandleClick } = useAPILoading()
  const { push, query } = useRouter()
  const cid = query.cid as string | undefined
  const [answer, setAnswer] = useState('')
  const [topics, setTopics] = useState<string[]>([])
  const [topic, setTopic] = useState((query.topic as string | undefined) ?? '')
  const [method, setMethod] = useState(BLOOMS_TAXONOMY[0])
  const [explanation, setExplanation] = useState('')
  const [question, setQuestion] = useState('')
  const className = useSelector((state: RootState) => state.userInfo.classes.find(c => c.cid === cid)?.name)
  const [questionStarter, setQuestionStarter] = useState<string[]>([])
  const [questionTopicSuggestion, setQuestionTopicSuggestion] = useState<string[]>([])
  const [syntaxCheckedQuestion, setSyntaxCheckedQuestion] = useState<string | undefined>(undefined)
  const [rephrasedQuestion, setRephrasedQuestion] = useState<string[]>([])

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
    await submitStemHandleClick<void>(async () => {
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
  }, [question, answer, cid, explanation, method, topic, push, submitStemHandleClick])

  const onSelectTopic = useCallback(
    (i: number) => {
      setTopic(topics[i])
    },
    [topics]
  )

  const onSelectMethod = useCallback((i: number) => {
    setMethod(BLOOMS_TAXONOMY[i])
  }, [])

  const onQuestionStarter = useCallback(async () => {
    if (cid) {
      const res = await onTemplateClick(() =>
        request<GetQuestionTemplatesParams, GetQuestionTemplatesResults>('LLM/getQuestionTemplates', {
          cid,
        })
      )
      if (res) {
        setQuestionStarter(res.templates)
      }
    }
  }, [cid, onTemplateClick])

  const onQuestionTopic = useCallback(async () => {
    if (cid) {
      const res = await onQuestionTopicHandleClick(() =>
        request<GetQuestionIdeasParams, GetQuestionIdeasResults>(`LLM/getQuestionIdeas`, {
          topic,
          cid,
        })
      )
      if (res) {
        setQuestionTopicSuggestion(res.ideas)
      }
    }
  }, [cid, topic, onQuestionTopicHandleClick])

  const onSyntaxCheck = useCallback(async () => {
    if (0 < question.length && cid) {
      const res = await onSyntaxCheckHandleClick(() =>
        request<GetGrammarCheckParams, GetGrammarCheckResults>(`LLM/getGrammarCheck`, {
          sentence: question,
          cid,
        })
      )
      if (res) {
        setSyntaxCheckedQuestion(res.grammarChecked)
      }
    } else {
      alert('Please enter a question.')
    }
  }, [question, cid, onSyntaxCheckHandleClick])

  const onRephraseQuestion = useCallback(async () => {
    if (cid && 0 < question.length) {
      const res = await onRephraseQuestionHandleClick(() =>
        request<GetRephrasedQuestionParams, GetRephrasedQuestionResults>(`LLM/getRephrasedQuestion`, {
          learningObjective: `To ${method} the concept of ${topic}`,
          cid,
          explanation,
          question,
        })
      )
      if (res) {
        setRephrasedQuestion(res.rephrasedQuestions)
      }
    } else {
      alert('Please enter a question.')
    }
  }, [cid, question, onRephraseQuestionHandleClick, method, topic, explanation])

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

        <RowContainer>
          <CaptionText>🧑‍🏫 Need help?</CaptionText>
          <SmallSecondaryButton onClick={onQuestionStarter} disabled={onTemplateLoading}>
            I need templates to start with
          </SmallSecondaryButton>
          <SmallSecondaryButton onClick={onQuestionTopic} disabled={onQuestionTopicLoading}>
            I need ideas for my question
          </SmallSecondaryButton>
        </RowContainer>

        {0 < questionStarter.length && (
          <AssistanceContainer>
            <div>Here are some templates:</div>
            <ul>
              {questionStarter.map((template, i) => (
                <li key={i}>
                  <Item marginLeft={4} marginTop={4}>
                    {template}
                  </Item>
                </li>
              ))}
            </ul>
          </AssistanceContainer>
        )}
        {0 < questionTopicSuggestion.length && (
          <AssistanceContainer>
            <div>Here are some ideas:</div>
            <ul>
              {questionTopicSuggestion.map((template, i) => (
                <li key={i}>
                  <Item marginLeft={4} marginTop={4}>
                    {template}
                  </Item>
                </li>
              ))}
            </ul>
          </AssistanceContainer>
        )}

        <RowContainer>
          <CaptionText>🧑‍🏫 Need a check?</CaptionText>
          <SmallSecondaryButton onClick={onSyntaxCheck} disabled={onSyntaxCheckLoading}>
            I want to check grammar
          </SmallSecondaryButton>
          <SmallSecondaryButton onClick={onRephraseQuestion} disabled={onRephraseQuestionLoading}>
            I want to improve my question
          </SmallSecondaryButton>
        </RowContainer>

        {syntaxCheckedQuestion && <AssistanceContainer>{syntaxCheckedQuestion}</AssistanceContainer>}

        {0 < rephrasedQuestion.length && (
          <AssistanceContainer>
            <div>Here are some ideas to improve your question:</div>
            <ul>
              {rephrasedQuestion.map((template, i) => (
                <li key={i}>
                  <Item marginLeft={4} marginTop={4}>
                    {template}
                  </Item>
                </li>
              ))}
            </ul>
          </AssistanceContainer>
        )}

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
        <FillButton onClick={submitStem} disabled={submitStemLoading}>
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
  margin-bottom: 20px;
  font-size: 15px;
`
const RowContainer = styled.div`
  align-items: baseline;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  margin: 0 0 10px 0;
  margin-bottom: 12px;
`

const AssistanceContainer = styled.div`
  border-left: 1px solid ${palette.grey500};
  color: ${palette.grey200};
  margin-bottom: 16px;
  ${typography.overline}
  padding: 8px;
  width: fit-content;
  font-style: italic;
  margin-left: 8px;
`
