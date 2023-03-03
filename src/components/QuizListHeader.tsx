import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { typography, palette } from '@styles/theme'

export const QuizListHeader = () => {
  return (
    <QuizList id="Header">
      <div>Question</div>
      <div># Options</div>
      <div>Last Updated</div>
    </QuizList>
  )
}

const QuizList = styled.div<{ id: 'Header' }>`
  ${typography.b02b};
  display: grid;
  grid-template-columns: auto 110px 130px;
  background-color: white;
  place-items: left;
  padding: 20px;
  ${props =>
    props.id === 'Header' &&
    css`
      height: auto;
      background-color: ${palette.primary.dark};
      color: ${palette.common.white};
      border-radius: 8px 8px 0 0;
      margin-top: 40px;
    `}
  @media(max-width: 599px) {
    grid-template-columns: auto 60px 90px;
  }
`
