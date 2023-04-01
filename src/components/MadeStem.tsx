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
}

export const MadeStem = (props: Props) => {
  const { push, query } = useRouter()
  const cid = query.cid as string | undefined
  const [isOpenModal, setIsOpenModal] = useState(false)

  const toggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal)
  }, [setIsOpenModal, isOpenModal])

  return (
    <StemBox>
      <RowFlex>
        <QuestionLabel>
          <div style={{ color: `${palette.grey[400]}` }}>Q.</div>
          {props.question}
        </QuestionLabel>
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
        />
        <TextButton
          onClick={() => push('/' + cid + '/question/' + props.qid + '/createOption')}
          color={palette.grey[400]}
        >
          View
        </TextButton>
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
  ${typography.b01};
  color: ${palette.grey[200]};
  display: flex;
  gap: 6px;
`
