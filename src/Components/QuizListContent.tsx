import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { theme } from '../styles/theme'

export const QuizListContent = (props: { type: 'Content' | 'End' }) => {
  return (
    <QuizList id={props.type}>
      <Item>What is the main question?</Item>
      <Item>3</Item>
      <Item>1 day ago</Item>
    </QuizList>
  )
}

const QuizList = styled.div<{ id?: 'Content' | 'End' }>`
  display: grid;
  grid-template-columns: auto 110px 130px;
  background-color: white;
  place-items: left;
  padding: 20px;
  ${props =>
    props.id === 'Content' &&
    css`
      border-bottom: 1px solid #dbdbdb;
      &:hover {
        background-color: #fafafa;
        cursor: pointer;
      }
    `}
  ${props =>
    props.id === 'End' &&
    css`
      border-radius: 0 0 8px 8px;
    `}
    @media(max-width: 599px) {
    grid-template-columns: auto 60px 90px;
  }
`

const Item = styled.div`
  ${theme.typography.b02};
  padding-right: 20px;
  overflow: hidden;
  white-space: normal;
  line-height: 1.3;
  max-height: 2.6em;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`
