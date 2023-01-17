import styled from '@emotion/styled'
import { theme } from '../../styles/theme'

export const TextInput = (props: { placeholder: string }) => {
  return <TextInputComponent type="text" placeholder={props.placeholder} />
}

const TextInputComponent = styled.input`
  ${theme.typography.b02};
  padding: 16px;
  border-radius: 6px;
  border: 1px solid ${theme.palette.grey[500]};
  width: 100%;
  box-sizing: border-box;
  &::placeholder {
    color: ${theme.palette.grey[500]};
  }
  &:focus {
    outline: none;
    border-color: ${theme.palette.grey[200]};
  }
`
