import { LoadUserInfoParams, LoadUserInfoResults } from '@api/admin/loadUserInfo'
import { Label } from '@components/basic/Label'
import { Table } from '@components/basic/Table'
import styled from '@emotion/styled'
import { RootState } from '@redux/store'
import { User } from '@server/db/user'
import { request } from '@utils/api'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Page() {
  const isAdmin = useSelector((state: RootState) => state.userInfo.isAdmin)
  const { push, query } = useRouter()
  const cid = query.cid as string
  const [users, setUsers] = useState<User[]>([])
  const [className, setClassName] = useState('')

  useEffect(() => {
    if (cid) {
      request<LoadUserInfoParams, LoadUserInfoResults>(`admin/loadUserInfo`, { cid }).then(res => {
        if (res) {
          setUsers(res.students)
          setClassName(res.className)
        }
      })
    }
  }, [isAdmin, push, cid, setUsers])

  return (
    <>
      {!isAdmin ? (
        <Label color="black" size={0}>
          403 Forbidden
        </Label>
      ) : (
        <>
          <Head>
            <title>{className}</title>
          </Head>
          <Container>
            <Table
              headers={['Name', 'Email', 'Questions Made', 'Options Made']}
              rows={users.map(student => [
                student.name,
                student.email,
                student.made.length,
                student.madeOptions.length,
              ])}
            />
          </Container>
        </>
      )}
    </>
  )
}

const Container = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`
