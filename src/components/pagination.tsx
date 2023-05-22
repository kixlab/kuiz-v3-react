import styled from '@emotion/styled'
import { palette } from '@styles/theme'
import Link from 'next/link'
import { View } from './basic/View'
import { useMemo } from 'react'

interface Props {
  numberOfPages: number
  currentPage: number
  URL: string
}

export const Pagination = View<Props>(({ numberOfPages, currentPage, URL, ...props }) => {
  const hasNext = currentPage < numberOfPages
  const hasPrevious = currentPage > 1
  const previousPage = currentPage - 1 > 0 ? currentPage - 1 : 1
  const nextPage = currentPage + 1 <= numberOfPages ? currentPage + 1 : numberOfPages
  const pages = useMemo(() => {
    const pages: [string, string][] = []
    if (numberOfPages <= 5) {
      for (let i = 1; i <= numberOfPages; i++) {
        pages.push([`${URL}&page=${i}`, i.toString()])
      }
    } else {
      const start = currentPage - 1 < 1 ? currentPage : currentPage - 1
      const end = currentPage + 1 > numberOfPages ? currentPage : currentPage + 1
      if (start < currentPage && start > 1) {
        pages.push([`${URL}&page=${start - 1}`, '...'])
      }
      for (let i = start; i <= end; i++) {
        pages.push([`${URL}&page=${i}`, i.toString()])
      }
      if (end > currentPage && end < numberOfPages) {
        pages.push([`${URL}&page=${end + 1}`, '...'])
      }
    }
    return pages
  }, [URL, currentPage, numberOfPages])

  return (
    <Container {...props}>
      <Link href={`${URL}&page=${1}`}>
        <Skipper disabled={!hasPrevious}>{'<<'}</Skipper>
      </Link>
      <Link href={`${URL}&page=${previousPage}`}>
        <Skipper disabled={!hasPrevious}>{'<'}</Skipper>
      </Link>
      {pages.map(([page, t], i) => (
        <Link key={i} href={page}>
          <Page disabled={currentPage === i + 1}>{t}</Page>
        </Link>
      ))}
      <Link href={`${URL}&page=${nextPage}`}>
        <Skipper disabled={!hasNext}>{'>'}</Skipper>
      </Link>
      <Link href={`${URL}&page=${numberOfPages}`}>
        <Skipper disabled={!hasNext}>{'>>'}</Skipper>
      </Link>
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: fit-content;
  overflow: hidden;
  background: ${palette.common.white};
  box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.12);
  margin-left: auto;
  margin-right: auto;
`

const Skipper = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 35px;
  width: 35px;
  font-size: 18px;
  color: ${palette.common.white};
  background: ${palette.primaryMain};
  &:hover {
    background: ${palette.primaryDark};
  }
`

const Page = styled.button`
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
  :disabled {
    color: ${palette.common.black};
    background: ${palette.grey600};
  }
`
