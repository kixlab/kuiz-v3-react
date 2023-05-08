import { LoadClassInfoParams, LoadClassInfoResults } from '@api/loadClassInfo'
import { Sheet } from '@components/Sheet'
import { Label } from '@components/basic/Label'
import { FillButton } from '@components/basic/button/Fill'
import styled from '@emotion/styled'
import { RootState } from '@redux/store'
import { typography } from '@styles/theme'
import { request } from '@utils/api'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Page() {
  const isAdmin = useSelector((state: RootState) => state.userInfo.isAdmin)
  const { push, query } = useRouter()
  const cid = query.cid as string
  const [classInfo, setClassInfo] = useState<LoadClassInfoResults>()

  useEffect(() => {
    if (!isAdmin) {
      push('/')
    } else {
      if (cid) {
        request<LoadClassInfoParams, LoadClassInfoResults>(`loadClassInfo`, { cid }).then(res => {
          if (res) {
            setClassInfo(res)
          }
        })
      }
    }
  }, [isAdmin, push, cid, setClassInfo])

  const onClickTopics = useCallback(() => {
    push(`/admin/${cid}/topics`)
  }, [push, cid])

  const onClickStudents = useCallback(() => {
    push(`/admin/${cid}/students`)
  }, [push, cid])

  return (
    <>
      {!isAdmin ? (
        <Label size={0}>403 Forbidden</Label>
      ) : (
        <>
          <Head>
            <title>{classInfo?.name}</title>
          </Head>
          <Container>
            <Sheet>
              <Label>Topics</Label>
              {classInfo?.topics?.length ?? 0}
              <FillButton onClick={onClickTopics}>Edit Topics</FillButton>
              <Label>Students</Label>
              {classInfo?.studentsNumber ?? 0}
              <FillButton onClick={onClickStudents}>Check Students</FillButton>
            </Sheet>
          </Container>
        </>
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
