import styled from '@emotion/styled'
import { typography, palette } from '@styles/theme'

interface Props {
  placeholder: string
  value?: string
  onChange: (v: string) => void
}

export const TextInput = ({ placeholder, value = '', onChange }: Props) => {
  return (
    <TextInputComponent type="text" placeholder={placeholder} onChange={e => onChange(e.target.value)} value={value} />
  )
}

const TextInputComponent = styled.input`
  ${typography.b02};
  padding: 16px;
  border-radius: 6px;
  border: 1px solid ${palette.grey[500]};
  width: 100%;
  box-sizing: border-box;
  &::placeholder {
    color: ${palette.grey[500]};
  }
  &:focus {
    outline: none;
    border-color: ${palette.grey[200]};
  }
`
