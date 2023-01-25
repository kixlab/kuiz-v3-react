import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { theme } from '../../../styles/theme'

interface OptionProps {
  state: boolean
  selected: boolean
  onClick?: () => void
  children: React.ReactNode
}

export const OptionBtn = (props: OptionProps) => {
  return (
    <OptionBtnComponent onClick={props.onClick} state={props.state} selected={props.selected}>
      {props.children}
    </OptionBtnComponent>
  )
}

const OptionBtnComponent = styled.div<{ state: boolean; selected: boolean }>`
  ${({ state, selected }) => css`
    ${theme.typography.b02};
    background-color: ${theme.palette.background.light};
    padding: 16px;
    margin-bottom: 8px;
    border-radius: 6px;
    border: 1.5px solid rgba(0, 0, 0, 0);

    ${!state &&
    css`
      :hover {
        background-color: ${theme.palette.primary.light};
        cursor: pointer;
      }
    `}

    ${selected &&
    css`
      ${theme.typography.b02b};
      color: ${theme.palette.primary.dark};
      background-color: ${theme.palette.primary.light};
      border-color: ${theme.palette.primary.main};
    `}
  `}
`
