import { CreateOptionParams, CreateOptionResults } from '@api/createOption'
import { GetGPTDistractorsParams, GetGPTDistractorsResults } from '@api/LLM/getGPTDistractor'
import { GetGPTSyntaxCheckerParams, GetGPTSyntaxCheckerResults } from '@api/LLM/getGPTSyntaxChecker'
import { LoadOptionsParams, LoadOptionsResults } from '@api/loadOptions'
import { FillButton } from '@components/basic/button/Fill'
import { OptionButton } from '@components/basic/button/Option'
import { SmallSecondaryButton } from '@components/basic/button/SmallSecondary'
import { RadioInput } from '@components/basic/input/Radio'
import { TextInput } from '@components/basic/input/Text'
import { Item } from '@components/basic/Item'
import { Label } from '@components/basic/Label'
import { CaptionText } from '@components/basic/text/Caption'
import { Divider } from '@components/Divider'
import { Required } from '@components/Required'
import { Sheet } from '@components/Sheet'
import styled from '@emotion/styled'
import { Option } from '@server/db/option'
import { QStem } from '@server/db/qstem'
import { palette, typography } from '@styles/theme'
import { request } from '@utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useButton } from 'src/hooks/useButton'

export default function Page() {
  const { isLoading: onSubmitIsLoading, handleClick: onSubmitHandleClick } = useButton()
  const { isLoading: keywordSuggestionIsLoading, handleClick: keywordSuggestionHandleClick } = useButton()
  const { isLoading: onSyntaxCheckLoading, handleClick: onSyntaxCheckHandleClick } = useButton()
  const { push, query } = useRouter()
  const qid = query.qid as string | undefined
  const cid = query.cid as string | undefined
  const callbackUrl = query.callbackUrl as string | undefined
  const [ansList, setAnsList] = useState<Option[]>([])
  const [disList, setDistList] = useState<Option[]>([])
  const [qinfo, setQinfo] = useState<QStem>()
  const [option, setOption] = useState('')
  const [isAnswer, setIsAnswer] = useState(false)
  const [GPTKeywordDistractorSuggestions, setGPTKeywordDistractorSuggestions] = useState<string[]>([])
  const [syntaxCheckedOption, setSyntaxCheckedOption] = useState<string | undefined>(undefined)
  const [numberOfKeywordSuggestionChecks, setNumberOfKeywordSuggestionChecks] = useState(0)
  const [numberOfOptionGrammarChecks, setNumberOfOptionGrammarChecks] = useState(0)

  useEffect(() => {
    if (qid) {
      request<LoadOptionsParams, LoadOptionsResults>(`loadOptions`, {
        qid,
      }).then(res => {
        if (res) {
          const ans = res.options.filter(op => op.is_answer === true)
          const dis = res.options.filter(op => op.is_answer === false)

          setAnsList(ans)
          setDistList(dis)
          setQinfo(res.qinfo)
        }
      })
    }
    //don't add qinfo in the dependencies of his useEffect it will create infinite loop
  }, [push, qid, setAnsList, setDistList, setQinfo])

  const submit = useCallback(async () => {
    if (option.trim().length === 0) {
      alert('Please enter an option')
      return
    }
    await onSubmitHandleClick<void>(async () => {
      if (cid && qid) {
        const optionData = {
          option_text: option,
          is_answer: isAnswer,
          class: cid,
          qstem: qid,
          keywords: [],
          numberOfOptionGrammarChecks,
          numberOfKeywordSuggestionChecks,
        }

        await request<CreateOptionParams, CreateOptionResults>(`createOption`, {
          optionData,
          similarOptions: [],
        })
        if (callbackUrl) {
          push(callbackUrl)
        } else {
          push('/class/' + cid)
        }
      }
    })
  }, [
    option,
    cid,
    qid,
    isAnswer,
    callbackUrl,
    push,
    onSubmitHandleClick,
    numberOfOptionGrammarChecks,
    numberOfKeywordSuggestionChecks,
  ])

  const onTryLLMKeywordSuggestions = useCallback(async () => {
    if (qinfo && cid) {
      const distractorKeywords = await keywordSuggestionHandleClick<GetGPTDistractorsResults>(async () => {
        return await request<GetGPTDistractorsParams, GetGPTDistractorsResults>(`LLM/getGPTDistractor`, {
          qStem: qinfo.stem_text,
          qLearningObjective: qinfo.learningObjective,
          cid,
        })
      })
      if (distractorKeywords) {
        setGPTKeywordDistractorSuggestions(distractorKeywords.distractorKeywords)
        setNumberOfKeywordSuggestionChecks(prevNumber => prevNumber + 1)
      }
    }
  }, [qinfo, keywordSuggestionHandleClick, cid])

  const onSyntaxCheck = useCallback(async () => {
    if (option) {
      const GPTSyntaxCheckedQuestion = await onSyntaxCheckHandleClick<GetGPTSyntaxCheckerResults>(async () => {
        return await request<GetGPTSyntaxCheckerParams, GetGPTSyntaxCheckerResults>(`LLM/getGPTSyntaxChecker`, {
          type: 'question option',
          sentence: option,
        })
      })
      if (GPTSyntaxCheckedQuestion) {
        setSyntaxCheckedOption(GPTSyntaxCheckedQuestion.syntaxChecked)
        setNumberOfOptionGrammarChecks(prevNumber => prevNumber + 1)
      }
    }
  }, [option, setSyntaxCheckedOption, onSyntaxCheckHandleClick])

  return (
    <Sheet gap={0}>
      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Topic
      </Label>
      <TextInput value={qinfo?.learningObjective ?? ''} disabled marginBottom={20} />
      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Explanation
      </Label>
      <TextInput value={qinfo?.explanation ?? ''} disabled marginBottom={20} />
      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Question
      </Label>
      <TextInput value={qinfo?.stem_text ?? ''} disabled marginBottom={20} />
      <Label color={'primaryMain'} size={0} marginBottom={8}>
        ✅ Answers
      </Label>
      {ansList.map((item, i) => (
        <OptionButton key={i} state={true} selected={false} marginBottom={8}>
          {item?.option_text}
        </OptionButton>
      ))}
      {0 < disList.length && (
        <>
          <Label color={'primaryMain'} size={0} marginBottom={8} marginTop={12}>
            ❌ Distractors
          </Label>
          {disList.map((item, i) => (
            <OptionButton key={i} state={true} selected={false} marginBottom={i < disList.length - 1 ? 8 : 0}>
              {item?.option_text}
            </OptionButton>
          ))}
        </>
      )}
      <Divider marginVertical={20} />

      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Add an Option <Required />
      </Label>

      <RadioInput options={['Answer', 'Distractor']} value={isAnswer ? 0 : 1} onSelect={i => setIsAnswer(i === 0)} />

      <TextInput
        placeholder={`Suggest ${isAnswer ? 'an answer' : 'a distractor'} for this question`}
        onChange={setOption}
        value={option}
        marginTop={8}
      />

      <RowContainerNoWrap>
        <CaptionText>🧑‍🏫 Need a help?</CaptionText>
        <SmallSecondaryButton onClick={onSyntaxCheck} disabled={onSyntaxCheckLoading}>
          I want to check grammar
        </SmallSecondaryButton>
        <SmallSecondaryButton onClick={onTryLLMKeywordSuggestions} disabled={keywordSuggestionIsLoading}>
          I need some keyword suggestions
        </SmallSecondaryButton>
      </RowContainerNoWrap>

      {syntaxCheckedOption && <AssistanceContainer>{syntaxCheckedOption}</AssistanceContainer>}

      {0 < GPTKeywordDistractorSuggestions.length && (
        <AssistanceContainer>
          <div>Here are some keywords you may consider:</div>
          <ul>
            {GPTKeywordDistractorSuggestions.map((item, i) => (
              <li key={i}>
                <Item marginTop={4} marginLeft={4}>
                  {item}
                </Item>
              </li>
            ))}
          </ul>
        </AssistanceContainer>
      )}

      <FillButton onClick={submit} disabled={onSubmitIsLoading}>
        Submit
      </FillButton>
    </Sheet>
  )
}

const RowContainerNoWrap = styled.div`
  align-items: baseline;
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin: 12px 0;
`

const AssistanceContainer = styled.div`
  border-left: 1px solid ${palette.grey500};
  color: ${palette.grey200};
  margin-bottom: 12px;
  ${typography.overline}
  padding: 8px;
  width: fit-content;
  font-style: italic;
  margin-left: 8px;
`
