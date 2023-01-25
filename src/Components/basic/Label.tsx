import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { palette, typography } from '../../styles/theme'

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
          ${typography.hLabel}
        `
      : css`
          ${typography.hStem}
        `}
    ${color === 'blue'
      ? css`
          color: ${palette.primary.main};
        `
      : css`
          color: ${palette.grey[200]};
        `}
  `}
`
