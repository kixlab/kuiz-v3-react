import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { typography } from '@styles/theme'
import { useCallback } from 'react'

interface Props {
  title: string
  options: number
  date: Date
  type: 'Content' | 'End'
  onSolve: () => void
  onAddOption: () => void
}

export const QuizListContent = ({ title, options, date, type, onAddOption, onSolve }: Props) => {
  const changeDate = useCallback((date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}/${month}/${day}`
  }, [])

  return (
    <QuizList type={type}>
      <Item>{title}</Item>
      <Item>{options}</Item>
      <Item>{changeDate(date)}</Item>
      <button onClick={onSolve}>Solve</button>
      <button onClick={onAddOption}>Add Option</button>
    </QuizList>
  )
}

const QuizList = styled.div<{ type?: 'Content' | 'End' }>`
  display: grid;
  grid-template-columns: auto 110px 130px;
  background-color: white;
  place-items: left;
  padding: 20px;
  ${typography.b02};
  text-align: center;

  ${props =>
    props.type === 'Content' &&
    css`
      border-bottom: 1px solid #dbdbdb;
      &:hover {
        background-color: #fafafa;
        cursor: pointer;
      }
    `}
  ${props =>
    props.type === 'End' &&
    css`
      border-radius: 0 0 8px 8px;
    `}
    @media(max-width: 599px) {
    grid-template-columns: auto 60px 90px;
  }
`

const Item = styled.div`
  overflow: hidden;
  white-space: normal;
  line-height: 1.3;
  word-wrap: break-word;
  text-overflow: ellipsis;
  max-height: 2.6em;
`
