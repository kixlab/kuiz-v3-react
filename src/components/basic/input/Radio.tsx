import styled from '@emotion/styled'
import { useCallback, useId } from 'react'
import { MIN_BUTTON_SIZE } from 'src/constants/ui'
import { View } from '../View'

interface Props {
  options: Readonly<string[]>
  value: number
  onSelect: (index: number, value: string) => void
}

export const RadioInput = View<Props>(({ options, onSelect, value, ...props }) => {
  const id = useId()
  const onClick = useCallback(
    (i: number) => () => {
      onSelect(i, options[i])
    },
    [onSelect, options]
  )

  return (
    <Container {...props}>
      {options.map((option, i) => (
        <Option key={i}>
          <Input
            type="radio"
            id={option}
            name={id}
            value={option}
            checked={i === value}
            onClick={onClick(i)}
            readOnly
          />
          <Label htmlFor={option}>{option}</Label>
        </Option>
      ))}
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  font-size: inherit;
  color: inherit;
`

const Option = styled.div`
  min-height: 30px;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  margin: 0 8px 0 0;
  cursor: pointer;
`

const Label = styled.label`
  cursor: pointer;
`
