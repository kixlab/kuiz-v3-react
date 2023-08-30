import styled from '@emotion/styled'
import { palette } from '@styles/theme'
import Link from 'next/link'
import { View } from './basic/View'
import { useCallback, useMemo } from 'react'
import { useQueryParam } from 'src/hooks/useQueryParam'

interface Props {
  numberOfPages: number
  currentPage: number
  URL: string
}

export const Pagination = View<Props>(({ numberOfPages, currentPage, URL, ...props }) => {
  const [page, setPage] = useQueryParam('page')
  const pages = useMemo(() => {
    return Array(numberOfPages)
      .fill(0)
      .map((_, i) => i + 1)
  }, [numberOfPages])

  const clickPage = useCallback(
    (i: number) => () => {
      setPage((i + 1).toString())
    },
    [setPage]
  )

  return (
    <Container {...props}>
      {pages.map((t, i) => (
        <Page key={i} disabled={currentPage === i + 1} onClick={clickPage(i)}>
          {t}
        </Page>
      ))}
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
