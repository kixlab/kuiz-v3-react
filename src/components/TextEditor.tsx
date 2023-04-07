import { palette } from '@styles/theme'
import styled from '@emotion/styled'
import { useCallback } from 'react'
import { View } from './basic/View'

interface Props {
  value: string
  placeholder?: string
  rows?: number
  onChange: (state: string) => void
}

export const TextEditor = View<Props>(({ value, placeholder = '', rows = 2, onChange, ...props }) => {
  const onValueChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return <Editor {...props} value={value} onChange={onValueChange} placeholder={placeholder} rows={rows} />
})

const Editor = styled.textarea`
  border: 1px solid ${palette.grey[500]};
  padding: 16px;
  border-radius: 6px;
  resize: none;
  width: calc(100% - 32px);
  font-family: inherit;
  font-size: inherit;
`
