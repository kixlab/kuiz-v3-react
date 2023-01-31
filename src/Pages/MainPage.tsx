import styled from '@emotion/styled'
import { QuizListContent } from '../Components/QuizListContent'
import { QuizListHeader } from '../Components/QuizListHeader'

export function MainPage() {
  return (
    <BoxShadow>
      <QuizListHeader />
      <QuizListContent type="Content" />
      <QuizListContent type="Content" />
      <QuizListContent type="Content" />
      <QuizListContent type="End" />
    </BoxShadow>
  )
}

const BoxShadow = styled.div`
  box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.12);
  border-radius: 8px;
`
