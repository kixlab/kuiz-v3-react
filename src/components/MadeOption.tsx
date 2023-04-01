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
  optionType: 'Answer' | 'Distractor'
}

export const MadeOption = (props: Props) => {
  const { push, query } = useRouter()
  const cid = query.cid as string | undefined
  const [isOpenModal, setIsOpenModal] = useState(false)

  const toggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal)
  }, [setIsOpenModal, isOpenModal])

  return (
    <OptionBox>
      <RowFlex>
        <Tag id={props.optionType}>{props.optionType}</Tag>
        <OptionLabel>{props.option}</OptionLabel>
      </RowFlex>
      <RowFlex>
        <QuestionLabel>Q. {props.question}</QuestionLabel>
      </RowFlex>
      <RowFlex id="EditBtns">
        <TextButton onClick={toggleModal} color={palette.grey[400]}>
          Delete
        </TextButton>
        <CheckDialog
          title="Delete the stem"
          btnName="Delete"
          message="Do you really want to delete it? You can't restore it."
          modalState={isOpenModal}
          toggleModal={toggleModal}
        />
        <TextButton
          onClick={() => push('/' + cid + '/question/' + props.qid + '/createOption')}
          color={palette.primary.dark}
        >
          View
        </TextButton>
      </RowFlex>
    </OptionBox>
  )
}

const OptionBox = styled.div`
  background-color: white;
  padding: 20px 20px 0px 20px;
  border-radius: 8px;
`

const RowFlex = styled.div<{ id?: 'EditBtns' }>`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  padding-bottom: 16px;
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
  display: flex;
  gap: 6px;
  color: ${palette.grey[400]};
`
