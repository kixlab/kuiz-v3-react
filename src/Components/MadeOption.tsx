import styled from '@emotion/styled'
import { useState } from 'react'
import { css } from '@emotion/react'
import { CheckDialog } from './Dialogs/CheckDialog'
import { TextBtn, TextBtnCta } from './basic/button/Button'
import { useNavigate, useParams } from 'react-router-dom'

interface propsType{
  qid:string
  option: string
  question: string
  optionType: 'Answer' | 'Distractor'
}

export const MadeOption = (props: propsType) => {
  const navigate = useNavigate()
  const cid = useParams().cid
  const [isOpenModal, setIsOpenModal] = useState(false)
  const toggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }
  return (
    <OptionBox>
      <RowFlex>
        <Tag id={props.optionType}>{props.optionType}</Tag>
        <div>{props.option}</div>
      </RowFlex>
      <RowFlex>
        <QSymbol>Q.</QSymbol>
        <Stem>{props.question}</Stem>
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
    </OptionBox>
  )
}

const OptionBox = styled.div`
  background-color: white;
  padding: 16px 24px 0px 24px;
  border-radius: 8px;
`

const RowFlex = styled.div<{ id?: 'EditBtns' }>`
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding-bottom: 16px;
  font-family: 'inter-m';
  ${props =>
    props.id === 'EditBtns' &&
    css`
      justify-content: right;
    `}
`

const Tag = styled.div<{ id?: 'Answer' | 'Distractor' }>`
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
  font-family: 'inter-r';
  font-size: 18px;
  color: #858585;
`

const Stem = styled.div`
  color: #858585;
`
