import styled from '@emotion/styled'
import { useState } from 'react'
import { css } from '@emotion/react'
import { CheckDialog } from './Dialogs/CheckDialog'
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { palette, typography } from '@styles/theme'
import { TextButton } from './basic/button/Text'

interface Props {
  question: string
  qid: string
  cid: string
}

export const MadeStem = ({ question, cid, qid }: Props) => {
  const { push } = useRouter()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const toggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal)
  }, [setIsOpenModal, isOpenModal])

  return (
    <StemBox>
      <RowFlex>
        <QuestionLabel>Q. {question}</QuestionLabel>
      </RowFlex>
      <RowFlex id="EditBtns">
        <TextButton onClick={toggleModal} color={palette.grey[400]}>
          Delete
        </TextButton>
        <CheckDialog
          title="Delete the stem"
          btnName="Delete"
          message="Do you really want to delete it? You can't restore it."
          modalState={isOpenModal}
          toggleModal={toggleModal}
          cancelModal={toggleModal}
        />
        <TextButton onClick={() => push('/' + cid + '/question/' + qid + '/createOption')} color={palette.grey[400]}>
          View
        </TextButton>
      </RowFlex>
    </StemBox>
  )
}

const StemBox = styled.div`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #323232;
  display: grid;
  gap: 12px;
`

const RowFlex = styled.div<{ id?: 'EditBtns' }>`
  display: flex;
  flex-direction: row;
  gap: 12px;
  ${props =>
    props.id === 'EditBtns' &&
    css`
      justify-content: right;
    `}
`
const QuestionLabel = styled.div`
  ${typography.b01};
`
