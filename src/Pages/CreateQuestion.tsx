import styled from '@emotion/styled'
import { FillBtn } from '../Components/basic/button/Button'
import { TextInput } from '../Components/basic/InputBox'
import { Label } from '../Components/basic/Label'
import { CategoryInput } from '../Components/CategoryInput'
import { TextEditor } from '../Components/TextEditor'
import { theme } from '../styles/theme'

export function CreateQuestion() {
  function getCategory(cats: string[]) {
    console.log(cats)
  }

  return (
    <CreateQBox>
      <div>
        <Label text="Learning Objective" color="blue" size={0} />
        <CategoryInput getCategory={getCategory} />
      </div>
      <div>
        <Label text="Question Stem" color="blue" size={0} />
        <TextEditor />
      </div>
      <div>
        <Label text="Explanation" color="blue" size={0} />
        <TextEditor />
      </div>
      <div>
        <Label text="Answer" color="blue" size={0} />
        <TextInput placeholder="Suggest an answer" />
      </div>
      <FillBtn>Submit</FillBtn>
    </CreateQBox>
  )
}

const CreateQBox = styled.div`
  background-color: ${theme.palette.common.white};
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 0 30px 0;
`
