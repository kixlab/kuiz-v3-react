import styled from '@emotion/styled'
import { useState } from 'react'
import { css } from '@emotion/react'
import { CheckDialog } from './Dialogs/CheckDialog'

export const MadeStem = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const toggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }
  return (
    <StemBox>
      <RowFlex>
        <QSymbol>Q.</QSymbol>
        <div>What is the question?</div>
      </RowFlex>
      <RowFlex id="EditBtns">
        <DeleteBtn onClick={toggleModal}>Delete</DeleteBtn>
        <CheckDialog title="Delete the stem" btnName="Delete" modalState={isOpenModal} toggleModal={toggleModal} />
        <MoveBtn>View</MoveBtn>
      </RowFlex>
    </StemBox>
  )
}

const StemBox = styled.div`
  background-color: white;
  padding: 16px 24px 0px 24px;
  border-radius: 8px;
`

const RowFlex = styled.div`
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
