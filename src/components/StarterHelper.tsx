import { GetQuestionIdeasParams, GetQuestionIdeasResults } from '@api/LLM/getQuestionIdeas'
import { GetQuestionTemplatesParams, GetQuestionTemplatesResults } from '@api/LLM/getQuestionTemplates'
import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { request } from '@utils/api'
import { useCallback, useState } from 'react'
import { useAPILoading } from 'src/hooks/useButton'
import { Item } from './basic/Item'
import { SmallSecondaryButton } from './basic/button/SmallSecondary'
import { CaptionText } from './basic/text/Caption'

interface Props {
  cid: string | undefined
  topic: string
}

export function StarterHelper({ cid, topic }: Props) {
  const [questionStarter, setQuestionStarter] = useState<string[]>([])
  const [questionTopicSuggestion, setQuestionTopicSuggestion] = useState<string[]>([])
  const { isLoading: onTemplateLoading, callAPI: onTemplateClick } = useAPILoading()
  const { isLoading: onQuestionTopicLoading, callAPI: onQuestionTopicHandleClick } = useAPILoading()

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

  return (
    <>
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
