import styled from '@emotion/styled'
import { useState } from 'react'
import { css } from '@emotion/react'
import { CheckDialog } from './Dialogs/CheckDialog'
import { palette, typography } from '../styles/theme'
import { TextBtn, TextBtnCta } from './basic/button/Button'
import { useNavigate } from 'react-router-dom'

export const MadeOption = (props: { optionType: 'Answer' | 'Distractor' }) => {
  const navigate = useNavigate()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const toggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }
  return (
    <OptionBox>
      <RowFlex>
        <Tag id={props.optionType}>{props.optionType}</Tag>
        <OptionLabel>option</OptionLabel>
      </RowFlex>
      <RowFlex>
        <QuestionLabel>Q. what is the question?</QuestionLabel>
      </RowFlex>
      <RowFlex id="EditBtns">
        <TextBtn onClick={toggleModal}>Delete</TextBtn>
        <CheckDialog
          title="Delete the stem"
          btnName="Delete"
          message="Do you really want to delete it? You can't restore it."
          modalState={isOpenModal}
          toggleModal={toggleModal}
        />
        <TextBtnCta onClick={() => navigate('/question/createOption')}>View</TextBtnCta>
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
