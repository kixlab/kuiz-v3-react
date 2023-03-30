import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { MIN_BUTTON_SIZE, MOBILE_WIDTH_THRESHOLD } from 'src/constants/ui'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  color: typeof palette.primary.dark | (typeof palette.grey)[400]
}
export const TextButton = ({ onClick, children, color }: Props) => {
  return (
    <Text onClick={onClick} style={{ color }}>
      {children}
    </Text>
  )
}

const Text = styled.button`
  ${typography.button};
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  min-height: ${MIN_BUTTON_SIZE}px;

  &:hover {
    text-decoration: underline;
  }
  @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
    padding: 6px;
  }
`
