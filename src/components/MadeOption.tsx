import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { TextButton } from './basic/button/Text'
import { CheckDialog } from './Dialogs/CheckDialog'

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

  const toggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal)
  }, [setIsOpenModal, isOpenModal])

  const viewOption = useCallback(() => {
    push('/class/' + cid + '/question/' + qid + '/solve')
  }, [cid, push, qid])

  return (
    <OptionBox>
      <RowFlex>
        <QuestionLabel>Q. {question}</QuestionLabel>
      </RowFlex>
      <RowFlex>
        <Tag id={optionType}>{optionType}</Tag>
        <OptionLabel>{option}</OptionLabel>
      </RowFlex>
      <RowFlex id="EditBtns">
        <TextButton onClick={toggleModal} color={palette.grey400}>
          Delete
        </TextButton>
        <CheckDialog
          title="Delete the stem"
          btnName="Delete"
          message="Do you really want to delete it? You can't restore it."
          modalState={isOpenModal}
          toggleModal={toggleModal}
          cancelModal={toggleModal}
        />
        <TextButton onClick={viewOption} color={palette.primaryDark}>
          View
        </TextButton>
      </RowFlex>
    </OptionBox>
  )
}

const OptionBox = styled.div`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #323232;
  display: grid;
  gap: 12px;
`

const RowFlex = styled.div<{ id?: 'EditBtns' }>`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  font-family: 'inter-m';
  ${props =>
    props.id === 'EditBtns' &&
    css`
      justify-content: right;
    `}
`

const Tag = styled.div<{ id?: 'Answer' | 'Distractor' }>`
  ${typography.overline};
  color: ${palette.tags.contrastText};
  padding: 4px 8px 4px 8px;
  border-radius: 6px;
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

const OptionLabel = styled.div`
  ${typography.b02b};
`

const QuestionLabel = styled.div`
  ${typography.b02};
`
