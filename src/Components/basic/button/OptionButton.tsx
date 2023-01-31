import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { palette, typography } from '../../../styles/theme'

interface Props {
  state: boolean
  selected: boolean
  onClick?: () => void
  children: React.ReactNode
}

export const OptionBtn = (props: Props) => {
  return (
    <OptionBtnComponent onClick={props.onClick} state={props.state} selected={props.selected}>
      {props.children}
    </OptionBtnComponent>
  )
}

const OptionBtnComponent = styled.div<{ state: boolean; selected: boolean }>`
  ${({ state, selected }) => css`
    ${typography.b02};
    background-color: ${palette.background.light};
    padding: 16px;
    margin-bottom: 8px;
    border-radius: 6px;
    border: 1.5px solid rgba(0, 0, 0, 0);

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
  `}
`
