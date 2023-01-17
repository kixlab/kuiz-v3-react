import styled from '@emotion/styled'
import { useState } from 'react'
import { css } from '@emotion/react'
import { CheckDialog } from './dialogs/CheckDialog'
import { TextBtn, TextBtnCta } from './basic/button/Button'
import { theme } from '../styles/theme'
import { useNavigate } from 'react-router-dom'

export const MadeStem = () => {
  const navigate = useNavigate()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const toggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }
  return (
    <StemBox>
      <RowFlex>
        <QuestionLabel>
          <div style={{ color: `${theme.palette.grey[400]}` }}>Q.</div>The question you made
        </QuestionLabel>
      </RowFlex>
      <RowFlex id="EditBtns">
        <TextBtn onClick={toggleModal} text="Delete" />
        <CheckDialog
          title="Delete the stem"
          btnName="Delete"
          message="Do you really want to delete it? You can't restore it."
          modalState={isOpenModal}
          toggleModal={toggleModal}
        />
        <TextBtnCta onClick={() => navigate('/question/createOption')} text="View" />
      </RowFlex>
    </StemBox>
  )
}

const StemBox = styled.div`
  background-color: white;
  padding: 20px 20px 0px 20px;
  border-radius: 8px;
`

const RowFlex = styled.div<{ id?: 'EditBtns' }>`
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
const QuestionLabel = styled.div`
  ${theme.typography.b01};
  color: ${theme.palette.grey[200]};
  display: flex;
  gap: 6px;
`
