import styled from '@emotion/styled'
import { palette, typography } from '../../styles/theme'

export const TextInput = (props: { placeholder: string, onChange:((e:React.ChangeEvent<HTMLInputElement>)=>void) }) => {
  return <TextInputComponent type="text" placeholder={props.placeholder} />
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
