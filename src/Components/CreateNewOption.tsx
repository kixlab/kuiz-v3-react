import { CategoryInput } from './CategoryInput'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { FillBtn } from './basic/button/Button'

interface propsType{
  isAnswer: boolean
  setIsAnswer: (item:boolean)=>void
  setOption: (item:string)=>void
  setKeywords: (item:string[])=>void
  onSubmit: ()=>void
}

export const CreateNewOption = (props:propsType) => {

  function updateSuggested(e:React.ChangeEvent<HTMLInputElement>) {
    props.setOption(e.target.value)
  }

  return (
    <div>
      <h3>Create New Option</h3>
      <Toggles>
        <ToggleBtn onClick={() => props.setIsAnswer(true)} id={props.isAnswer ? 'AnsAct' : 'Ans'}>
          <strong>Answer</strong>
        </ToggleBtn>
        <ToggleBtn onClick={() => props.setIsAnswer(false)} id={!props.isAnswer ? 'DistAct' : 'Dist'}>
          <strong>Distractor</strong>
        </ToggleBtn>
      </Toggles>
      <div>
        <Input type="text" placeholder="Suggest an answer or distractor for this question" onChange={updateSuggested}/>
        <CategoryInput getCategory={props.setKeywords} />
        <FillBtn onClick={props.onSubmit}>Submit</FillBtn>
      </div>
    </div>
  )
}

const Input = styled.input`
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #bdbdbd;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  &:placeholder {
    color: #b7bfc7;
  }
  &:focus {
    outline: none;
    border-color: #212121;
  }
`

const Toggles = styled.div`
  margin-bottom: 20px;
`

const ToggleBtn = styled.div<{ id: 'Ans' | 'AnsAct' | 'Dist' | 'DistAct' | 'SubmitBtn' }>`
  display: inline-block;
  padding: 8px 12px 8px 12px;
  text-align: center;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0);
  cursor: pointer;
  ${props =>
    props.id === 'Ans' &&
    css`
      border-color: rgb(30, 144, 30);
      color: rgb(10, 80, 10);
      margin-right: 8px;
    `}
  ${props =>
    props.id === 'AnsAct' &&
    css`
      background-color: rgb(30, 144, 30);
      color: white;
      margin-right: 8px;
    `}
    ${props =>
    props.id === 'Dist' &&
    css`
      border-color: rgb(220, 51, 51);
      color: rgb(205, 0, 0);
    `}
    ${props =>
    props.id === 'DistAct' &&
    css`
      background-color: rgb(220, 51, 51);
      color: white;
    `}
    ${props =>
    props.id === 'SubmitBtn' &&
    css`
      margin-top: 20px;
    `}
`