import styled from '@emotion/styled'
import { palette } from '@styles/theme'

interface Props {
  numberOfPages: number
  currentPage: number
  URL: string
}

export const Pagination = ({ numberOfPages, currentPage, URL }: Props) => {
  const hasNext = currentPage < numberOfPages
  const hasPrevious = currentPage > 1
  const previousPage = currentPage - 1 > 0 ? currentPage - 1 : 1
  const nextPage = currentPage + 1 <= numberOfPages ? currentPage + 1 : numberOfPages
  const pages = []
  if (numberOfPages <= 5) {
    for (let i = 1; i <= numberOfPages; i++) {
      pages.push(
        <Page href={`${URL}&page=${i}`} key={i} active={currentPage === i} disabled={currentPage === i}>
          {i}
        </Page>
      )
    }
  } else {
    const start = currentPage - 1 < 1 ? currentPage : currentPage - 1
    const end = currentPage + 1 > numberOfPages ? currentPage : currentPage + 1
    if (start < currentPage && start > 1) {
      pages.push(
        <Page href={`${URL}&page=${start - 1}`} key={start - 1} disabled={false}>
          ...
        </Page>
      )
    }
    for (let i = start; i <= end; i++) {
      pages.push(
        <Page href={`${URL}&page=${i}`} key={i} active={currentPage === i} disabled={currentPage === i}>
          {i}
        </Page>
      )
    }
    if (end > currentPage && end < numberOfPages) {
      pages.push(
        <Page href={`${URL}&page=${end + 1}`} key={end + 1} disabled={false}>
          ...
        </Page>
      )
    }
  }
  return (
    <>
      {numberOfPages > 1 ? (
        <Container>
          <PagesContainer>
            <Page href={`${URL}&page=${1}`} skipper={true} disabled={!hasPrevious} initialItem={true}>
              &#171;
            </Page>
            <Page href={`${URL}&page=${previousPage}`} skipper={true} disabled={!hasPrevious}>
              &#8249;
            </Page>
            {pages}
            <Page href={`${URL}&page=${nextPage}`} skipper={true} disabled={!hasNext}>
              &#8250;
            </Page>
            <Page href={`${URL}&page=${numberOfPages}`} skipper={true} disabled={!hasNext} finalItem={true}>
              &#187;
            </Page>
          </PagesContainer>
        </Container>
      ) : null}
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const PagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 5px;
  background: ${palette.common.white};
  box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.12);
`

const Page = styled.a<{
  skipper?: boolean
  active?: boolean
  disabled: boolean
  initialItem?: boolean
  finalItem?: boolean
}>`
  border: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 35px;
  width: 35px;
  font-size: 18px;
  background: ${palette.common.white};
  color: ${palette.common.black};
  &:hover {
    background: ${palette.grey600};
  }
  ${props =>
    props.skipper &&
    `
        color: ${palette.common.white};
        background: ${palette.primaryMain};
        &:hover {
            background: ${palette.primaryDark};
          }
    `}
  ${props =>
    props.disabled &&
    `
        color: ${palette.grey600};
        pointer-events: none;
        cursor: not-allowed;
    `}
    ${props =>
    props.active &&
    `
        color: ${palette.common.black};
        background: ${palette.grey600};
    `}
    ${props =>
    props.initialItem &&
    `
        border-radius: 5px 0 0 5px;
    `}
    ${props =>
    props.finalItem &&
    `
        border-radius: 0 5px 5px 0;
    `}
`
