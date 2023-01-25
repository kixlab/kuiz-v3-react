import { useState } from 'react'
import { CategoryInput } from './CategoryInput'
import styled from '@emotion/styled'
import { FillBtn } from './basic/button/Button'
import { TextInput } from './basic/InputBox'
import { TagBtn } from './basic/button/TagButton'
import { Label } from './basic/Label'

export const CreateNewOption = () => {
  const [tag, setTag] = useState<string>('Ans')

  function getCategory(cats: string[]) {
    console.log(cats)
  }

  return (
    <div>
      <Container>
        <div>
          <Label text="Create New Option" color="blue" size={0} />
          <TagBtn onClick={() => setTag('Ans')} id={tag == 'Ans' ? 'AnsAct' : 'Ans'}>
            Answer
          </TagBtn>
          <TagBtn onClick={() => setTag('Dist')} id={tag == 'Dist' ? 'DistAct' : 'Dist'}>
            Distractor
          </TagBtn>
        </div>
        <Block>
          <TextInput placeholder="Suggest an answer or distractor for this question" />
          <CategoryInput getCategory={getCategory} />
        </Block>
        <FillBtn>Submit</FillBtn>
      </Container>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 0 10px 0;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
