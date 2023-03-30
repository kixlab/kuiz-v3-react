import styled from '@emotion/styled'
import { useCallback } from 'react'
import { FillButton } from './basic/button/Fill'
import { TagButton } from './basic/button/Tag'
import { TextInput } from './basic/input/Text'
import { Label } from './basic/Label'
import { CategoryInput } from './CategoryInput'

interface Props {
  isAnswer: boolean
  setIsAnswer: (item: boolean) => void
  setOption: (item: string) => void
  setKeywords: (item: string[]) => void
  onSubmit: () => void
}

export const CreateNewOption = (props: Props) => {
  const updateSuggested = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.setOption(e.target.value)
    },
    [props]
  )

  return (
    <div>
      <Container>
        <div>
          <Label color="blue" size={0}>
            Create New Option
          </Label>
          <TagButton onClick={() => props.setIsAnswer(true)} id={props.isAnswer ? 'AnsAct' : 'Ans'}>
            Answer
          </TagButton>
          <TagButton onClick={() => props.setIsAnswer(false)} id={!props.isAnswer ? 'DistAct' : 'Dist'}>
            Distractor
          </TagButton>
        </div>
        <Block>
          <TextInput placeholder="Suggest an answer or distractor for this question" onChange={updateSuggested} />
          <CategoryInput getCategory={props.setKeywords} />
        </Block>
        <FillButton onClick={props.onSubmit}>Submit</FillButton>
      </Container>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
