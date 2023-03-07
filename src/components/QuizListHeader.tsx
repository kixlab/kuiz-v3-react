import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { MOBILE_WIDTH_THRESHOLD } from 'src/constants/ui'

export const QuizListHeader = () => {
  return (
    <QuizList>
      <div>Question</div>
      <Item># Options</Item>
      <Item>Last Updated</Item>
      <div>Actions</div>
    </QuizList>
  )
}

const QuizList = styled.div`
  ${typography.b02b};
  display: grid;
  grid-template-columns: auto 100px 100px 100px;
  column-gap: 8px;
  text-align: center;
  place-items: left;
  padding: 20px;
  background-color: ${palette.primary.dark};
  color: ${palette.common.white};
  border-radius: 8px 8px 0 0;
`

const Item = styled.div`
  @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
    display: none;
  }
`
