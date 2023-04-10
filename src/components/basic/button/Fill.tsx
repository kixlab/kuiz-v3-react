import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { MIN_BUTTON_SIZE } from 'src/constants/ui'
import { View } from '../View'
import { css } from '@emotion/react'

interface Props {
  fill?: 'primaryMain' | 'primaryDark'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const FillButton = View<Props>(({ children, onClick, disabled, fill = 'primaryMain', ...props }) => {
  return (
    <Fill {...props} onClick={onClick} disabled={disabled} fill={fill}>
      {children}
    </Fill>
  )
})

const Fill = styled.button<{ fill: 'primaryMain' | 'primaryDark' }>`
  ${({ fill }) => css`
    ${typography.button};
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: none;
    color: ${palette.common.white};
    background-color: ${palette[fill]};
    min-height: ${MIN_BUTTON_SIZE}px;
    cursor: pointer;
    &:hover {
      background-image: linear-gradient(rgb(0 0 0/20%) 0 0);
      background-blend-mode: darken;
    }
    &:disabled {
      background-color: ${palette.grey500};
    }
  `}
`
