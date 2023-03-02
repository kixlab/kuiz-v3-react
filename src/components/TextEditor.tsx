import { palette } from '@styles/theme'
import styled from '@emotion/styled'
import { useCallback } from 'react'

interface Props {
  value: string
  placeholder?: string
  onChange: (state: string) => void
}

export const TextEditor = ({ value, placeholder = 'Write down the content here', onChange }: Props) => {
  const onValueChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return <Editor value={value} onChange={onValueChange} placeholder={placeholder} rows={4} />
}

const Editor = styled.textarea`
  border: 1px solid ${palette.grey[500]};
  padding: 16px;
  border-radius: 6px;
  height: 200px;
  resize: none;
`
