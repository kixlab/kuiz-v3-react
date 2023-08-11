import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { Item } from './basic/Item'
import { SmallSecondaryButton } from './basic/button/SmallSecondary'
import { CaptionText } from './basic/text/Caption'
import { useAPILoading } from 'src/hooks/useButton'
import { useCallback, useState } from 'react'
import { GetGrammarCheckParams, GetGrammarCheckResults } from '@api/LLM/getGrammarCheck'
import { GetRephrasedQuestionParams, GetRephrasedQuestionResults } from '@api/LLM/getRephrasedQuestion'
import { request } from '@utils/api'

interface Props {
  cid: string | undefined
  question: string
  method: string
  topic: string
  explanation: string
}

export function StemHelper({ cid, question, method, topic, explanation }: Props) {
  const { isLoading: onSyntaxCheckLoading, callAPI: onSyntaxCheckHandleClick } = useAPILoading()
  const { isLoading: onRephraseQuestionLoading, callAPI: onRephraseQuestionHandleClick } = useAPILoading()
  const [syntaxCheckedQuestion, setSyntaxCheckedQuestion] = useState<string | undefined>(undefined)
  const [rephrasedQuestion, setRephrasedQuestion] = useState<string[]>([])

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

  return (
    <>
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
    </>
  )
}

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
  margin-bottom: 12px;
  ${typography.overline}
  padding: 8px;
  width: fit-content;
  font-style: italic;
  margin-left: 8px;
`
