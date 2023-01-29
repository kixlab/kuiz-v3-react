import styled from '@emotion/styled'
import { useState } from 'react'
import { css } from '@emotion/react'
import { CheckDialog } from './Dialogs/CheckDialog'
import { TextBtn, TextBtnCta } from './basic/button/Button'
import { useNavigate, useParams } from 'react-router-dom'

interface propsType{
  question:string
  qid: string
}

export const MadeStem = (props:propsType) => {
  const cid = useParams().cid
  const navigate = useNavigate()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const toggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }
  return (
    <StemBox>
      <RowFlex>
        <QSymbol>Q.</QSymbol>
        <div>{props.question}</div>
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
        <TextBtnCta onClick={() => navigate('/' + cid + '/question/' + props.qid + '/createOption')}>View</TextBtnCta>
      </RowFlex>
    </StemBox>
  )
}


const StemBox = styled.div`
  background-color: white;
  padding: 16px 24px 0px 24px;
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
const QSymbol = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #919191;
`
