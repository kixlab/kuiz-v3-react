import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { typography } from '../styles/theme'
import { useCallback } from 'react'

interface Props {
  index: number
  title: string
  options: number
  date: Date
  type: 'Content' | 'End'
}

export const QuizListContent = (props: Props) => {
  const changeDate = useCallback((date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}/${month}/${day}`
  }, [])

  return (
    <QuizList id={props.type}>
      <Item>{props.title}</Item>
      <Item>{props.options}</Item>
      <Item>{changeDate(props.date)}</Item>
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
  ${typography.b02};
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
