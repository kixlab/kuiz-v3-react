import styled from '@emotion/styled'
import { ChangeEvent, useCallback } from 'react'
import { MIN_BUTTON_SIZE } from 'src/constants/ui'

interface Props {
  options: Readonly<string[]>
  value: string | null
  placeholder?: string
  onSelect: (index: number, value: string) => void
}

export const SelectInput = ({ options, onSelect, value, placeholder }: Props) => {
  const onClickLanguage = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const i = options.findIndex(op => op === e.target.value)
      onSelect(i, options[i])
    },
    [onSelect, options]
  )

  return (
    <Options onChange={onClickLanguage} value={value ?? ''} placeholder={placeholder}>
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option, i) => (
        <option key={i}>{option}</option>
      ))}
    </Options>
  )
}

const Options = styled.select`
  padding: 4px 8px;
  border-radius: 8px;
  height: ${MIN_BUTTON_SIZE}px;
  cursor: pointer;
  border: 1px solid #ccc;
  outline: none;
  width: 100%;
  font-size: inherit;
  background-color: transparent;
  color: inherit;
  width: min-content;

  option[value=''][disabled] {
    display: none;
  }
`
