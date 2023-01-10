import { Modal } from './Modal'
import { useState } from 'react'
import styled from '@emotion/styled'

interface CheckModal {
  title: string
  message:string
  modalState: boolean
  btnName: string
  toggleModal: () => void
}

export const CheckDialog = (props: CheckModal) => {
  if (props.modalState) {
    return (
      <Modal>
        <Label>{props.title}</Label>
        <div>{props.message}</div>
        <BtnDisplay>
          <FillBtn onClick={props.toggleModal}>{props.btnName}</FillBtn>
          <StrokeBtn onClick={props.toggleModal}>Cancel</StrokeBtn>
        </BtnDisplay>
      </Modal>
    )
  } else return null
}

const Label = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  padding: 8px 0 0 0;
  @media (max-width: 599px) {
    font-size: 16px;
    padding: 0px;
  }
`

const BtnDisplay = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 12px;
`

const FillBtn = styled.button`
  @media (max-width: 599px) {
    font-size: 14px;
  }
`

const StrokeBtn = styled.button`
  color: #212121;
  background-color: #fff;
  border: 1px solid #bdbdbd;
  :hover {
    background-color: #e9eef4;
  }
  @media (max-width: 599px) {
    font-size: 14px;
  }
`
