import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { Item } from './basic/Item'
import { SmallSecondaryButton } from './basic/button/SmallSecondary'
import { CaptionText } from './basic/text/Caption'
import { useCallback, useState } from 'react'
import { GetDistractorsParams, GetDistractorsResults } from '@api/LLM/getDistractor'
import { GetSyntaxCheckParams, GetSyntaxCheckResults } from '@api/LLM/getSyntaxCheck'
import { useAPILoading } from 'src/hooks/useButton'
import { QStem } from '@server/db/qstem'
import { request } from '@utils/api'
import { Option } from '@server/db/option'

interface Props {
  qinfo: QStem | undefined
  cid: string | undefined
  isAnswer: boolean
  disList: Option[]
  ansList: Option[]
  option: string
}

export function OptionHelper({ qinfo, cid, isAnswer, disList, ansList, option }: Props) {
  const [GPTKeywordDistractorSuggestions, setGPTKeywordDistractorSuggestions] = useState<string[]>([])
  const [syntaxCheckedOption, setSyntaxCheckedOption] = useState<string | undefined>(undefined)
  const { isLoading: keywordSuggestionIsLoading, callAPI: keywordSuggestionHandleClick } = useAPILoading()
  const { isLoading: onSyntaxCheckLoading, callAPI: onSyntaxCheckHandleClick } = useAPILoading()

  const onTryLLMKeywordSuggestions = useCallback(async () => {
    if (qinfo && cid) {
      const distractorKeywords = await keywordSuggestionHandleClick(() =>
        request<GetDistractorsParams, GetDistractorsResults>(`LLM/getDistractor`, {
          qid: qinfo._id,
          isAnswer,
        })
      )
      if (distractorKeywords) {
        setGPTKeywordDistractorSuggestions(distractorKeywords.distractorKeywords)
      }
    }
  }, [qinfo, cid, keywordSuggestionHandleClick, isAnswer])

  const onSyntaxCheck = useCallback(async () => {
    if (0 < option.length && qinfo) {
      const GPTSyntaxCheckedQuestion = await onSyntaxCheckHandleClick(() =>
        request<GetSyntaxCheckParams, GetSyntaxCheckResults>(`LLM/getSyntaxCheck`, {
          qid: qinfo._id,
          option,
          otherOptions: [...ansList, ...disList].map(item => item.option_text),
        })
      )
      if (GPTSyntaxCheckedQuestion) {
        setSyntaxCheckedOption(GPTSyntaxCheckedQuestion.syntaxChecked)
      }
    } else {
      alert('Please enter an option')
    }
  }, [option, qinfo, onSyntaxCheckHandleClick, ansList, disList])

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
