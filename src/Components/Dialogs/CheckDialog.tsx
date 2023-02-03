import { Modal } from './Modal'
import styled from '@emotion/styled'
import { FillBtn, StrokeBtn } from '../basic/button/Button'
import { Label } from '../basic/Label'

interface Props {
  title: string
  message: string
  modalState: boolean
  btnName: string
  toggleModal: () => void
}

export const CheckDialog = (props: Props) => {
  if (props.modalState) {
    return (
      <Modal>
        <Label text={props.title} color="black" size={1} />
        <div>{props.message}</div>
        <BtnRow>
          <FillBtn onClick={props.toggleModal}>{props.btnName}</FillBtn>
          <StrokeBtn onClick={props.toggleModal}>Cancel</StrokeBtn>
        </BtnRow>
      </Modal>
    )
  } else return null
}

const BtnRow = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 12px;
`
