import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { MIN_BUTTON_SIZE } from 'src/constants/ui'
import { View } from '../View'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const StrokeButton = View<Props>(({ onClick, children, disabled, ...props }) => {
  return (
    <Stroke {...props} onClick={onClick} disabled={disabled ? disabled : false}>
      {children}
    </Stroke>
  )
})

const Stroke = styled.button`
  ${typography.button};
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid ${palette.grey500};
  color: ${palette.grey200};
  background-color: ${palette.common.white};
  cursor: pointer;
  &:hover {
    background-color: ${palette.background.light};
  }
  min-height: ${MIN_BUTTON_SIZE}px;
  &:disabled {
    background-color: ${palette.grey500};
  }
`
