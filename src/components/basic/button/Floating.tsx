import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { MIN_BUTTON_SIZE, MOBILE_WIDTH_THRESHOLD } from 'src/constants/ui'

interface Props {
  children: React.ReactNode
  onClick: () => void
  bottom: number | string
  right: number | string
}

export function FloatingButton({ children, bottom, right, onClick }: Props) {
  return (
    <Container onClick={onClick} bottom={bottom} right={right}>
      {children}
    </Container>
  )
}

const Container = styled.button<{ bottom: number | string; right: number | string }>`
  ${({ bottom, right }) => css`
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
    right: ${typeof right === 'number' ? right + 'px' : right};
    bottom: ${typeof bottom === 'number' ? bottom + 'px' : bottom};
    box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.25);
    font-size: 14px;
    z-index: 1000;

    &:hover {
      background-color: ${palette.grey600};
      cursor: pointer;
    }

    @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
      right: 8px;
    }
  `}
`
