import styled from '@emotion/styled'
import { OptionBtn } from '../Components/basic/button/OptionButton'
import { Label } from '../Components/basic/Label'
import { CreateNewOption } from '../Components/CreateNewOption'

export function DetailAndCreateOption() {
  return (
    <QuestionBox>
      <Section>
        <Label text="Learning Objective" color="blue" size={0} />
        <div>abcd</div>
      </Section>
      <Section>
        <Label text="Explanation" color="blue" size={0} />
        <div>abcd</div>
      </Section>
      <DividerLine />
      <Label text="Q. abcd" color="black" size={1} />
      <div>
        <OptionBtn state={true} selected={false}>
          Option 1
        </OptionBtn>
        <OptionBtn state={true} selected={false}>
          Option 2
        </OptionBtn>
        <OptionBtn state={true} selected={false}>
          Option 3
        </OptionBtn>
      </div>
      <DividerLine />
      <CreateNewOption />
    </QuestionBox>
  )
}

const QuestionBox = styled.div`
  border-radius: 8px;
  background-color: white;
  margin: 40px 0 40px 0;
  padding: 10px 30px 30px 30px;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const DividerLine = styled.hr`
  border: 0;
  height: 1px;
  background-color: #dbdbdb;
  margin: 30px 0 20px 0;
`
