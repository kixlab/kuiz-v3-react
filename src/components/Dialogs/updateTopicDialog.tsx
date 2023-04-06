import styled from '@emotion/styled'
import { typography, palette } from '@styles/theme'
import { useState } from 'react'
import { FillButton } from '@components/basic/button/Fill'
import { StrokeButton } from '@components/basic/button/Stroke'
import { Label } from '../basic/Label'
import { Modal } from './Modal'

interface Props {
  modalState: boolean
  initialText?: string
  initialOptionWeight?: number
  initialQuestionWeight?: number
  state: 'Update' | 'Create' | null
  submit: (updatedTopic: string, updatedOptionWeight: number, updatedQuestionWeight: number) => void
}

export const UpdateTopicDialog = (props: Props) => {
  const [inputMsg, setInputMsg] = useState('')
  const [optionsWeight, setOptionWeight] = useState(props.initialOptionWeight ?? 0)
  const [questionWeight, setQuestionWeight] = useState(props.initialQuestionWeight ?? 0)
  if (props.modalState) {
    return (
      <Modal>
        <Label color="black" size={1}>
          {props.state ? props.state : null} Topic
        </Label>
        <TextAreaInput
          onChange={e => setInputMsg(e.target.value)}
          placeholder={props.state === 'Update' ? props.initialText : 'Add Topic'}
        />
        <WeightWrapper>
          <div>
            <Label color="black" size={1}>
              Option weight
            </Label>
            <NumberInput
              type="number"
              min={0}
              defaultValue={props.initialOptionWeight ?? 0}
              onChange={e => setOptionWeight(parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label color="black" size={1}>
              Question weight
            </Label>
            <NumberInput
              type="number"
              min={0}
              defaultValue={props.initialQuestionWeight ?? 0}
              onChange={e => setQuestionWeight(parseInt(e.target.value))}
            />
          </div>
        </WeightWrapper>
        <BtnRow>
          <FillButton onClick={() => props.submit(inputMsg, optionsWeight, questionWeight)}>Insert</FillButton>
          <StrokeButton onClick={() => props.submit('', -1, -1)}>Cancel</StrokeButton>
        </BtnRow>
      </Modal>
    )
  } else {
    return null
  }
}

const TextAreaInput = styled.textarea`
  ${typography.b02};
  width: 100%;
  height: 120px;
  padding: 16px;
  margin-top: 20px;
  border-radius: 6px;
  box-sizing: border-box;
  border: 1px solid ${palette.grey[500]};
  resize: vertical;
  &::placeholder {
    color: ${palette.grey[500]};
  }
  &:focus {
    outline: none;
    border-color: ${palette.grey[200]};
  }
`

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
  border: 1px solid ${palette.grey[500]};
  &:focus {
    outline: none;
    border-color: ${palette.grey[200]};
  }
`

const BtnRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`
