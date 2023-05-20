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
      <div>Q. {question}</div>
      <TextButton
        onClick={() => push('/class/' + cid + '/question/' + qid + '/create-option')}
        color={palette.primaryDark}
      >
        View
      </TextButton>
    </StemBox>
  )
}

const StemBox = styled.div`
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid #323232;
  display: grid;
  grid-template-columns: 1fr auto;
  ${typography.b01};
  align-items: center;
`
