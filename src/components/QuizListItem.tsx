import styled from '@emotion/styled'
import { typography } from '@styles/theme'
import { SmallPrimaryButton } from './basic/button/SmallPrimary'
import { SmallSecondaryButton } from './basic/button/SmallSecondary'

interface Props {
  title: string
  options: number
  date: Date
  onSolve: () => void
  onAddOption: () => void
}

export const QuizListItem = ({ title, options, date, onAddOption, onSolve }: Props) => {
  return (
    <QuizList>
      <QuizText>{title}</QuizText>
      <Item>{options}</Item>
      <Item>{date.toLocaleDateString()}</Item>
      <ButtonArea>
        <SmallSecondaryButton onClick={onSolve}>
          Solve <div>&gt;</div>
        </SmallSecondaryButton>
        <SmallPrimaryButton onClick={onAddOption}>
          Add Option <div>&gt;</div>
        </SmallPrimaryButton>
      </ButtonArea>
    </QuizList>
  )
}

const QuizList = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 100px 100px 100px;
  column-gap: 8px;
  background-color: white;
  place-items: left;
  padding: 16px;
  ${typography.b02};
  text-align: center;
  border-bottom: 1px solid #dbdbdb;

  @media (max-width: 599px) {
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
