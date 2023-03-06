import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { typography, palette } from '@styles/theme'

export const QuizListHeader = () => {
  return (
    <QuizList id="Header">
      <div>Question</div>
      <Item># Options</Item>
      <Item>Last Updated</Item>
      <div>Actions</div>
    </QuizList>
  )
}

const QuizList = styled.div<{ id: 'Header' }>`
  ${typography.b02b};
  display: grid;
  grid-template-columns: auto 100px 100px 100px;
  column-gap: 8px;
  text-align: center;
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
    grid-template-columns: auto 100px;
    padding: 12px;
    margin: 16px 16px 0;
  }
`

const Item = styled.div`
  @media (max-width: 599px) {
    display: none;
  }
`
