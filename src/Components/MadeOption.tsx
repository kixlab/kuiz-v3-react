import styled from '@emotion/styled'
import { useState } from 'react'
import { css } from '@emotion/react'
import { CheckDialog } from './Dialogs/CheckDialog'

export const MadeOption = (props: { optionType: 'Answer' | 'Distractor' }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const toggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }
  return (
    <OptionBox>
      <RowFlex>
        <Tag id={props.optionType}>{props.optionType}</Tag>
        <div>option</div>
      </RowFlex>
      <RowFlex>
        <QSymbol>Q.</QSymbol>
        <div>What is the question?</div>
      </RowFlex>
      <RowFlex id="EditBtns">
        <DeleteBtn onClick={toggleModal}>Delete</DeleteBtn>
        <CheckDialog title="Delete the option" message="Do you really want to delete it? You can't restore it." btnName="Delete" modalState={isOpenModal} toggleModal={toggleModal} />
        <MoveBtn>View</MoveBtn>
      </RowFlex>
    </OptionBox>
  )
}

const OptionBox = styled.div`
  background-color: white;
  padding: 16px 24px 0px 24px;
  border-radius: 8px;
`

const RowFlex = styled.div<{id?:'EditBtns'}>`
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding-bottom: 16px;
  ${props =>
    props.id === 'EditBtns' &&
    css`
      justify-content: right;
    `}
`

const Tag = styled.div<{id?:'Answer'|'Distractor'}>`
  color: white;
  font-size: 12px;
  padding: 4px 8px 4px 8px;
  border-radius: 6px;
  ${props =>
    props.id === 'Answer' &&
    css`
      background-color: rgb(30, 144, 30);
    `}
  ${props =>
    props.id === 'Distractor' &&
    css`
      background-color: rgb(220, 51, 51);
    `}
`

const QSymbol = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #919191;
`

const DeleteBtn = styled.div`
  font-weight: 500;
  color: #858585;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const MoveBtn = styled.div`
  font-weight: 500;
  padding-left: 8px;
  color: #1c548f;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
