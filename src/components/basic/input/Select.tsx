import styled from '@emotion/styled'
import { ChangeEvent, useCallback } from 'react'
import { MIN_BUTTON_SIZE } from 'src/constants/ui'
import { View } from '../View'
import { palette } from '@styles/theme'

interface Props {
  options: Readonly<string[]>
  value: string | null
  placeholder?: string
  onSelect: (index: number, value: string) => void
}

export const SelectInput = View<Props>(({ options, onSelect, value, placeholder, ...props }) => {
  const onClickLanguage = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const i = options.findIndex(op => op === e.target.value)
      onSelect(i, options[i])
    },
    [onSelect, options]
  )

  return (
    <Container {...props}>
      <Options onChange={onClickLanguage} value={value ?? ''} placeholder={placeholder}>
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option, i) => (
          <option key={i}>{option}</option>
        ))}
      </Options>
      <ArrowDown />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
`

const Options = styled.select`
  appearance: none;
  padding: 4px 16px 4px 8px;
  border-radius: 8px;
  min-height: ${MIN_BUTTON_SIZE}px;
  cursor: pointer;
  border: 1px solid #ccc;
  outline: none;
  font-size: inherit;
  background-color: transparent;
  color: ${palette.grey100};
  width: min-content;

  option[value=''][disabled] {
    display: none;
  }
`

const ArrowDown = styled.div`
  color: ${palette.grey100};
  position: absolute;
  top: calc(50% - 4px);
  right: 6px;
  width: 6px;
  height: 6px;
  pointer-events: none;
  border: 2px solid currentColor;
  border-right: none;
  border-top: none;
  transform: rotate(-45deg);
`
