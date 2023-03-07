import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { MIN_BUTTON_SIZE, MOBILE_WIDTH_THRESHOLD } from 'src/constants/ui'

interface Props {
  children: React.ReactNode
  onClick: () => void
}

export function FloatingButton({ children, onClick }: Props) {
  return <Container onClick={onClick}>{children}</Container>
}

const Container = styled.button`
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 100px;
  ${typography.overline};
  min-height: ${MIN_BUTTON_SIZE}px;
  min-width: ${MIN_BUTTON_SIZE}px;
  background: ${palette.common.white};
  color: black;
  position: fixed;
  right: 80px;
  bottom: 40px;
  box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.25);
  font-size: 14px;
  z-index: 1000;

  &:hover {
    background-color: ${palette.grey[600]};
    cursor: pointer;
  }

  @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
    right: 24px;
    bottom: 24px;
  }
`
