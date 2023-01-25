import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { theme } from '../../../styles/theme'

interface tagProps {
  onClick: () => void
  id: 'Ans' | 'AnsAct' | 'Dist' | 'DistAct'
  children: React.ReactNode
}

export const TagBtn = (props: tagProps) => {
  return (
    <TagBtnComponent onClick={props.onClick} id={props.id}>
      {props.children}
    </TagBtnComponent>
  )
}

const TagBtnComponent = styled.div<{ id: 'Ans' | 'AnsAct' | 'Dist' | 'DistAct' }>`
  ${theme.typography.b02b};
  display: inline-block;
  padding: 8px 12px 8px 12px;
  text-align: center;
  border-radius: 20px;
  border: 2px solid ${theme.palette.common.transparent};
  cursor: pointer;
  ${props =>
    props.id === 'Ans' &&
    css`
      border-color: ${theme.palette.tags.answer};
      color: ${theme.palette.tags.answer};
      margin-right: 8px;
    `}

  ${props =>
    props.id === 'AnsAct' &&
    css`
      background-color: ${theme.palette.tags.answer};
      color: white;
      margin-right: 8px;
    `}

    ${props =>
    props.id === 'Dist' &&
    css`
      border-color: ${theme.palette.tags.distractor};
      color: ${theme.palette.tags.distractor};
    `}

    ${props =>
    props.id === 'DistAct' &&
    css`
      background-color: ${theme.palette.tags.distractor};
      color: white;
    `}
`
