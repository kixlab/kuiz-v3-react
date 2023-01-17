import styled from '@emotion/styled'
import { theme } from '../../../styles/theme'

interface buttonProps {
  text: string
  onClick?: () => void
  disabled?: boolean
}

export const FillBtn = (props: buttonProps) => {
  return (
    <Fill onClick={props.onClick} disabled={props.disabled}>
      {props.text}
    </Fill>
  )
}

export const StrokeBtn = (props: buttonProps) => {
  return <Stroke onClick={props.onClick}>{props.text}</Stroke>
}

export const TextBtn = (props: buttonProps) => {
  return (
    <Text onClick={props.onClick} style={{ color: `${theme.palette.grey[400]}` }}>
      {props.text}
    </Text>
  )
}

export const TextBtnCta = (props: buttonProps) => {
  return (
    <Text onClick={props.onClick} style={{ color: `${theme.palette.primary.dark}` }}>
      {props.text}
    </Text>
  )
}

const Fill = styled.button`
  ${theme.typography.button};
  width: 100%;
  padding: 16px;
  border-radius: 6px;
  border: none;
  color: ${theme.palette.common.white};
  background-color: ${theme.palette.primary.main};
  cursor: pointer;
  &:hover {
    background-color: ${theme.palette.primary.dark};
  }
  &:disabled {
    background-color: ${theme.palette.grey[500]};
  }
  @media (max-width: 599px) {
    padding: 12px;
  }
`

const Stroke = styled.button`
  ${theme.typography.button};
  width: 100%;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid ${theme.palette.grey[500]};
  color: ${theme.palette.grey[200]};
  background-color: ${theme.palette.common.white};
  cursor: pointer;
  &:hover {
    background-color: ${theme.palette.background.light};
  }
  @media (max-width: 599px) {
    padding: 12px;
  }
`
const Text = styled.button`
  ${theme.typography.button};
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 599px) {
    padding: 6px;
  }
`
