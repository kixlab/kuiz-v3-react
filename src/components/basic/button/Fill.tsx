import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { MIN_BUTTON_SIZE } from 'src/constants/ui'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const FillButton = (props: Props) => {
  return (
    <Fill onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </Fill>
  )
}

const Fill = styled.button`
  ${typography.button};
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: none;
  color: ${palette.common.white};
  background-color: ${palette.primary.main};
  min-height: ${MIN_BUTTON_SIZE}px;
  cursor: pointer;
  &:hover {
    background-color: ${palette.primary.dark};
  }
  &:disabled {
    background-color: ${palette.grey[500]};
  }
`
