import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'

interface Props {
  children: React.ReactNode
  onClick: () => void
}

export function SmallPrimaryButton({ children, onClick }: Props) {
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
  background-color: ${palette.primaryLight};
  color: ${palette.primaryDark};

  &:hover {
    background-color: ${palette.primaryMain};
    color: white;
    cursor: pointer;
  }
`
