import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { MOBILE_WIDTH_THRESHOLD } from 'src/constants/ui'

export const QuizListHeader = () => {
  return (
    <QuizList>
      <Legend>Question</Legend>
      <Legend># Options</Legend>
      <Legend>Actions</Legend>
    </QuizList>
  )
}

const QuizList = styled.div`
  ${typography.b02b};
  width: calc(100% - 40px);
  display: grid;
  grid-template-columns: auto 100px 130px;
  align-items: center;
  column-gap: 8px;
  text-align: center;
  padding: 20px;
  background-color: ${palette.primaryDark};
  color: ${palette.common.white};
  border-radius: 8px 8px 0 0;
  @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
    grid-template-columns: auto 0 0 100px;
  }
`

const Legend = styled.div`
  overflow: hidden;
`
