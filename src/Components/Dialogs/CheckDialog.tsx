import { Modal } from './Modal'
import styled from '@emotion/styled'
import { FillBtn, StrokeBtn } from '../basic/button/Button'
import { Label } from '../basic/Label'

interface CheckModal {
  title: string
  message: string
  modalState: boolean
  btnName: string
  toggleModal: () => void
}

export const CheckDialog = (props: CheckModal) => {
  if (props.modalState) {
    return (
      <Modal>
        <Label text={props.title} color="black" size={1} />
        <div>{props.message}</div>
        <BtnRow>
          <FillBtn onClick={props.toggleModal} text={props.btnName} />
          <StrokeBtn onClick={props.toggleModal} text="Cancel" />
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
