import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'

interface Props {
  children: React.ReactNode
  onClick: () => void
}

export function SmallSecondaryButton({ children, onClick }: Props) {
  return <Container onClick={onClick}>{children}</Container>
}

const Container = styled.button`
  border: none;
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 4px;
  ${typography.overline};
  background-color: ${palette.grey600};
  color: black;

  &:hover {
    background-color: ${palette.grey500};
    cursor: pointer;
  }
`
