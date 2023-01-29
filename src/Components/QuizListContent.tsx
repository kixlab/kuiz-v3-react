import styled from '@emotion/styled'
import { css } from '@emotion/react'

interface propsType{
  index:number;
  title: string;
  options: number;
  date: string;
  type: 'Content' | 'End'
}

export const QuizListContent = (props: propsType) => {
  const changeDate = (date:string)=>{
    const givenDate = new Date(date)
    const year = givenDate.getFullYear()
    const month = givenDate.getMonth() + 1
    const day = givenDate.getDate()
    return (
      `${year}/${month}/${day}`
    )
  }
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
`

const Item = styled.div`
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
