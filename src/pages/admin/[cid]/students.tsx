import { Label } from '@components/basic/Label'
import { RootState } from '@redux/store'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { request } from '@utils/api'
import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { TABLET_WIDTH_THRESHOLD } from 'src/constants/ui'
import { LoadUserInfoParams, LoadUserInfoResults } from '@api/admin/loadUserInfo'
import { User } from '@server/db/user'

export default function Page() {
  const isAdmin = useSelector((state: RootState) => state.userInfo.isAdmin)
  const { push, query } = useRouter()
  const cid = query.cid as string
  const [users, setUsers] = useState<User[]>()

  useEffect(() => {
    if (!isAdmin) {
      push('/')
    } else {
      if (cid) {
        request<LoadUserInfoParams, LoadUserInfoResults>(`admin/loadUserInfo`, { cid }).then(res => {
          if (res) {
            setUsers(res.students)
          }
        })
      }
    }
  }, [isAdmin, push, cid, setUsers])

  return (
    <>
      {!isAdmin ? (
        <Label color="black" size={0}>
          403 Forbidden
        </Label>
      ) : (
        <Container>
          <Table>
            <TableHeader>
              <Col1>Name</Col1>
              <Col2>Email</Col2>
              <NumberCol>Questions Made</NumberCol>
              <NumberCol>Options Made</NumberCol>
            </TableHeader>
            {users?.map((student: User, index: number) => {
              return (
                <TableRow key={index}>
                  <Col1>{student.name}</Col1>
                  <Col2>{student.email}</Col2>
                  <NumberCol>{student.made.length}</NumberCol>
                  <NumberCol>{student.madeOptions.length}</NumberCol>
                </TableRow>
              )
            })}
          </Table>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  ${typography.b03b}
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`

const Table = styled.ul`
  li {
    border-radius: 3px;
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }
`

const TableHeader = styled.li`
  background-color: ${palette.primary.dark};
  color: ${palette.common.white};
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  @media all and (max-width: ${TABLET_WIDTH_THRESHOLD}px) {
    font-size: 12px;
  }
`

const TableRow = styled.li`
  background-color: ${palette.common.white};
  box-shadow: 0px 0px 9px 0px ${palette.background.dark};
`

const Col1 = styled.div`
  flex-basis: 15%;
  @media all and (max-width: ${TABLET_WIDTH_THRESHOLD}px) {
    flex-basis: 10%;
    padding: 10px 0;
    font-size: 11px;
  }
`

const Col2 = styled.div`
  flex-basis: 30%;
  @media all and (max-width: ${TABLET_WIDTH_THRESHOLD}px) {
    flex-basis: 25%;
    padding: 10px 0;
    font-size: 11px;
  }
`

const NumberCol = styled.div`
  flex-basis: 10%;
  @media all and (max-width: ${TABLET_WIDTH_THRESHOLD}px) {
    flex-basis: 1%;
    padding: 10px 0;
    font-size: 11px;
  }
`
