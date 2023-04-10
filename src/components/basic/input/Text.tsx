import styled from '@emotion/styled'
import { typography, palette } from '@styles/theme'
import { View } from '../View'
import { MIN_BUTTON_SIZE } from 'src/constants/ui'

interface Props {
  placeholder?: string
  value: string
  onChange?: (v: string) => void
  disabled?: boolean
}

export const TextInput = View<Props>(({ placeholder, value, onChange, disabled = false, ...props }) => {
  return (
    <TextInputComponent
      {...props}
      type="text"
      placeholder={placeholder}
      onChange={e => onChange?.(e.target.value)}
      value={value}
      disabled={disabled}
    />
  )
})

const TextInputComponent = styled.input`
  ${typography.b02};
  padding: 16px;
  border-radius: 6px;
  border: 1px solid ${palette.grey500};
  width: 100%;
  box-sizing: border-box;
  min-height: ${MIN_BUTTON_SIZE}px;
  &::placeholder {
    color: ${palette.grey500};
  }
  &:focus {
    outline: none;
    border-color: ${palette.grey200};
  }
  &:disabled {
    background-color: ${palette.grey600};
    cursor: not-allowed;
  }
`
