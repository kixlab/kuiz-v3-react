import { FillButton } from '@components/basic/button/Fill'
import { StrokeButton } from '@components/basic/button/Stroke'
import { TextInput } from '@components/basic/input/Text'
import styled from '@emotion/styled'
import { palette } from '@styles/theme'
import { useState } from 'react'
import { Label } from '../basic/Label'
import { Modal } from './Modal'

interface Props {
  submit: (updatedTopic: string, updatedOptionWeight: number, updatedQuestionWeight: number) => void
  cancel: () => void
}

export const UpdateTopicDialog = (props: Props) => {
  const [inputMsg, setInputMsg] = useState('')
  const [optionsWeight, setOptionWeight] = useState(0)
  const [questionWeight, setQuestionWeight] = useState(0)
  return (
    <Modal>
      <TextInput value={inputMsg} onChange={setInputMsg} placeholder={'Update or add a topic'} />
      <WeightWrapper>
        <div>
          <Label size={1}>Set Required Number of Questions</Label>
          <NumberInput type="number" min={0} onChange={e => setQuestionWeight(parseInt(e.target.value))} />
        </div>
        <div>
          <Label size={1}>Set Required Number of Options</Label>
          <NumberInput type="number" min={0} onChange={e => setOptionWeight(parseInt(e.target.value))} />
        </div>
      </WeightWrapper>
      <BtnRow>
        <FillButton onClick={() => props.submit(inputMsg, optionsWeight, questionWeight)}>Insert</FillButton>
        <StrokeButton onClick={props.cancel}>Cancel</StrokeButton>
      </BtnRow>
    </Modal>
  )
}

const WeightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`

const NumberInput = styled.input`
  width: 100%;
  padding: 16px;
  margin: 5px;
  border-radius: 6px;
  box-sizing: border-box;
  border: 1px solid ${palette.grey500};
  &:focus {
    outline: none;
    border-color: ${palette.grey200};
  }
`

const BtnRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`
