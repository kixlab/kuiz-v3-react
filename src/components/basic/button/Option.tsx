import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { typography, palette } from '@styles/theme'
import { View } from '../View'

interface Props {
  state: boolean
  selected: boolean
  onClick?: () => void
  isAnswer?: boolean
  children: React.ReactNode
}

export const OptionButton = View<Props>(({ onClick, state, selected, isAnswer, children, ...props }) => {
  return (
    <OptionBtnComponent
      {...props}
      onClick={onClick}
      state={state}
      selected={selected}
      isAnswer={isAnswer ? 'answer' : null}
    >
      {children}
    </OptionBtnComponent>
  )
})

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
        background-color: ${palette.primaryLight};
        cursor: pointer;
      }
    `}

    ${selected &&
    css`
      ${typography.b02b};
      color: ${palette.primaryDark};
      background-color: ${palette.primaryLight};
      border-color: ${palette.primaryMain};
    `}

    ${isAnswer &&
    css`
      background-color: ${palette.tags.answer};
      color: ${palette.primaryLight};
    `}
  `}
`
