import styled from '@emotion/styled'
import { ChangeEvent, useCallback } from 'react'
import { MIN_BUTTON_SIZE } from 'src/constants/ui'

interface Props {
  children?: React.ReactNode
  options: Readonly<string[]>
  value: string | null
  placeholder?: string
  onSelect: (index: number, value: string) => void
}

export const SelectInput = ({ options, children, onSelect, value, placeholder }: Props) => {
  const onClickLanguage = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const i = options.findIndex(op => op === e.target.value)
      onSelect(i, options[i])
    },
    [onSelect, options]
  )

  return (
    <div>
      <Tag>{children}</Tag>
      <Options onChange={onClickLanguage} value={value ?? undefined} placeholder={placeholder}>
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((option, i) => (
          <option key={i}>{option}</option>
        ))}
      </Options>
    </div>
  )
}

const Options = styled.select`
  padding: 4px;
  border-radius: 8px;
  height: ${MIN_BUTTON_SIZE}px;
  cursor: pointer;
  border: 1px solid #ccc;
  outline: none;
  width: 100%;
  font-size: inherit;
  option[value=''][disabled] {
    display: none;
  }
`

const Tag = styled.div`
  margin-bottom: 4px;
  font-size: 18px;
`
