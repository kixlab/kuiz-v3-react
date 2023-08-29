import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { TextButton } from './basic/button/Text'
import { CheckDialog } from './Dialogs/CheckDialog'
import { useQueryParam } from 'src/hooks/useQueryParam'

interface Props {
  qid: string
  option: string
  question: string
  cid: string
  optionType: 'Answer' | 'Distractor'
}

export const MadeOption = ({ qid, option, question, cid, optionType }: Props) => {
  const { push } = useRouter()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [condition] = useQueryParam('c')

  const toggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal)
  }, [setIsOpenModal, isOpenModal])

  const viewOption = useCallback(() => {
    push('/class/' + cid + '/question/' + qid + `/solve?c=${condition}`)
  }, [cid, condition, push, qid])

  return (
    <OptionBox>
      <div>
        <Question>Q. {question}</Question>
        <Tag id={optionType}>{optionType}</Tag>
        {option}
      </div>

      <TextButton onClick={viewOption} color={palette.primaryDark}>
        View
      </TextButton>
    </OptionBox>
  )
}

const OptionBox = styled.div`
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid #323232;
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr auto;
  align-items: center;
`

const Question = styled.div`
  margin-bottom: 8px;
`

const Tag = styled.span<{ id?: 'Answer' | 'Distractor' }>`
  ${typography.overline};
  color: ${palette.tags.contrastText};
  padding: 4px 8px 4px 8px;
  border-radius: 6px;
  margin-right: 8px;
  ${props =>
    props.id === 'Answer' &&
    css`
      background-color: ${palette.tags.answer};
    `}
  ${props =>
    props.id === 'Distractor' &&
    css`
      background-color: ${palette.tags.distractor};
    `}
`
