import { FillButton } from '@components/basic/button/Fill'
import { StrokeButton } from '@components/basic/button/Stroke'
import styled from '@emotion/styled'
import { Label } from '../basic/Label'
import { Modal } from './Modal'
import { typography } from '@styles/theme'

interface Props {
  title: string
  message: string
  modalState: boolean
  btnName: string
  cancelBtnName?: string
  toggleModal: () => void
  cancelModal: () => void
}

export const CheckDialog = ({
  title,
  message,
  modalState,
  btnName,
  toggleModal,
  cancelModal,
  cancelBtnName = 'Cancel',
}: Props) => {
  if (modalState) {
    return (
      <Modal>
        <Label size={1}>{title}</Label>
        <Message>{message}</Message>
        <BtnRow>
          <FillButton onClick={toggleModal}>{btnName}</FillButton>
          <StrokeButton onClick={cancelModal}>{cancelBtnName}</StrokeButton>
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
const Message = styled.div`
  ${typography.b02};
  line-height: 150%;
`
