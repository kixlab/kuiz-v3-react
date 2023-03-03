import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const FillBtn = (props: Props) => {
  return (
    <Fill onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </Fill>
  )
}

export const StrokeBtn = (props: Props) => {
  return <Stroke onClick={props.onClick}>{props.children}</Stroke>
}

export const TextBtn = (props: Props) => {
  return (
    <Text onClick={props.onClick} style={{ color: `${palette.grey[400]}` }}>
      {props.children}
    </Text>
  )
}

export const TextBtnCta = (props: Props) => {
  return (
    <Text onClick={props.onClick} style={{ color: `${palette.primary.dark}` }}>
      {props.children}
    </Text>
  )
}

const Fill = styled.button`
  ${typography.button};
  width: 100%;
  padding: 16px;
  border-radius: 6px;
  border: none;
  color: ${palette.common.white};
  background-color: ${palette.primary.main};
  cursor: pointer;
  &:hover {
    background-color: ${palette.primary.dark};
  }
  &:disabled {
    background-color: ${palette.grey[500]};
  }
`

const Stroke = styled.button`
  ${typography.button};
  width: 100%;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid ${palette.grey[500]};
  color: ${palette.grey[200]};
  background-color: ${palette.common.white};
  cursor: pointer;
  &:hover {
    background-color: ${palette.background.light};
  }
`
const Text = styled.button`
  ${typography.button};
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
