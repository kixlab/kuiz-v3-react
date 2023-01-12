import styled from '@emotion/styled'
import { useState } from 'react'
import { Modal } from './Modal'

interface InputModal {
  modalState: boolean
  submit: (msg: string) => void
  toggleModal: () => string //Empty message return
}

export const InputDialog = (props: InputModal) => {
  const [inputMsg, setInputMsg] = useState('')
  if (props.modalState) {
    return (
      <Modal>
        <Label>Report Error</Label>
        <Input onChange={e => setInputMsg(e.target.value)} placeholder="Write down the error" />
        <BtnDisplay>
          <FillBtn onClick={() => props.submit(inputMsg)} disabled={inputMsg == '' ? true : false}>
            Report
          </FillBtn>
          <StrokeBtn onClick={() => setInputMsg(props.toggleModal)}>Cancel</StrokeBtn>
        </BtnDisplay>
      </Modal>
    )
  } else {
    return null
  }
}

const Label = styled.div`
  font-size: 20px;
  font-family: 'inter-sb';
  color: #323232;
  line-height: 1.4;
  padding: 8px 0 0 0;
  @media (max-width: 599px) {
    font-size: 16px;
    padding: 0px;
  }
`

const Input = styled.textarea`
  padding: 16px;
  margin-top: 20px;
  border-radius: 6px;
  border: 1px solid #bdbdbd;
  width: 100%;
  height: 120px;
  resize: vertical;
  box-sizing: border-box;
  font-size: 16px;
  &:placeholder {
    color: #b7bfc7;
  }
  &:focus {
    outline: none;
    border-color: #212121;
  }
  @media (max-width: 599px) {
    font-size: 13px;
  }
`

const BtnDisplay = styled.div`
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
  color: #323232;
  background-color: #fff;
  border: 1px solid #bdbdbd;
  :hover {
    background-color: #e9eef4;
  }
  @media (max-width: 599px) {
    font-size: 14px;
  }
`
