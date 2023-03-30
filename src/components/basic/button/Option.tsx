import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { typography, palette } from '@styles/theme'

interface Props {
  state: boolean
  selected: boolean
  onClick?: () => void
  isAnswer?: boolean
  children: React.ReactNode
}

export const OptionButton = (props: Props) => {
  return (
    <OptionBtnComponent
      onClick={props.onClick}
      state={props.state}
      selected={props.selected}
      isAnswer={props.isAnswer ? 'answer' : null}
    >
      {props.children}
    </OptionBtnComponent>
  )
}

const OptionBtnComponent = styled.div<{ state: boolean; selected: boolean; isAnswer: 'answer' | null }>`
  ${({ state, selected, isAnswer }) => css`
    ${typography.b02};
    background-color: ${palette.background.light};
    padding: 16px;
    margin-bottom: 8px;
    border-radius: 6px;
    border: 1.5px solid rgba(0, 0, 0, 0);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 8px;

    ${!state &&
    css`
      :hover {
        background-color: ${palette.primary.light};
        cursor: pointer;
      }
    `}

    ${selected &&
    css`
      ${typography.b02b};
      color: ${palette.primary.dark};
      background-color: ${palette.primary.light};
      border-color: ${palette.primary.main};
    `}

    ${isAnswer &&
    css`
      background-color: ${palette.tags.answer};
      color: ${palette.primary.light};
    `}
  `}
`
