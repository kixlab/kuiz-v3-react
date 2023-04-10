import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { typography, palette } from '@styles/theme'
import { View } from './View'

interface Props {
  children: React.ReactNode
  color?: 'primaryMain' | 'grey200' | 'white'
  size?: number
}

export const Label = View<Props>(({ children, color = 'grey200', size = 0, ...props }) => {
  return (
    <LabelComponent {...props} color={color} size={size}>
      {children}
    </LabelComponent>
  )
})

const LabelComponent = styled.div<{ color: 'primaryMain' | 'grey200' | 'white'; size: number }>`
  ${({ color, size }) => css`
    ${size === 0
      ? css`
          ${typography.hLabel}
        `
      : css`
          ${typography.hStem}
        `}
    color: ${palette[color]};
  `}
`
