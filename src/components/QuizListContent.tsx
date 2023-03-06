import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { typography, palette } from '@styles/theme'
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
      <QuizText>{title}</QuizText>
      <Item>{options}</Item>
      <Item>{changeDate(date)}</Item>
      <ButtonArea>
        <SolveButton onClick={onSolve}>
          Solve <div>&gt;</div>
        </SolveButton>
        <AddButton onClick={onAddOption}>
          Add Option <div>&gt;</div>
        </AddButton>
      </ButtonArea>
    </QuizList>
  )
}

const QuizList = styled.div<{ type?: 'Content' | 'End' }>`
  display: grid;
  align-items: center;
  grid-template-columns: auto 100px 100px 100px;
  column-gap: 8px;
  background-color: white;
  place-items: left;
  padding: 16px;
  ${typography.b02};
  text-align: center;

  ${props =>
    props.type === 'Content' &&
    css`
      border-bottom: 1px solid #dbdbdb;
      // &:hover {
      //   background-color: #fafafa;
      //   cursor: pointer;
      // }
    `}
  ${props =>
    props.type === 'End' &&
    css`
      border-radius: 0 0 8px 8px;
    `}
    @media(max-width: 599px) {
    grid-template-columns: auto 100px;
    margin: 0 16px;
  }
`

const Item = styled.div`
  overflow: hidden;
  white-space: normal;
  line-height: 1.3;
  word-wrap: break-word;
  text-overflow: ellipsis;
  max-height: 2.6em;
  text-align: center;

  @media (max-width: 599px) {
    display: none;
  }
`

const QuizText = styled.div`
  overflow: hidden;
  white-space: normal;
  line-height: 1.3;
  word-wrap: break-word;
  text-overflow: ellipsis;
  max-height: 2.6em;
  text-align: left;
`

const ButtonArea = styled.div`
  display: grid;
`

const AddButton = styled.button`
  background: none;
  border: none;
  text-align: right;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 4px;
  ${typography.overline};
  margin-bottom: 4px;
  background-color: ${palette.primary.light};
  color: ${palette.primary.dark};

  &:hover {
    background-color: ${palette.primary.main};
    color: white;
    cursor: pointer;
  }
`

const SolveButton = styled.button`
  background: none;
  border: none;
  text-align: right;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 4px;
  ${typography.overline};
  margin-bottom: 4px;

  background-color: ${palette.grey[600]};
  color: black;

  &:hover {
    background-color: ${palette.grey[500]};
    cursor: pointer;
  }
`
