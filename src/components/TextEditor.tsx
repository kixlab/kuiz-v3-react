import { palette } from '@styles/theme'
import styled from '@emotion/styled'
import { useCallback } from 'react'

interface Props {
  value: string
  placeholder?: string
  rows?: number
  onChange: (state: string) => void
}

export const TextEditor = ({ value, placeholder = 'Write down the content here', rows = 2, onChange }: Props) => {
  const onValueChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return <Editor value={value} onChange={onValueChange} placeholder={placeholder} rows={rows} />
}

const Editor = styled.textarea`
  border: 1px solid ${palette.grey[500]};
  padding: 16px;
  border-radius: 6px;
  resize: none;
  width: calc(100% - 32px);
  font-family: inherit;
`
