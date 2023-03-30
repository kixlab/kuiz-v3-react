import { FillButton } from '@components/basic/button/Fill'
import { StrokeButton } from '@components/basic/button/Stroke'
import styled from '@emotion/styled'
import { Label } from '../basic/Label'
import { Modal } from './Modal'

interface Props {
  title: string
  message: string
  modalState: boolean
  btnName: string
  toggleModal: () => void
  cancelModal?: () => void
}

export const CheckDialog = ({ title, message, modalState, btnName, toggleModal, cancelModal }: Props) => {
  if (modalState) {
    return (
      <Modal>
        <Label color="black" size={1}>
          {title}
        </Label>
        <div>{message}</div>
        <BtnRow>
          <FillButton onClick={toggleModal}>{btnName}</FillButton>
          <StrokeButton onClick={cancelModal}>Cancel</StrokeButton>
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
