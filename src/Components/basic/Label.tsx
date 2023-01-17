import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { theme } from '../../styles/theme'

export const Label = (props: { text: string; color: string; size: number }) => {
  return (
    <LabelComponent color={props.color} size={props.size}>
      {props.text}
    </LabelComponent>
  )
}

const LabelComponent = styled.div<{ color: string; size: number }>`
  ${({ color, size }) => css`
    margin-bottom: 12px;
    ${size === 0
      ? css`
          ${theme.typography.hLabel}
        `
      : css`
          ${theme.typography.hStem}
        `}
    ${color === 'blue'
      ? css`
          color: ${theme.palette.primary.main};
        `
      : css`
          color: ${theme.palette.grey[200]};
        `}
  `}
`
