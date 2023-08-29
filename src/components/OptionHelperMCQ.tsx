import { GetDistractorsMCQParams, GetDistractorsMCQResults } from '@api/LLM/getDistractorMCQ'
import { GetSyntaxCheckMCQParams, GetSyntaxCheckMCQResults } from '@api/LLM/getSyntaxCheckMCQ'
import styled from '@emotion/styled'
import { Option } from '@server/db/option'
import { palette, typography } from '@styles/theme'
import { request } from '@utils/api'
import { useCallback, useState } from 'react'
import { useAPILoading } from 'src/hooks/useButton'
import { Item } from './basic/Item'
import { SmallSecondaryButton } from './basic/button/SmallSecondary'
import { CaptionText } from './basic/text/Caption'

interface Props {
  learningObjective: string
  explanation: string
  stem: string
  cid: string | undefined
  isAnswer: boolean
  disList: string[]
  ansList: string[]
  option: string
}

export function OptionHelperMCQ({
  cid,
  isAnswer,
  disList,
  ansList,
  option,
  stem,
  explanation,
  learningObjective,
}: Props) {
  const [GPTKeywordDistractorSuggestions, setGPTKeywordDistractorSuggestions] = useState<string[]>([])
  const [syntaxCheckedOption, setSyntaxCheckedOption] = useState<string | undefined>(undefined)
  const { isLoading: keywordSuggestionIsLoading, callAPI: keywordSuggestionHandleClick } = useAPILoading()
  const { isLoading: onSyntaxCheckLoading, callAPI: onSyntaxCheckHandleClick } = useAPILoading()

  const onTryLLMKeywordSuggestions = useCallback(async () => {
    if (cid) {
      const distractorKeywords = await keywordSuggestionHandleClick(() =>
        request<GetDistractorsMCQParams, GetDistractorsMCQResults>(`LLM/getDistractorMCQ`, {
          learningObjective,
          explanation,
          stem,
          isAnswer,
          cid,
        })
      )
      if (distractorKeywords) {
        setGPTKeywordDistractorSuggestions(distractorKeywords.distractorKeywords)
      }
    }
  }, [cid, keywordSuggestionHandleClick, learningObjective, explanation, stem, isAnswer])

  const onSyntaxCheck = useCallback(async () => {
    if (0 < option.length && cid) {
      const GPTSyntaxCheckedQuestion = await onSyntaxCheckHandleClick(() =>
        request<GetSyntaxCheckMCQParams, GetSyntaxCheckMCQResults>(`LLM/getSyntaxCheckMCQ`, {
          cid,
          explanation,
          stem,
          option,
          otherOptions: [...ansList, ...disList],
        })
      )
      if (GPTSyntaxCheckedQuestion) {
        setSyntaxCheckedOption(GPTSyntaxCheckedQuestion.syntaxChecked)
      }
    } else {
      alert('Please enter an option')
    }
  }, [option, cid, onSyntaxCheckHandleClick, explanation, stem, ansList, disList])

  return (
    <>
      <RowContainerNoWrap>
        <CaptionText>🧑‍🏫 Need help?</CaptionText>
        <SmallSecondaryButton onClick={onTryLLMKeywordSuggestions} disabled={keywordSuggestionIsLoading}>
          I need some keyword suggestions
        </SmallSecondaryButton>
        <SmallSecondaryButton onClick={onSyntaxCheck} disabled={onSyntaxCheckLoading}>
          I want to check consistency
        </SmallSecondaryButton>
      </RowContainerNoWrap>

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

      {syntaxCheckedOption && <AssistanceContainer>{syntaxCheckedOption}</AssistanceContainer>}
    </>
  )
}

const RowContainerNoWrap = styled.div`
  align-items: baseline;
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin: 8px 0 12px 0;
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
