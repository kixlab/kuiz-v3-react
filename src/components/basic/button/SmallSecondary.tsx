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
  background: none;
  border: none;
  text-align: right;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 4px;
  ${typography.overline};
  margin-bottom: 4px;

  background-color: ${palette.grey[600]};
  color: black;

  &:hover {
    background-color: ${palette.grey[500]};
    cursor: pointer;
  }
`
